require("dotenv").config();
const express = require("express");
const app = express();
const todoRoutes = require("./routes/todoRoutes");
const cors = require("cors");
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());  
app.use("/api", todoRoutes); 

const PORT = process.env.PORT || 5000; 

app.listen(PORT,() => {
  console.log(`Server started on port ${PORT}`);
});
