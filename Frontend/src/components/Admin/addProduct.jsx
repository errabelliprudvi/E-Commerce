import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Box, Select, MenuItem, InputLabel, FormControl, Stack } from '@mui/material';
import {getCategories,addProduct} from '../../api'
const AddProductPage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);

  // Fetch categories from backend
  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.log('Error fetching categories:', error.message);
    }
  };

  // Handle image file selection and preview
  const handleImageChange = (e) => {
    const files = e.target.files;
    setImages(files);
    const previews = Array.from(files).map(file => URL.createObjectURL(file));
    setImagePreview(previews);
  };

  // Handle form submission to add the product
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form data for product details
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('stock', stock);
    formData.append('category', category);

    // Append images to form data
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }

    try {
      // Make a POST request to add the product
      const response = await addProduct(formData)
        alert('Product added successfully!');
        setName('');
        setDescription('');
        setPrice('');
        setStock('');
        setCategory('');
        setImages([]);
        setImagePreview([]);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Container maxWidth="md" sx={{ paddingTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Add New Product
      </Typography>

      {/* Product Form */}
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Product Name"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          label="Price"
          variant="outlined"
          fullWidth
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          margin="normal"
          required
          type="number"
        />
        <TextField
          label="Stock"
          variant="outlined"
          fullWidth
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          margin="normal"
          required
          type="number"
        />

        {/* Category Selection */}
        <FormControl fullWidth margin="normal" required>
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            label="Category"
          >
            {categories.map((cat) => (
              <MenuItem key={cat._id} value={cat._id}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Image Upload */}
        <Box margin="normal">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
          {imagePreview.length > 0 && (
            <Stack direction="row" spacing={2} marginTop={2} flexWrap="wrap">
              {imagePreview.map((preview, index) => (
                <Box key={index} sx={{ width: 100, height: 100, marginBottom: 2 }}>
                  <img
                    src={preview}
                    alt={`preview-${index}`}
                    style={{ width: '100%', height: '100%', borderRadius: '8px', objectFit: 'cover' }}
                  />
                </Box>
              ))}
            </Stack>
          )}
        </Box>

        <Button type="submit" variant="contained" fullWidth sx={{ marginTop: 2 }}>
          Add Product
        </Button>
      </Box>
    </Container>
  );
};


export default AddProductPage;