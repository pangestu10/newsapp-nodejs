const { success, error } = require('../utils/response');

const uploadImage = (req, res) => {
  if (!req.file) {
    return error(res, 400, 'No image file provided.');
  }
  const imageUrl = `/uploads/${req.file.filename}`;
  return success(res, 200, 'Image uploaded successfully', { imageUrl });
};

module.exports = { uploadImage };