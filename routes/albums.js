const router = require("express").Router();
const mongoose = require("mongoose");
const Album = require("../models/Album");

const counterSchema = {
    id: {
      type: String
    },
    seq: {
      type: Number
    }
  }
  
  const AlbumCounterModel = mongoose.model("albumCounter", counterSchema);

//Create album
  router.post("/", async (req, res) => {
    AlbumCounterModel.findOneAndUpdate(
      
      { id: "autoval" },
      { "$inc": { "seq": 1 } },
      { new: true }, (err, cd) => {
  
         let seqId;
        if (cd == null) {
           const newval = new AlbumCounterModel({ id: "autoval", seq: 1 })
          newval.save() 
          seqId = 1
        } else {
          seqId = cd.seq
          
        } 
        const newAlbum = new Album({
          userId:req.body.userId,
          title:req.body.title,
          albumId: seqId
          
  
        });
        newAlbum.save()
  
      }
    )
  
    res.send("New Album Created!!")
  
  
  });


//update album by albumID
  router.put("/update/:id", async (req, res) => {
    let upid = req.params.id;
    Album.findOneAndUpdate({albumId:upid},
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



//Delete album by albumID
router.delete("/delete/:id",(req,res)=>{
    let delid=req.params.id;
    Album.findOneAndDelete(({albumId:delid}),(err,doc)=>{
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


//Get album by albumID

router.get("/:id",(req,res)=>{
    fetchid=req.params.id;
    Album.find(({albumId:fetchid}),(err,val)=>{
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




//get all albums
router.get("/",(req,res)=>{
    Album.find((err,val)=>{
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