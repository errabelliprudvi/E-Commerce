import React, { useEffect, useState } from "react";
import { Container, Typography, Card, Avatar, Button, Divider, Link, Box, Stack } from "@mui/material";
import { Link as RouterLink } from "react-router-dom"; // For navigation

const ProfilePage = ({ userId }) => {
  const userD = {
    name: "John Doe",
    email: "johndoe@example.com",
    avatar: "https://via.placeholder.com/150",
  };
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch(`/api/users/${userId}`);
        if (!response.ok) {
          if (response.status === 404) {
            console.log("Your Cart is Empty...");
            setItemsInCart(0); // Set count to 0 if the cart is empty
            return;
          }
          throw new Error("Failed to fetch cart data.");
        }

        const result = await response.json();
        setUser(result); // Update count of items
        console.log("Cart data fetched:", result);
      } catch (error) {
        console.error("Error fetching cart data:", error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [userId]);

  if (loading) {
    return <h3>Loading</h3>;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Card sx={{ p: 4 }}>
        {/* User Information using Box and Stack */}
        <Stack direction="row" spacing={4} alignItems="center">
          <Box>
            <Avatar
              src={`/images/profile/${user.name}.jpg`}
              alt={user.name}
              sx={{ width: 120, height: 120 }}
            />
          </Box>
          <Box>
            <Typography variant="h5">{user.name}</Typography>
            <Typography color="text.secondary">{user.email}</Typography>
            <Typography color="text.secondary">{user.phone}</Typography>
            <Button variant="contained" sx={{ mt: 2 }}>
              Edit Profile
            </Button>
          </Box>
        </Stack>

        <Divider sx={{ my: 4 }} />

        {/* Link to Orders Page */}
        <Typography variant="h6" gutterBottom>
          <Link component={RouterLink} to="/user/orders" underline="hover" color="primary">
            View Your Orders
          </Link>
        </Typography>

        <Divider sx={{ my: 4 }} />

        {/* Wishlist or other sections */}
        <Typography variant="h6" gutterBottom>
          Wishlist
        </Typography>
        <Typography>No items in wishlist.</Typography>
      </Card>
    </Container>
  );
};

export default ProfilePage;
