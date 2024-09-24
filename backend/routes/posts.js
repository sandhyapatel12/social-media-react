//imports
const Post = require("../models/Post");
const User = require("../models/User");
const router = require("express").Router();



//ROUTE :1 create a post : post "http://localhost:5000/api/posts/"  -->  login required
router.post("/",
  async (req, res) => {

    //create new post
    const newPost = new Post(req.body)
    try {

      //save new post
      const savedPost = await newPost.save();

      //send response
      res.status(200).json(savedPost)

    }
    //catch unexpected error and display into console and send internal error to user
    catch (error) {
      console.error(error.message);
      res.status(500).send("internal server error.....");
    }

  })

//ROUTE :2 update a post : put "http://localhost:5000/api/posts/:id"  -->  login required
router.put("/:id",  //postid means ObjectId
  async (req, res) => {


    try {
      //find user id
      const post = await Post.findById(req.params.id) //params.id takes this id -> which user want to update that own post

      //if user id is match (means user update only thier post)
      if (post.userId === req.body.userId) {
        await post.updateOne({ $set: req.body })
        res.status(200).json('your post update successfully...')
      }

      // user id is not match
      else {
        res.status(403).json("you can't update another post")
      }
    }  //catch unexpected error and display into console and send internal error to user
    catch (error) {
      console.error(error.message);
      res.status(500).send("internal server error.....");
    }
  })

//ROUTE :3 delete a post : delete "http://localhost:5000/api/posts/:id"  -->  login required
router.delete("/:id",  //postid means ObjectId
  async (req, res) => {


    try {
      //find user id
      const post = await Post.findById(req.params.id) //params.id takes this id -> which user want to delete that own post

      //if user id is match (means user delete only thier post)
      if (post.userId === req.body.userId) {
        await post.deleteOne({ $set: req.body })
        res.status(200).json('your post delete successfully...')
      }

      // user id is not match
      else {
        res.status(403).json("you can't delete another post")
      }
    }  //catch unexpected error and display into console and send internal error to user
    catch (error) {
      console.error(error.message);
      res.status(500).send("internal server error.....");
    }
  })

//ROUTE :4 like dislike a post : put "http://localhost:5000/api/posts/:id/likedislike"  -->  login required
router.put("/:id/likedislike",
  async (req, res) => {

    try {
      //find user id
      const post = await Post.findById(req.params.id) //params.id takes this id -> which user want to delete that own post

      //if user already not like particular post then like
      if (!post.likes.includes(req.body.userId)) {
        await post.updateOne({ $push: { likes: req.body.userId } })   //push method used for add element to collection
        res.status(200).json('you likes successfully...')
      }
      //if user already  like particular post then dislike
      else {
        await post.updateOne({ $pull: { likes: req.body.userId } })  //pull method used for remove element from collection
        res.status(200).json("you dislike")
      }

    }  //catch unexpected error and display into console and send internal error to user
    catch (error) {
      console.error(error.message);
      res.status(500).send("internal server error.....");
    }
  })

//ROUTE :5 get a post : get "http://localhost:5000/api/posts/:id"  -->  login required
router.get("/:id",
  async (req, res) => {

    try {
      //find user id
      const post = await Post.findById(req.params.id) //params.id takes this id -> which user want to delete that own post
      res.status(200).json(post)

    }  //catch unexpected error and display into console and send internal error to user
    catch (error) {
      console.error(error.message);
      res.status(500).send("internal server error.....");
    }
  })


//ROUTE :6 get a timeline post : get "http://localhost:5000/api/posts/timeline/:userId"  -->  login required
router.get("/timeline/:userId",
  async (req, res) => {

    try {

      //find all users and all post
      const currentUser = await User.findById(req.params.userId);
      const userPost = await Post.find({ userId: currentUser._id })   //in currentUser includes all user id

      //in friendPost includes all post which include user following list  (not followers list)
      const friendPost = await Promise.all(
        currentUser.following.map((friendId) => {
          return Post.find({ userId: friendId })
        })
      )

      res.status(200).json(userPost.concat(...friendPost))
    }
    //catch unexpected error and display into console and send internal error to user
    catch (error) {
      console.error(error.message);
      res.status(500).send("internal server error.....");
    }
  })

//ROUTE : 7 get user's all post : get "http://localhost:5000/api/profile/:username"  -->  login required
router.get("/profile/:username",
  async (req, res) => {

    try {
      const user = await User.findOne({ username: req.params.username })
      const posts = await Post.find({ userId: user._id })    //user._id includes all user id
      res.status(200).json(posts)
    }
    //catch unexpected error and display into console and send internal error to user
    catch (error) {
      console.error(error.message);
      res.status(500).send("internal server error.....");
    }
  })


//export is needed for import this at index.js
module.exports = router