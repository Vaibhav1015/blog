const router = require("express").Router();
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const Photo = require("../models/Photo");



//We are creating a schema for the counter collection of photos
const counterSchema = {
    id: {
      type: String
    },
    seq: {
      type: Number
    }
  }
  
  
  const photoCounterModel = mongoose.model("photoCounter", counterSchema);





/* 
  1. We are creating a storage object that will store the image in the upload/images folder.
  2. We are creating a multer object that will store the image in the storage object.
 */
const storage = multer.diskStorage({
    destination: './upload/images',
    filename:(req,file,cb)=>{
     return cb(null,`${file.filename}_${Date.now()}${path.extname(file.originalname)}`) 
    }
  })
  
  const upload = multer({
    storage:storage
  })

/* 
 1. It's creating a new instance of the Photo class.
 2. It's setting the albumId, title, url, and photoId properties of the new instance.
 3. It's saving the new instance to the database.
*/
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


/*
1. It's creating a new instance of the express router.
2. It's creating a new route for the GET request.
3. It's fetching the id from the request parameters.
4. It's finding the photo with the id fetched from the request parameters.
*/
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


/* 
1. We are importing the express module and creating an instance of the express router.
2. We are importing the Photo model.
3. We are creating a route for the /photos endpoint.
4. We are using the find method to get all the photos from the database. 
*/
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


/* 
1. We are importing the express module and creating an instance of the express router.
2. We are importing the Photo model.
3. We are creating a route to get a single photo.
4. We are using the Delete method to Delete the photo from the database.
 */

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