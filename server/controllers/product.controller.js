const mongoose = require('mongoose');

const Product = require('../models/product.model');

const getAllProducts = async (req, res) => {
  await Product.find({})
    .then((doc) => {
      if (!doc)
        return res.status(404).json({
          success: false,
          msgError: 'We do not have any Products',
        });
      return res.status(200).json({
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
const getProductBySearch = async (req, res) => {
  const { searchQuery } = req.query;

  await Product.find({'category' : new RegExp(searchQuery, 'i')})
    .then((doc) => {
      if (!doc)
        return res.status(404).json({
          success: false,
          msgError: 'We do not have any Products',
        });
      return res.status(200).json({
        success: true,
        productSearchData: doc,
      });
    })
    .catch((err) => {
      res.status(403).json({
        success: false,
        msgError: err,
      });
    });
};
const getProductById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('No product found with provided id');

  await Product.findOne({ _id: id })
    .then((doc) => {
      return res.status(200).json({
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
const updateProduct = async (req, res) => {
  const { id } = req.params;

  const inventory = req.body;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('No product found with provided id');

  await Product.findByIdAndUpdate(id, inventory, { new: true })
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
const deleteProduct = (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('No product found with provided id');

  Product.findOneAndDelete({ _id: id })
    .then((doc) => {
      return res.status(200).json({
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

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductBySearch,
};
