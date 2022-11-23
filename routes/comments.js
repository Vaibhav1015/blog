const router = require("express").Router();
const User = require("../models/User");
const Comment = require("../models/Comment");
const mongoose = require("mongoose");

//Counter model to count a post data id's 
const counterSchema = {
  id: {
    type: String
  },
  seq: {
    type: Number
  }
}


const commentCounterModel = mongoose.model("commentCounter", counterSchema);


//Create new comment on post
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


 //UPDATE Comment
router.put("/update/:id", async (req, res) => {
  let upid = req.params.id;
  Comment.findOneAndUpdate({postId:upid},
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


//DELETE Comment
router.delete("/delete/:id",(req,res)=>{
  let delid=req.params.id;
  Comment.findOneAndDelete(({postId:delid}),(err,doc)=>{
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


//GET Comment
router.get("/:id",(req,res)=>{
  fetchid=req.params.id;
  Comment.find(({postId:fetchid}),(err,val)=>{
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



//GET ALL Comments
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