
import React from 'react';
import { Box, Typography, Card, CardContent, Divider, Grid, Paper } from '@mui/material';
import { useState, useEffect } from "react";
import { getUserOrders } from '../../api';


    
    export default function Orders({userId}){

        
        const [orders, setOrders] = useState([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);

       // Replace with your API endpoint
       const fetchData = async () => {
        try {
          const result = await getUserOrders(userId);
          setOrders(result);
          console.log(result)
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
   
        useEffect(() => {
        
            fetchData();
          }, []);
        

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    



  return (
    <Box sx={{ p: 4, backgroundColor: "transparent", minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom>
        Your Orders
      </Typography>
      {orders.length === 0 ? (
        <Typography variant="h6">No orders found.</Typography>
      ) : (
        <Grid container spacing={3}>
          {orders.map((order) => (
            <Grid item xs={12} key={order._id}>
              <Card sx={{ boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h6" color="primary">
                    Order ID: {order._id}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Placed on: {new Date(order.createdAt).toLocaleDateString()} | Status: {order.orderStatus}
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle1">Items:</Typography>
                  {order.items.map((item) => (
                    <Box
                      key={item._id}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        my: 1,
                        p: 1,
                        backgroundColor: '#fafafa',
                        borderRadius: 1,
                      }}
                    >
                      <Box>
                        <Typography variant="body1">{item.product.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Quantity: {item.quantity}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Unit Price: ${item.price.toFixed(2)}
                        </Typography>
                      </Box>
                      <Typography variant="body1" color="primary">
                        ${item.quantity * item.price.toFixed(2)}
                      </Typography>
                    </Box>
                  ))}
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle1">Shipping Address:</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                    {order.shippingAddress.zip}, {order.shippingAddress.country}
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body2" color="text.secondary">
                      Payment Method: {order.paymentMethod}
                    </Typography>
                    <Typography variant="h6" color="primary">
                      Total: ${order.totalPrice.toFixed(2)}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

//export default OrdersPage;
