const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const productSchema = new Schema({
  name: { type: String, required: true, maxlength: 100 },
  category: { type: String, required: true, maxlength: 100 },
  price: { type: Number, required: true },
  description: { type: String, required: true, maxlength: 100 },
  quantity: { type: String, required: true },
});

module.exports = mongoose.model('Product', productSchema);