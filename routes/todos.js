const router = require("express").Router();
const Todo = require("../models/Todo");
const mongoose = require("mongoose");

//We are creating a schema for the counter collection of todos
const counterSchema = {
    id: {
        type: String
    },
    seq: {
        type: Number
    }
}


const todoCounterModel = mongoose.model("todoCounter", counterSchema);





router
    .post("/add", (req, res) => {

        todoCounterModel.findOneAndUpdate(
            { id: "autoval" },
            { "$inc": { "seq": 1 } },
            { new: true }, (err, cd) => {

                let seqId;
                if (cd == null) {
                    const newval = new todoCounterModel({ id: "autoval", seq: 1 })
                    newval.save()
                    seqId = 1
                } else {
                    seqId = cd.seq
                }
                const newTodo = new Todo({
                    userId:req.body.userId,
                    content: req.body.content,
                    todoId: seqId

                })
                newTodo
                    .save()
                    /* .then(() => {
                        console.log("Successfully added todo!");
                       // res.redirect("/");
                    })  */
                    .catch((err) => console.log(err));
            })
        res.send("New Todo Created!!")
    })



router.put('/update/:id', (req, res) => {
    const upid = req.params.id
    Todo.findOneAndUpdate({ todoId: upid }, { $set: req.body },
        { new: true }, (err, data) => {
            if (data == null) {
                res.send("nothing found")
            } else {
                res.send(data)
            }
        })

});



// Get Todo by todoId
router.get("/:id",(req,res)=>{
    fetchid=req.params.id;
    Todo.find(({todoId:fetchid}),(err,val)=>{
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

// Get all Todo list

router.get("/",(req,res)=>{
    Todo.find((err,val)=>{
      if(err)
      {
        console.log(err)
      }
      else{
        res.json(val)
      }
    })
  })


// Delete Todo by TodoId
router.delete("/delete/:id",(req,res)=>{
    let delid=req.params.id;
    Todo.findOneAndDelete(({todoId:delid}),(err,doc)=>{
      if(doc==null)
      {
        res.send("wrong ID")
      }
      else
      {
        res.send("Todo Deleted!!!!");
      }
    })
  })


module.exports = router;