const express = require('express');
const router = express.Router();
const multer = require('multer'); //parser for filetype uploads
const Posts = require('../models/post');

const MIIE_TYPE_MAP = {
	'image/png':'png',
	'image/jpg':'jpg',
	'image/jpeg':'jpg'
}
const storageConfig = multer.diskStorage({
  	destination: (req, file, callback) => {
		const isValid = MIIE_TYPE_MAP[file.mimetype];
		let error = new Error("Invalid File Type");
		if(isValid){
			error = null;
		}
		callback(error, "backend/images");
	},
	filename: ( req, file, callback) => {
		const name = file.originalname.toLocaleLowerCase().split(' ').join('-');
		const ext = MIIE_TYPE_MAP[file.mimetype]
		callback(null, name + '-' + Date.now() + '.' + ext)
	}
});
// addPost
router.post("", multer({storage:storageConfig}).single("image"), (req, res, next) => {
	console.log("ADD POST");
	console.log(req.body);
	console.log(req.file);

	const url = req.protocol + '://' + req.get("host");
	const posts = new Posts({
		title: req.body.title,
		content: req.body.content,
		imageUrl: url + '/images/' +  req.file.filename

	});
	console.log("POST DUMP");
	console.log(posts);
	posts.save().then((result) => {
		console.log("FROM BACKEND SAVE")
		console.log(result);
		res.status(201).json({
			message: "Post added success!!!",
			post : {
				...result,
				id: result._id,
			}
		});
	});
});
router.put("/:id", (req, res, next) => {
	const id = req.body.id;
	const updatedPost = new Post({
		_id: id,
		title: req.body.title,
		content: req.body.content
	})
	Posts.updateOne( {_id: id}, updatedPost ).then( (result) => {
		console.log("`Post id: ${id} updated`");
		console.log(result);

		res.status(200).json({
		message: `Post id: ${id} updated`
		})
	})
});
router.get("", (req, res, next) => {
	console.log("GET POSTS");
	Posts.find().then( (documents) => {
	res.status(200).json({
	  message: "get posts",
	  posts: documents
	})
  })
});
router.get("/:id", (req, res, next) =>{
	Posts.findById(req.params.id).then((post) => {
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
	Posts.deleteOne( {_id:req.params.id} ).then(() => {
		console.log("POST DELETED");
		res.status(200).json({message: "Post Deleted"});
	})
});

module.exports = router;
