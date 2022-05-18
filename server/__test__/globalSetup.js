const mongoose = require('mongoose');
require('dotenv').config();


beforeAll(async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      });
      console.log(`mongo database is connected!!! `);
    } catch (error) {
      console.error(`Error: ${error} `);
      process.exit(1); //passing 1 - will exit the proccess with error
    }
  });

afterAll((done) => {
    mongoose.connection.close();
    done();
  });
