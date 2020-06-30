const express = require("express");
const app = express();
const mongoose = require('mongoose');
const bodyParser =  require('body-parser');
const morgan = require("morgan");

//databasev connection 
require('./mongo');

//models
require('./model/Post');

// middleware 

app.use(bodyParser.json())
    .use(morgan())

const Post = mongoose.model("Post")
app.get("/posts" , async (req , res)=>{
    try{
      const posts = await Post.find({})
    res.send(posts)  
    } catch (error) {
        res.status(500)
    } 
});

//delete data for get requst
app.get("/posts/:postID", async (req, res)=>{
    try {
        const post= await Post.find({_id: req.params.postID})
        res.send(post)
    } catch (error) {
        res.status(500)
    }
})

app.put("/posts/:postId", async(req, rews)=>{
    try {
        const post = await Post.findByIdAndUpdate({
            _id: req.params.postId
        }, req.body)
    } catch (error) {
        res.status(500)
    }
})
// insert data
app.post("/posts", async (req, res)=>{
try{
    const post = new Post();
    post.title = req.body.title;
    post.content = req.body.content;
    post.save();
    res.send(post)
}
catch(error){
    res.status(500)
}

})


app.listen(4000,()=>{
    console.log("Server is running on the port 4000")
})
    
