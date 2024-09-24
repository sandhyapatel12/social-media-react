//imports globally
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const connectTomongo = require("./database")   //store into database path
// var cors = require('cors')
const multer = require('multer')
const path = require('path')  //for upload images from backend/public/images
//import from routes
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

dotenv.config();  //connection with dotenv

connectTomongo();   //run function which is created on db.js


//for upload images from backend/public/images
app.use("/images", express.static(path.join(__dirname, "public/images")));


//middleware
app.use(express.json());
app.use(helmet());
// app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));




// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) =>
  {
    cb(null, 'public/images')  //specify the upload directory
  },
  filename: (req, file, cb) =>
    {
      cb(null, file.originalname)  //specify the file name here
    }
})

//multer is a middleware and used for file uploads
const upload = multer({storage : storage});

//ROUTE :  upload user post : post "http://localhost:5000/api/upload"  -->  login required
app.post("/api/upload",  //route path
  upload.single("file"), //upload single image 
  (req, res) => {
    try {
      // Access the uploaded file using req.file
      // console.log(req.file);
      return res.status(200).json('file uploaded successfully.....')
    }  //catch unexpected error and display into console and send internal error to user
    catch (error) {
      console.error(error.message);
      res.status(500).send("internal server error.....");
    }

  })


//give the specific path on which we want to run following models
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);

app.listen(5000, () => {        //5000 is a port we can give any port number on which we want to run backend app
  console.log("Backend server is running!");
});
