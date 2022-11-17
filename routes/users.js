const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");

/* This code is written for user update. 
If the user id entered by the user matches with 
the user id in the database then the user will be updated. 
*/

router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("You can update only your account!");
  }
});

/* 
To delete the user, the user I'd will be taken from the user, 
if it matches with the user I'd in the database, the user can delete the same account. 
*/
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      try {

        /* After the user deletes the account, all the posts made through the same will be deleted 
        for that written here deleteMany.  */

        await Post.deleteMany({ username: user.username });
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } catch (err) {
      res.status(404).json("User not found!");
    }
  } else {
    res.status(401).json("You can delete only your account!");
  }
});

/* 
For finding the user you can put ID after that the
users information will displayed except the password due to security purpose.
*/
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* Get all users data */

router.get('/', (req,res)=> {
  User.find()
  .then(result=>{
    res.status(200).json({
      UserData:result
    });
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json({
      error:err
    })
  });

})





module.exports = router;