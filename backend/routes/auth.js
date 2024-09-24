//imports
const router = require("express").Router();
const User = require('../models/User')
const bcrypt = require('bcryptjs');     //designed to be safe for storing passwords in a database


//ROUTE :1 user registration : POST "http://localhost:5000/api/auth/register"  --> no login required
router.post("/register", async (req, res) => {
  try {

    //generate new password
    //generate salt    --   protect against brute-force and rainbow table attacks
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);     //added hash code in password

    //create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    //save new user data 
    const user = await newUser.save();

    //send response
    res.status(200).json(user);

  }
  //catch unexpected error and display into console and send internal error to user
  catch (error) {
    console.error(error.message);
    res.status(500).send("internal server error.....");
  }
});

//ROUTE :2 user login : POST "http://localhost:5000/api/auth/login"  --> login required
router.post('/login', async (req, res) => {

  //destructure
  const { email, password } = req.body;

  try {

    //when user email and password is wrong
    let user = await User.findOne({ email })
    if (!user)       //if user not exits
    {
      return res.status(400).json({error: "please try to login with correct email" })
    }

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword)        //if password is not match
    {
      return res.status(400).json({ error: "please try to login with correct password" })
    }

    //it user email and password is correct then send response
    //send response
    res.status(200).json(user);
  }

  //catch unexpected error and display into console and send internal error to user
  catch (error) {
    console.error(error.message);
    res.status(500).send("internal server error.....");
  }
})



//export is needed for import this at index.js
module.exports = router
