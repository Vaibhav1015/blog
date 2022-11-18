const router = require("express").Router();
const User = require("../models/User");
const Comment = require("../models/Comment");

/* A route is a section of Express code that associates an 
   HTTP verb (GET, POST, PUT, DELETE, etc.), a URL path/pattern, 
   and a function that is called to handle that pattern.

   This section is Comments Routes..
*/


//CREATE Comment.. 
router.post("/:id", async (req, res) => {
    const newComment = new Comment(req.body);
    try {
      const savedComment = await newComment.save();
      res.status(200).json(savedComment);
    } catch (err) {
      res.status(500).json(err);
    }
  });


//UPDATE Comment
router.put("/:id", async (req, res) => {
    try {
      const comment = await Comment.findById(req.params.id);
      if (comment.username === req.body.username) {
        try {
          const updatedComment = await Comment.findByIdAndUpdate(
            req.params.id,
            {
              $set: req.body,
            },
            { new: true }
          );
          res.status(200).json(updatedComment);
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(401).json("You can update only your Comments!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });


//DELETE Comment
router.delete("/:id", async (req, res) => {
    try {
      const comment = await Comment.findById(req.params.id);
      if (comment.username === req.body.username) {
        try {
          await comment.delete();
          res.status(200).json("comment has been deleted...");
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(401).json("You can delete only your comment!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });



//GET Comment
router.get("/:id", async (req, res) => {
    try {
      const comment = await Comment.findById(req.params.id);
      res.status(200).json(comment);
    } catch (err) {
      res.status(500).json(err);
    }
  });



//GET ALL Comments
router.get("/", async (req, res) => {
    const username = req.query.user;
    try {
      let comments;
      if (username) {
        comments = await Comment.find({ username });
      }else {
        comments = await Comment.find();
      }
      res.status(200).json(comments);
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports = router;