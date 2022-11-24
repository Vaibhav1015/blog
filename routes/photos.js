const router = require("express").Router();
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const Photo = require("../models/Photo");



//Counter model to count a post data id's 
const counterSchema = {
    id: {
      type: String
    },
    seq: {
      type: Number
    }
  }
  
  
  const photoCounterModel = mongoose.model("photoCounter", counterSchema);






//storage engine 
const storage = multer.diskStorage({
    destination: './upload/images',
    filename:(req,file,cb)=>{
     return cb(null,`${file.filename}_${Date.now()}${path.extname(file.originalname)}`) 
    }
  })
  
  const upload = multer({
    storage:storage
  })
  //create photos in albums ID 
  router.post("/upload",upload.single('photo'),(req,res)=>{
    photoCounterModel.findOneAndUpdate(
    
        { id: "autoval" },
        { "$inc": { "seq": 1 } },
        { new: true }, (err, cd) => {
    
           let seqId;
          if (cd == null) {
             const newval = new photoCounterModel({ id: "autoval", seq: 1 })
            newval.save() 
            seqId = 1
          } else {
            seqId = cd.seq
          } 
          const Url =req.protocol+'://'+req.get("host")
          const newPhoto = new Photo({
            albumId:req.body.albumId,
            title:req.body.title,
            url:Url+'/upload/images'+'/'+req.file.filename,
            photoId: seqId
    
          });
          newPhoto.save()
    
        }
      )
    
      res.send("New Photo uploaded!!")
  })


//get photos by photoId 
  router.get("/:id",(req,res)=>{
    fetchid=req.params.id;
    Photo.find(({photoId:fetchid}),(err,val)=>{
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

// update photos by photoID

router.put("/update/:id", async (req, res) => {
  let upid = req.params.id;
  Photo.findOneAndUpdate({photoId:upid},
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


// Get all photos 
router.get("/",(req,res)=>{
  Photo.find((err,val)=>{
    if(err)
    {
      console.log(err)
    }
    else{
      res.json(val)
    }
  })
})



// delete photos by photoID

router.delete("/delete/:id",(req,res)=>{
  let delid=req.params.id;
  Photo.findOneAndDelete(({photoId:delid}),(err,doc)=>{
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









module.exports = router;