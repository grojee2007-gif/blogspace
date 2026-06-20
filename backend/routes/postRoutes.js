const express = require("express");
const router = express.Router();

const Post = require("../models/Post");
const protect = require("../middleware/authMiddleware");


// CREATE POST
router.post(
"/",
protect,

async(req,res)=>{

try{

const {title,content}=req.body;

const post =
await Post.create({

title,
content,

author:
req.user.id

});

res.status(201).json(post);

}catch(error){

res.status(500).json({

message:
error.message

});

}

}
);


// GET POSTS
router.get(
"/",

async(req,res)=>{

try{

const posts =
await Post.find()

.populate(
"author",
"name email"
);

res.json(posts);

}catch(error){

res.status(500).json({

message:
error.message

});

}

}
);


// UPDATE POST
router.put(
"/:id",

protect,

async(req,res)=>{

try{

const updated =
await Post.findByIdAndUpdate(

req.params.id,

{
title:req.body.title,
content:req.body.content
},

{
new:true
}

);

res.json(updated);

}catch{

res.status(500).json({

message:
"Update failed"

});

}

}
);


// DELETE POST
router.delete(
"/:id",

protect,

async(req,res)=>{

try{

await Post.findByIdAndDelete(
req.params.id
);

res.json({

message:
"Deleted"

});

}catch{

res.status(500).json({

message:
"Delete failed"

});

}

}
);


// LIKE POST
router.put(
"/like/:id",

async(req,res)=>{

try{

const post =
await Post.findById(
req.params.id
);

post.likes += 1;

await post.save();

res.json(post);

}catch{

res.status(500).json({

message:
"Like failed"

});

}

}
);


// COMMENT
router.put(
"/comment/:id",

async(req,res)=>{

try{

const post =
await Post.findById(
req.params.id
);

post.comments.push({

text:
req.body.text

});

await post.save();

res.json(post);

}catch{

res.status(500).json({

message:
"Comment failed"

});

}

}
);


module.exports =
router;