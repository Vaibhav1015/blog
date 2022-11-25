const router = require("express").Router();
const mongoose = require("mongoose");
const Album = require("../models/Album");

//We are creating a schema for the counter collection of albums
const counterSchema = {
    id: {
      type: String
    },
    seq: {
      type: Number
    }
  }
  
  const AlbumCounterModel = mongoose.model("albumCounter", counterSchema);

/* 
 1. It's creating a new instance of the Album class.
 2. It's setting the userId, title and albumtId properties of the new instance.
 3. It's saving the new instance to the database.
*/
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



/* 
1. We are importing the express module and creating an instance of the express router.
2. We are importing the Album model.
3. We are creating a route to get a single album.
4. We are using the Delete method to Delete the album from the database.
 */
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


/*
1. It's creating a new instance of the express router.
2. It's creating a new route for the GET request.
3. It's fetching the id from the request parameters.
4. It's finding the album with the id fetched from the request parameters.
*/

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




/* 
1. We are importing the express module and creating an instance of the express router.
2. We are importing the Album model.
3. We are creating a route for the /albums endpoint.
4. We are using the find method to get all the albums from the database. 
*/
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