const mongoose = require('mongoose')
require('dotenv').config();

async function connectToDb() {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      //must add in order to not get any error masseges:
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`mongo database is connected!!! `);
  } catch (error) {
    console.error(`Error: ${error} `);
    process.exit(1); //passing 1 - will exit the proccess with error
  }
}

module.exports = connectToDb();
