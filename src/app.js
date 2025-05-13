const express = require("express");
const connectDB = require("./config/database");

const app = express();

app.use('/test3', (req, res, next) => {
	console.log('Hello 1');
	next();
	console.log('abracadabra')
	res.send('Hello 1');
}, (req, res, next) => {
	console.log('Hello 2');
	res.send('Hello 2');
});

connectDB()
  .then((res) => {
    console.log("database connected sucessfully");
    app.listen(3000, () => {
      console.log("server started");
    })
  })

  
  .catch((error) => {
    console.log("Error connecting to the database:", error);
  });
