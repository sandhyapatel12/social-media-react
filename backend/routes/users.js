//imports
const User = require("../models/User");
const router = require("express").Router();


//ROUTE :1 update user your account : put "http://localhost:5000/api/users/:id"  -->  login required
router.put("/:id",  //specify user own id
  async (req, res) => {

    //userId which is define at models/Users
    if (req.body.userId === req.params.id || req.body.isAdmin) //params.id takes this id -> which user want to update that own account 
    {
      //if user try to reset their password
      if (req.body.password) {
        try {
          //generate new password
          //generate salt    --   protect against brute-force and rainbow table attacks
          const salt = await bcrypt.genSalt(10);
          req.body.password = await bcrypt.hash(req.body.password, salt);     //added hash code in password

        }
        //catch unexpected error and display into console and send internal error to user
        catch (error) {
          console.error(error.message);
          res.status(500).send("internal server error.....");
        }
      }

      //update user account
      try {
        const user = await User.findByIdAndUpdate(req.params.id, { $set: req.body })
        res.status(200).json("your account has been update successfully.....");
      }
      //catch unexpected error and display into console and send internal error to user
      catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error.....");
      }

    }
    else {
      return res.status(403).json("you can update only your account")
    }


  })

//ROUTE :2 delete user : delete "http://localhost:5000/api/users/:id"  -->  login required
router.delete("/:id",  //specify user own id
  async (req, res) => {


    if (req.body.userId === req.params.id || req.body.isAdmin) //params.id takes this id -> which user want to update that own account 
    {
      try {
        //delete user account
        const user = await User.findByIdAndDelete(req.params.id)
        res.status(200).json("your account has been delete successfully.....");
      }
      //catch unexpected error and display into console and send internal error to user
      catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error.....");
      }

    }
    else {
      return res.status(403).json("you can delete only your account")
    }
  })

//ROUTE :3 get a user : get "http://localhost:5000/api/users/"  -->  login required
router.get("/", async (req, res) => {

  const userId = req.query.userId;  //fetch data by userid
  const username = req.query.username;  //fetch data by username

  try {

    //if data fetch by id then data come form id otherwise username
    const user = userId ? await User.findById(userId) : await User.findOne({ username : username})

    //destructure all data from user._doc in which store all data
    const { password, updatedAt, ...otherData } = user._doc;

    //we don't ned to password and updatedAt so return only otherData
    res.status(200).json(otherData);
  }
  //catch unexpected error and display into console and send internal error to user
  catch (error) {
    console.error(error.message);
    res.status(500).send("internal server error.....");
  }
});


//ROUTE :4 follow a user : get "http://localhost:5000/api/users/:id/follow"  -->  login required
router.get("/:id/follow", async (req, res) => {
  //if user id is not match with which person to user want to follow
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currUser = await User.findById(req.body.userId);

      //if user follow that person which is not already in following list
      if (!user.followers.includes(req.body.userId)) {
        //add followers into list
        await user.updateOne({ $push: { followers: req.body.userId } })  //add the userId into  followers which person we want to follow
        await currUser.updateOne({ $push: { following: req.params.id } })  //add the userId into  followers which person we want to follow

        res.status(200).json('user has been followed')

      }
      //if user follow that person which is already in  following list
      else {
        res.status(403).json('you are already follow this person')
      }

    }   //catch unexpected error and display into console and send internal error to user
    catch (error) {
      console.error(error.message);
      res.status(500).send("internal server error.....");
    }
  }
  else {
    res.status(403).json("you can not follow your self!")
  }

})

//ROUTE :5 unfollow a user : put "http://localhost:5000/api/users/:id/unfollow"  -->  login required
router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);    //for followers
      const currentUser = await User.findById(req.body.userId);  //for followings
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });    //which we want to follow
        await currentUser.updateOne({ $pull: { followings: req.params.id } });  //which other person through we in followings list
        res.status(200).json("user has been unfollowed");
      } else {
        res.status(403).json("you has been already unfollow this person");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant unfollow yourself");
  }
});

//ROUTE :6 get user friends : get "http://localhost:5000/api/users/friends/:userId"  -->  login required
router.get("/friends/:userId", async (req, res) =>
{
  try {
    
    //find user
    const user = await User.findById(req.params.userId)

    //find user all friends(which is remains in followings list)
    const friends = await Promise.all(
      user.following.map((followingFriendId) =>
      {
        return User.findById(followingFriendId)
      })
    )

    //define empty array for store friends list 
    let friendsList = [];

    friends.map((friend) =>
    {
      //destructure user data from friend
      const {_id, username, profilePicture} = friend

      //push friend data in friendsList
      friendsList.push({_id, username, profilePicture})
    })
    res.status(200).json(friendsList)
  } catch (error) {
    
  }
})




//export is needed for import this at index.js
module.exports = router