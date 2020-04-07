const express = require('express');

const router = express.Router();
const Post = require('./../models/post');


router.post("", (req, res, next) => {
  console.log('req.body');
  console.log(req)
	const post = new Post({
		title: req.body.title,
		content: req.body.content
  });
  post.save().then((result) => {
    res.status(201).json({
      message: "Post added success!!!",
      postId: result._id
    });
  });
});
router.put("/:id", (req, res, next) => {
  console.log("update");
  console.log(req.body);
  const id = req.body.id;
  const updatedPost = new Post({
    _id: id,
    title: req.body.title,
    content: req.body.content
  })
  Post.updateOne( {_id: id}, updatedPost ).then( (result) => {
    console.log("`Post id: ${id} updated`");
    console.log(result);

    res.status(200).json({
      message: `Post id: ${id} updated`
    })
  })
});
router.get("", (req, res, next) => {
	Post.find().then( (documents) => {
    res.status(200).json({
      message: "get posts",
      posts: documents
    })
  })
});
router.get("/:id", (req, res, next) =>{
  Post.findById(req.params.id).then((post) => {
    if(post){
      res.status(200).json({
        message: "get post",
        post: post
      })
    }
    else{
      res.status(404).json({
        message: "post not found!"
      })
    }
  })
})
router.delete("/:id", (req,res,next) => {
  Post.deleteOne( {_id:req.params.id} ).then(() => {
    console.log("POST DELETED");
    res.status(200).json({message: "Post Deleted"});
  })
});

module.exports = router;
