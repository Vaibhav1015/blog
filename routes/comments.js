const router = require("express").Router();
const User = require("../models/User");
const Comment = require("../models/Comment");
const mongoose = require("mongoose");

//We are creating a schema for the counter collection of comments
const counterSchema = {
  id: {
    type: String
  },
  seq: {
    type: Number
  }
}


const commentCounterModel = mongoose.model("commentCounter", counterSchema);


/* 
 1. It's creating a new instance of the Comment class.
 2. It's setting the postId, username, email, body and commentId properties of the new instance.
 3. It's saving the new instance to the database.
*/
router.post("/", async (req, res) => {
  commentCounterModel.findOneAndUpdate(
    
    { id: "autoval" },
    { "$inc": { "seq": 1 } },
    { new: true }, (err, cd) => {

       let seqId;
      if (cd == null) {
         const newval = new commentCounterModel({ id: "autoval", seq: 1 })
        newval.save() 
        seqId = 1
      } else {
        seqId = cd.seq
        
      } 
      const newCom = new Comment({
        postId:req.body.postId,
        username: req.body.username,
        email:req.body.email,
        body:req.body.body,
        commentId: seqId
        

      });
      newCom.save()

    }
  )

  res.send("New Comment Created!!")


});


 //UPDATE Comment by commentID
router.put("/update/:id", async (req, res) => {
  let upid = req.params.id;
  Comment.findOneAndUpdate({commentId:upid},
    { $set: req.body},
    { new: true }, (err, data) => {
      if (data == null) {
        res.send("nothing found")
      } else {
        res.send(data)
      }
    }
  );
});


/* 
1. We are importing the express module and creating an instance of the express router.
2. We are importing the Comment model.
3. We are creating a route to get a single comment.
4. We are using the Delete method to Delete the comment from the database.
 */
router.delete("/delete/:id",(req,res)=>{
  let delid=req.params.id;
  Comment.findOneAndDelete(({commentId:delid}),(err,doc)=>{
    if(doc==null)
    {
      res.send("wrong ID")
    }
    else
    {
      res.send("Comment Deleted!!!!");
    }
  })
})


/*
1. It's creating a new instance of the express router.
2. It's creating a new route for the GET request.
3. It's fetching the id from the request parameters.
4. It's finding the comment with the id fetched from the request parameters.
*/
router.get("/:id",(req,res)=>{
  fetchid=req.params.id;
  Comment.find(({commentId:fetchid}),(err,val)=>{
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
2. We are importing the Comment model.
3. We are creating a route for the /comments endpoint.
4. We are using the find method to get all the comments from the database. 
*/
router.get("/",(req,res)=>{
  Comment.find((err,val)=>{
    if(err)
    {
      console.log(err)
    }
    else{
      res.json(val)
    }
  })
})
 

module.exports = router;