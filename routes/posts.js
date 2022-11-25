const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment")
const mongoose = require("mongoose");


//We are creating a schema for the counter collection of posts
const counterSchema = {
  id: {
    type: String
  },
  seq: {
    type: Number
  }
}


const postCounterModel = mongoose.model("postCounter", counterSchema);


/* 
1. It's finding the document with the id "autoval"
2. If it doesn't exist, it creates it and sets the seq value to 1
3. If it does exist, it increments the seq value by 1
4. We're creating a constructor that takes in a userId, title, body, and postId.
5. We're saving the newPost instance to the database.
 */
router.post("/", async (req, res) => {
  postCounterModel.findOneAndUpdate(
    
    { id: "autoval" },
    { "$inc": { "seq": 1 } },
    { new: true }, (err, cd) => {

       let seqId;
      if (cd == null) {
         const newval = new postCounterModel({ id: "autoval", seq: 1 })
        newval.save() 
        seqId = 1
      } else {
        seqId = cd.seq
      } 
      const newPost = new Post({
        userId:req.body.userId,
        title: req.body.title,
        body:req.body.body,
        postId: seqId

      });
      newPost.save()

    }
  )

  res.send("New Post Created!!")


});
/* 
1. This code is written for posts update. 
2. If the postId entered by the user matches with the postId in the database then the user will be updated. 
*/
router.put("/update/:id", async (req, res) => {
  let upid = req.params.id;
  Post.findOneAndUpdate({postId:upid},
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
2. We are importing the Post model.
3. We are creating a route to get a single post.
4. We are using the Delete method to Delete the post from the database.
 */
router.delete("/delete/:id",(req,res)=>{
  let delid=req.params.id;
  Post.findOneAndDelete(({postId:delid}),(err,doc)=>{
    if(doc==null)
    {
      res.send("wrong ID")
    }
    else
    {
      res.send("Post Deleted!!!!");
    }
  })
})


/*
1. It's creating a new instance of the express router.
2. It's creating a new route for the GET request.
3. It's fetching the id from the request parameters.
4. It's finding the user with the id fetched from the request parameters.
*/
router.get("/:id",(req,res)=>{
  fetchid=req.params.id;
  Post.find(({postId:fetchid}),(err,val)=>{
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



//Get single post comments

router.get("/:id/comments",(req,res)=>{
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

/* 
1. We are importing the express module and creating an instance of the express router.
2. We are importing the Post model.
3. We are creating a route for the /posts endpoint.
4. We are using the find method to get all the posts from the database. 
*/
router.get("/",(req,res)=>{
  Post.find((err,val)=>{
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