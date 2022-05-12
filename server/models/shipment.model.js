const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const shipmentSchema = new Schema({
  firstName: { type: String, required: true, maxlength: 100 },
  middleName: { type: String, maxlength: 100 },
  lastname: { type: String, required: true, maxlength: 100 },
  phoneNumber: { type: Number, required: true },
  address: { type: String, required: true, maxlength: 100 },
  orders: {
      type: [
        {
          id: { type: Schema.Types.ObjectId, ref: "Product" },
          quantity: { type: Number },
          product_name: String,
        },
      ],
      required: true,
  },
},
{ timestamps: true }
);


module.exports = mongoose.model('Shipment', shipmentSchema);
