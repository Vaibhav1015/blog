const express = require("express");
const cors = require('cors');
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const commentRoute = require("./routes/comments");
const albumRoute = require("./routes/albums");
const photoRoute = require("./routes/photos")
const todoRoute = require("./routes/todos");
const multer = require("multer");
const path = require("path"); 
const port = process.env.PORT || 5000;
dotenv.config();

const app = express();
app.use(express.json());


app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/upload/images", express.static(path.join(__dirname, "/upload/images"))); 

/* 
Create a connetion with mongodb database to store all data into database..
If data can not be store in database it's showing error message.
*/
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));







app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/comments", commentRoute);
app.use("/api/albums", albumRoute);
app.use("/api/photos",photoRoute);
app.use("/api/todos",todoRoute);
app.use(cors());



app.listen(port, () => {
  console.log("Backend is running.");
});