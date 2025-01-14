import React, { useEffect, useState } from "react";
import { getOrders, updateOrderStatus } from '../../api';
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Grid
} from '@mui/material';

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch orders from the backend
  const fetchOrders = async () => {
    try {
      const data = await getOrders();
      setOrders(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Update order status
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const updatedOrder = await updateOrderStatus(orderId, { orderStatus: newStatus });
      /*setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === updatedOrder._id ? updatedOrder : order
        )
      );*/
      fetchOrders();
    } catch (err) {
      alert(`Error updating order status: ${err.message}`);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Container sx={{ paddingTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Orders
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="admin orders table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Order ID</TableCell>
              <TableCell align="left">User</TableCell>
              <TableCell align="left">Items</TableCell>
              <TableCell align="left">Total Price</TableCell>
              <TableCell align="left">Order Status</TableCell>
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell align="left">{order._id}</TableCell>
                <TableCell align="left">{order.user}</TableCell>
                <TableCell align="left">
                  {order.items.map((item, index) => (
                    <div key={index}>
                      {item.product} x {item.quantity}
                    </div>
                  ))}
                </TableCell>
                <TableCell align="left">${order.totalPrice.toFixed(2)}</TableCell>
                <TableCell align="left">{order.orderStatus}</TableCell>
                <TableCell align="left">
                  <Select
                    value={order.orderStatus}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    fullWidth
                  >
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Shipped">Shipped</MenuItem>
                    <MenuItem value="Delivered">Delivered</MenuItem>
                    <MenuItem value="Cancelled">Cancelled</MenuItem>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AdminOrdersPage;
