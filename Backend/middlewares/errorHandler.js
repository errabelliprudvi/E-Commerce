const errhandler =(err, req, res, next) => {
    console.error(err); // Log the error (optional, for debugging)
  
    // Handle MongoDB duplicate key error
    if (err.code === 11000) {
        return res.status(400).json({
            message: 'Duplicate key error',
            details: err.message,
        });
    }
  
    // Default to a 500 Internal Server Error if no specific handling is applied
    res.status(500).json({
        message: 'Internal server error',
        details: err.message,
    });
  }

  module.exports = errhandler