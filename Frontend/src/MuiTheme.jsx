import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Container, Typography, Button } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Customize your primary color
    },
    secondary: {
      main: '#d32f2f', // Customize your secondary color
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h4: {
      fontWeight: 700,
    },
  },
});

function MuiTheme() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <Typography variant="h4" gutterBottom>
          Themed MUI App
        </Typography>
        <Button variant="contained" color="primary">
          Themed Button
        </Button>
      </Container>
    </ThemeProvider>
  );
}

export default MuiTheme;
