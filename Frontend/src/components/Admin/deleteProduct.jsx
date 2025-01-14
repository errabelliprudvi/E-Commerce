import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Box, FormControl, Select, MenuItem, InputLabel, Stack, Card, CardContent, CardActions, CircularProgress, Alert } from '@mui/material';
import { getCategories, getProductsByCategory, deleteProduct } from '../../api';

const DeleteProductPage = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch categories from backend
  const fetchCategories = async () => {
    try {
      const data = await getCategories(); // Adjust backend URL if needed
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Fetch products by category
  const fetchProductsByCategory = async (categoryId) => {
    if (!categoryId) return;
    setLoading(true);
    try {
      const data = await getProductsByCategory(categoryId);
      setProducts(data);
    } catch (error) {
      setError('Error fetching products');
    } finally {
      setLoading(false);
    }
  };

  // Handle category change to fetch products
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    fetchProductsByCategory(e.target.value);
  };

  // Handle delete product
  const handleDeleteProduct = async (productId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (confirmDelete) {
      try {
        await deleteProduct(productId);
        alert('Product deleted successfully!');
        setProducts(products.filter(product => product._id !== productId));
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Error deleting product');
      }
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Container maxWidth="md" sx={{ paddingTop: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Delete Product
      </Typography>

      {/* Category Selection */}
      <FormControl fullWidth margin="normal">
        <InputLabel>Category</InputLabel>
        <Select
          value={category}
          onChange={handleCategoryChange}
          label="Category"
          fullWidth
        >
          {categories.map((cat) => (
            <MenuItem key={cat._id} value={cat._id}>
              {cat.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Loading Indicator */}
      {loading && <CircularProgress sx={{ display: 'block', margin: '20px auto' }} />}
      
      {/* Error Message */}
      {error && <Alert severity="error" sx={{ marginBottom: 2 }}>{error}</Alert>}

      {/* Product List */}
      <Box marginTop={3}>
        {products.length === 0 && !loading ? (
          <Typography variant="body1" align="center">No products available for this category.</Typography>
        ) : (
          <Stack spacing={2}>
            {products.map((product) => (
              <Card key={product._id} sx={{ display: 'flex', flexDirection: 'column', boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {product.description}
                  </Typography>
                  <Typography variant="body2">Price: ${product.price}</Typography>
                  <Typography variant="body2">Stock: {product.stock}</Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center', marginBottom: 2 }}>
                  <Button variant="outlined" color="primary" sx={{ marginRight: 1 }}>
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDeleteProduct(product._id)}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            ))}
          </Stack>
        )}
      </Box>
    </Container>
  );
};

export default DeleteProductPage;
