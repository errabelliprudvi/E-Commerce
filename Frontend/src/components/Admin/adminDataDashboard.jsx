import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Card, CardContent, CardActions, Grid } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { getOrders, getCategories } from '../../api'; // Assuming you have these API functions

const AdminDataDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersData = await getOrders();
        //const salesData = await getSalesData(); // Fetch sales data by date
        const categoriesData = await getCategories(); // Fetch product categories with counts
        setOrders(ordersData);
        setSalesData(ordersData);
        setCategoryData(categoriesData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalOrders = orders.length;
  const totalRevenue = salesData.reduce((acc, item) => acc + item.totalPrice, 0);

  const categoryChartData = categoryData.map((category) => ({
    name: category.name,
    value: category.productCount,
  }));

  const salesChartData = salesData.map((sale) => ({
    name: sale.date,
    revenue: sale.totalRevenue,
  }));

  if (loading) return <Typography>Loading data...</Typography>;

  return (
    <Container maxWidth="lg" sx={{ paddingTop: 4, overflow: 'hidden' }}>
      <Typography variant="h4" gutterBottom align="center">
        Admin Data Dashboard
      </Typography>

      {/* Overview Cards */}
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ padding: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Total Orders</Typography>
              <Typography variant="h5">{totalOrders}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ padding: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Total Revenue</Typography>
              <Typography variant="h5">${totalRevenue.toFixed(2)}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Sales Over Time Line Chart */}
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h5" gutterBottom>Sales Over Time</Typography>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={salesChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </Box>

      {/* Product Categories Pie Chart */}
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h5" gutterBottom>Product Categories Distribution</Typography>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={categoryChartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={150}
              fill="#82ca9d"
              label
            >
              {categoryChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={['#0088FE', '#00C49F', '#FFBB28', '#FF8042'][index % 4]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </Box>

      {/* Orders Overview Bar Chart */}
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h5" gutterBottom>Orders Overview</Typography>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={salesChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="revenue" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Container>
  );
};

export default AdminDataDashboard;
