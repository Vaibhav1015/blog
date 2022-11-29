const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const mongoose = require("mongoose");


//We are creating a schema for the counter collection of users.
const counterSchema = {
  id: {
    type: String
  },
  seq: {
    type: Number
  }
}


const counterModel = mongoose.model("counter", counterSchema);



/* 
1. It's creating a new user with the username, name, email and id.
2. It's also incrementing the id by 1.
3. It's saving the new user. 
*/
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





/* 
1. This code is written for user update. 
2. If the user id entered by the user matches with the user id in the database then the user will be updated. 
*/

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

/*
1. It's creating a new instance of the express router.
2. It's creating a new route for the GET request.
3. It's fetching the id from the request parameters.
4. It's finding the user with the id fetched from the request parameters.
 */
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

/* 
1. We are importing the express module and creating an instance of the express router.
2. We are importing the User model.
3. We are creating a route for the /users endpoint.
4. We are using the find method to get all the users from the database. 
*/
router.get("/",(req, res)=>{
  User.find((err,val)=>{
    if(err)
    {
      console.log(err)
    }
    else{
      return res.send(val);
    }
  })
})

/* 
1. We are importing the express module and creating an instance of the express router.
2. We are importing the User model.
3. We are creating a route to get a single user.
4. We are using the Delete method to Delete the user from the database.
 */

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

router.get("/:id/posts",(req,res)=>{
  fetchid=req.params.id;
  Post.find(({userId:fetchid}),(err,val)=>{
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


module.exports = router;