import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InfoIcon from '@mui/icons-material/Info';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../UserProvider';
import { Box } from '@mui/material';

export default function MediaCard({ item }) {
  const { _id, name, description, images, category } = item;
  const { user, setItemsInCart } = useUser();
  const navigate = useNavigate();

  const handleAddToCart = async (item) => {
    try {
      const response = await fetch('api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user,
          product: item._id,
          quantity: 1,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add item to cart');
      }

      const updatedCart = await response.json();
      setItemsInCart(updatedCart.cart.items.length || 0);
    } catch (error) {
      console.error('Error adding to cart:', error.message);
    }
  };

  const handleViewDetails = () => {
    navigate(`/product/${_id}`);
  };

  return (
    <Card sx={{ width: '100%', position: 'relative', overflow: 'hidden' }}>
      {/* Card Media Section */}
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="250"
          image={`/images/${category}/${images[0]}`}
          alt={name}
          sx={{ objectFit: 'cover' }}
        />

        {/* Add to Cart Icon */}
        <IconButton
          onClick={() => handleAddToCart(item)}
          sx={{
            position: 'absolute',
            top: 10,
            right: 10,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            color: '#fff',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
            },
          }}
        >
          <ShoppingCartIcon />
        </IconButton>

        {/* View Details Icon */}
        <IconButton
          onClick={handleViewDetails}
          sx={{
            position: 'absolute',
            bottom: 10,
            right: 10,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            color: '#fff',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
            },
          }}
        >
          <InfoIcon />
        </IconButton>
      </Box>

      {/* Card Content Section */}
      <Box sx={{ padding: 2 }}>
        <Typography gutterBottom variant="h6" component="div" sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ maxHeight: 60, overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {description}
        </Typography>
      </Box>
    </Card>
  );
}
