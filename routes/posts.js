const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
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


const postCounterModel = mongoose.model("postCounter", counterSchema);





/* A route is a section of Express code that associates an 
HTTP verb (GET, POST, PUT, DELETE, etc.), a URL path/pattern, 
and a function that is called to handle that pattern. 

Created a posts routes here..
*/

/* For POST request use router.post() method: 
   Create Post..
*/
//REGISTER New User 
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

/* For PUT request use router.put() method: 
   You can find and update post by ID..
   Update Post..
*/
router.put("/update/:id", async (req, res) => {
  let upid = req.params.id;
  Post.findOneAndUpdate({userId:upid},
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

/* For DELETE request use router.delete() method
   For deleteing a post ID is required..
   Delete Post..
*/
router.delete("/delete/:id",(req,res)=>{
  let delid=req.params.id;
  Post.findOneAndDelete(({userId:delid}),(err,doc)=>{
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


/* For GET request use router.get() method
   Find a post by ID..
   Get Post..
*/
router.get("/:id",(req,res)=>{
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


//Get all posts
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