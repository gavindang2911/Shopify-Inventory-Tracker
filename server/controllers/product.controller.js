const Product = require('../models/product.model');

const getAllProducts = (req, res) => {
  Product.find({})
    .then((products) => {
      res.status(200).send(products);
    })
    .catch((err) => {
      res.status(403).json({
        success: false,
        msgError: err,
      });
    });
};
const getProductById = (req, res) => {};
const createProduct = (req, res) => {
  const product = new Product(req.body);

  product
    .save()
    .then((doc) => {
      res.status(200).json({
        success: true,
        productData: doc,
      });
    })
    .catch((err) => {
      res.status(403).json({
        success: false,
        msgError: err,
      });
    });
};
const updateProduct = (req, res) => {};
const deleteProduct = (req, res) => {};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
