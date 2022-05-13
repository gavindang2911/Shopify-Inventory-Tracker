const mongoose = require('mongoose');
const Product = require('../models/product.model');
const Shipment = require('../models/shipment.model');

const getAllShipments = async (req, res) => {
  await Shipment.find({})
    .then((doc) => {
      return res.status(200).json({
        success: true,
        shipmentData: doc,
      });
    })
    .catch((err) => {
      res.status(403).json({
        success: false,
        msgError: err,
      });
    });
};
const getByIdShipment = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('Invalid Shipment ID');

  await Shipment.findOne({ _id: id })
    .then((doc) => {
      if (doc.length)
        return res.status(404).json({
          success: false,
          msgError: 'Shipment is not found',
        });
      return res.status(200).json({
        success: true,
        shipmentData: doc,
      });
    })
    .catch((err) => {
      res.status(403).json({
        success: false,
        msgError: err,
      });
    });
};
const createShipment = (req, res) => {
  const shipment = new Shipment(req.body);

  shipment
    .save()
    .then((shipment) => {
      for (let i = 0; i < shipment.orders.length; i++) {
        const productId = shipment.orders[i].id;
        if (!mongoose.Types.ObjectId.isValid(productId))
          return res.status(404).send('Invalid Shipment Id');
        Product.findOne({ _id: productId }, (err, product) => {
          product.quantity = product.quantity - shipment.orders[i].quantity;
          product
            .save()
            .then((doc) => {
              console.log(doc);
            })
            .catch((err) => {
              console.log(err);
            });
        });
      }

      res.status(200).json({
        success: true,
        shipmentData: shipment,
        message: 'Shipment created successfully',
      });
    })
    .catch((err) => {
      res.status(403).json({
        success: false,
        msgError: err,
        message: 'Shipment created fail',
      });
    });
};

const deleteByIdShipment = (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('Invalid Shipment Id');

  Shipment.findOneAndDelete({ _id: id })
    .then((doc) => {
      return res.status(200).json({
        success: true,
        shipmentData: doc,
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
  getAllShipments,
  getByIdShipment,
  createShipment,
  deleteByIdShipment,
};

// if (!doc.length)
// return res.status(404).json({
//   success: false,
//   msgError: 'We do not have any shipments',
// });
