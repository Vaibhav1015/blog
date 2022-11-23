const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const mongoose = require("mongoose");

//Counter model to count a user data id's 
const counterSchema = {
  id: {
    type: String
  },
  seq: {
    type: Number
  }
}


const counterModel = mongoose.model("counter", counterSchema);



//REGISTER New User 
router.post("/register", async (req, res) => {
  counterModel.findOneAndUpdate(
    { id: "autoval" },
    { "$inc": { "seq": 1 } },
    { new: true }, (err, cd) => {

      let seqId;
      if (cd == null) {
        const newval = new counterModel({ id: "autoval", seq: 1 })
        newval.save()
        seqId = 1
      } else {
        seqId = cd.seq
      }
      const newUser = new User({
        username: req.body.username,
        name:req.body.name,
        email: req.body.email,
        id: seqId

      });
      newUser.save()

    }
  )

  res.send("Register")


});





/* This code is written for user update. 
If the user id entered by the user matches with 
the user id in the database then the user will be updated. 
*/
//Update user
router.put("/update/:id", async (req, res) => {
  let upid = req.params.id;
  User.findOneAndUpdate({id:upid},
    { $set: req.body},
    { new: true }, (err, data) => {
      if (data == null) {
        res.send("nothing found")
      } else {
        res.send(data)
      }
    }
  );
})

//Get user 
router.get("/:id",(req,res)=>{
  fetchid=req.params.id;
  User.find(({id:fetchid}),(err,val)=>{
    if(err)
    {
      res.send("error")
    }else{
      if(val.length==0)
      {
        res.send("data does not exit");
      
      }else{
        res.send(val);
      }
    }
  })
})

//Get all users 
router.get("/",(req,res)=>{
  User.find((err,val)=>{
    if(err)
    {
      console.log(err)
    }
    else{
      res.json(val)
    }
  })
})

//Delete user

router.delete("/delete/:id",(req,res)=>{
  let delid=req.params.id;
  User.findOneAndDelete(({id:delid}),(err,doc)=>{
    if(doc==null)
    {
      res.send("wrong ID")
    }
    else
    {
      res.send(doc);
    }
  })
})


module.exports = router;