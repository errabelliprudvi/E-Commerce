import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Box, Card, CardContent, Stack } from '@mui/material';
import { getCategories, addCategory, uploadFile } from '../../api';

const AddCategoryPage = () => {
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  // Frontend: Example of image upload form
  const handleImageUpload = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const fetchData = async () => {
    try {
      const categories = await getCategories(); // API endpoint
      setCategories(categories);
      console.log(categories);
    } catch (error) {
      console.log(error.message);
    }
  };

  // Handle form submission for adding a new category
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', categoryName);
    formData.append('description', categoryDescription);

    if (selectedImage) {
      formData.append('image', selectedImage); // Append image file
    }

    try {
      const response = await addCategory(formData); // Assuming addCategory API can handle FormData
      fetchData(); // Refresh the category list after adding a new one
      setCategoryName('');
      setCategoryDescription('');
      setSelectedImage(null); // Reset image selection
    } catch (error) {
      console.error('Error adding category', error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container maxWidth="md" sx={{ paddingTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Create Category
      </Typography>

      {/* Category Form */}
      <Box component="form" onSubmit={handleSubmit} sx={{ marginBottom: 4 }}>
        <Stack spacing={2}>
          <TextField
            label="Category Name"
            variant="outlined"
            fullWidth
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            value={categoryDescription}
            onChange={(e) => setCategoryDescription(e.target.value)}
          />

          <input type="file" onChange={handleImageUpload} />

          <Button type="submit" variant="contained" fullWidth>
            Add Category
          </Button>
        </Stack>
      </Box>

      {/* Categories List */}
      <Stack spacing={4}>
        {categories.map((category) => (
          <Card key={category._id}>
            <CardContent>
              <Typography variant="h6" component="div">
                {category.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                {category.description || 'No description available.'}
              </Typography>
              {category.image && (
                <img
                  src={`/images/${category.image}`} // Assuming image is served statically
                  alt={category.name}
                  style={{ width: '100px', height: '100px', objectFit: 'cover', marginTop: '10px' }}
                />
              )}
              <Typography variant="body2" color="text.secondary">
                Created at: {new Date(category.createdAt).toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Container>
  );
};

export default AddCategoryPage;
