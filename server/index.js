const express = require('express');
const database = require('./db/index')

const app = express();
const mongoose = require('mongoose');

require('dotenv').config();



const PORT = process.env.PORT || 8000;

app.route('/').get((req, res) => res.json('first api'));

const start = async () => {
    try {
      await database();
      app.listen(PORT, () => {
        console.log(`API server running on ${PORT}`);
      });
    } catch (err) {
      console.log('error:', err);
    }
  };

  start();