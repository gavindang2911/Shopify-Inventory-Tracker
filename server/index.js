const database = require('./db/index');
const app = require("./app.js");

const PORT = process.env.PORT || 8000;



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


