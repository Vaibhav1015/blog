const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const commentRoute = require("./routes/comments");
const multer = require("multer");
const path = require("path");
const port = process.env.PORT || 5000;

dotenv.config();
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));

/* 
Create a connetion with mongodb database to store all data into database..
If data can not be store into database its showing error message.
*/
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));


/* 
Multer is a node. js middleware for
handling multipart/form-data , which is primarily used for uploading files.
*/
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, "hello2.jpeg");
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});



app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/comments", commentRoute);


app.listen(port, () => {
  console.log("Backend is running.");
});