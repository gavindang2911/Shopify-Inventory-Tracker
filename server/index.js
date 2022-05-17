const express = require('express');
const database = require('./db/index');
const cors = require('cors')
const path = require("path");

require('dotenv').config();

const app = express();

app.use(cors())

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const inventoryRoute = require('./routes/product.route')
app.use('/api', inventoryRoute);
const shipmentRoute = require('./routes/shipment.route')
app.use('/api', shipmentRoute);


const PORT = process.env.PORT || 8000;
// React production build static hosting
app.use(express.static(path.join(__dirname, "build")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

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
