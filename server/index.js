const express = require('express');
const database = require('./db/index');

const app = express();

require('dotenv').config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const inventoryRoute = require('./routes/product.route')
app.use('/api', inventoryRoute);
const shipmentRoute = require('./routes/shipment.route')
app.use('/api', shipmentRoute);


const PORT = process.env.PORT || 8000;

app.route('/').get((req, res) => res.json('first api'));

const start = async () => {
  try {
    await database;
    app.listen(PORT, () => {
      console.log(`API server running on ${PORT}`);
    });
  } catch (err) {
    console.log('error:', err);
  }
};

start();
