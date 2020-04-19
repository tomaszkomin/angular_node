const express = require('express');
const router = express.Router();
const multer = require('multer'); //parser for filetype uploads
const ImageRecognitionApp = require('../api/imageRecognition');
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
// get post
router.get("", (req, res, next) => {

	const pageSize = req.query.pageSize;
	const currentPage = req.query.page;
	const postQuery = Posts.find();
	let fetchedPostsCount;
	let fetchedDocuments;

	if (pageSize && currentPage) {
		postQuery
			.skip(pageSize * (currentPage - 1))
			.limit(+pageSize);
	}
	postQuery
		.then( (documents) => {
			fetchedDocuments = documents
			return Posts.estimatedDocumentCount();
		})
		.then((postCount) => {
			res.status(200).json({
				message: "POST FETCHED SUCCESS",
				posts: fetchedDocuments,
				postCount : postCount
			})
		})
});
// get post by @id
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
// add Post
router.post("", multer({storage:storageConfig}).single("image"), (req, res, next) => {

	const url = req.protocol + '://' + req.get("host");
	const testImageUrl = "https://i1.jbzd.com.pl/contents/2020/04/normal/MnNQIMU9GylxTcztWMP9b2EpmI23w18x.jpg";
	//const tags = [{"tag" : "test tag v1.2"}];
	let tagsFromImage;
	const imageRecognition = new ImageRecognitionApp()
	console.log("api started");
	imageRecognition.sendUrl(testImageUrl).end(function (res) {
		console.log("starting recognition api")
		if (res.error) throw new Error(res.error);
		tagsFromImage  = res.body;
		console.log("tags inside");
		console.log(tagsFromImage);
		const posts = new Posts({
			title: req.body.title,
			content: req.body.content,
			imageUrl: url + '/images/' +  req.file.filename,
			tags: tagsFromImage
		});
		console.log(posts);
		posts.save().then((result) => {
			res.status(201).json({
				message: "Post added success!!!",
				post : {
					...result,
					id: result._id,
				}
			});
		});
	});
});
// update Post
router.put("/:id", multer({storage:storageConfig}).single("image"), (req, res, next) => {

	let imageUrl = req.body.imageUrl;
	if(req.file){
		const url = req.protocol + '://' + req.get("host");
		imageUrl = url + "/images/" + req.file.filename;
	};
	const id = req.params.id;
	const updatedPost = new Posts({
		_id: id,
		title: req.body.title,
		content: req.body.content,
		imageUrl: imageUrl
	})
	Posts.updateOne( {_id: id}, updatedPost ).then( (result) => {
		console.log("Post id: " +id+ "updated");
		res.status(200).json({
		message: `Post id: ${id} updated`
		})
	})
});
router.delete("/:id", (req,res,next) => {
	Posts.deleteOne( {_id:req.params.id} ).then(() => {
		console.log("POST DELETED");
		res.status(200).json({message: "Post Deleted"});
	})
});

module.exports = router;
