// uploadController.js
exports.uploadImage = async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    res.status(200).json({
      message: 'Image uploaded successfully',
      imagePath: `/uploads/categories/${req.file.filename}`, // Image path under public/uploads
    });
  };
  