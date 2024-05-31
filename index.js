const express = require("express");
const { default: mongoose } = require("mongoose");
const router = require("./routes/user-routes");
require('dotenv').config();
const app = express();
app.use(express.json());
app.use("/users", router);


const uri = process.env.MONGO_URI;

if (!uri) {
  console.error('MONGO_URI is not defined.');
  process.exit(1);
}

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(5000, () => {
      console.log('Server is running on port 5000');
    });
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });
