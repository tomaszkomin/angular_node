const checkAuth = require('./../middleware/check-auth');
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
		.catch((error) => {
			res.status(500).json({
				message: "Fetching post failed!"
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
router.post("", checkAuth, multer({storage:storageConfig}).single("image"), (req, res, next) => {

	const url = req.protocol + '://' + req.get("host");
	//const testImageUrl = "https://ocdn.eu/pulscms-transforms/1/XStktkqTURBXy82ZGNlMjY4NWNiOTE4ZTY2MzcxNzhiZDFkNTA0MTM3Zi5qcGVnkZMCAM0B5A";
	//const imageRecognition = new ImageRecognitionApp();
	// const fs = require('fs');
	// let dataStream;
	// try {
	// 	 dataStream = fs.readFileSync('backend/images/'+ req.file.filename, 'utf8');
	// } catch(e) {
	// 	console.log('Error:', e.stack);
	// }
	//@to do add promise here
	//let tagsFromImage = imageRecognition.sendUrl(testImageUrl);
	//let tagsFromImage = imageRecognition.sendFile(multer({storage:storageConfig}).single("image"));
	let tagsFromImage = [{}];
	// console.log("RESULT COMPLETE");
	// console.log(tagsFromImage)

	const posts = new Posts({
		title: req.body.title,
		content: req.body.content,
		imageUrl: url + '/images/' +  req.file.filename,
		tags: tagsFromImage,
		createdBy: req.userData.userId
	});
	posts.save().then((result) => {
		res.status(201).json({
			message: "Post added success!!!",
			post : {
				...result,
				id: result._id,
			}
		});
	})
	.catch(error => {
		res.status(500).json({
			message: "Crate Post Failed"
		})
	});
});
// update Post
router.put("/:id", checkAuth, multer({storage:storageConfig}).single("image"), (req, res, next) => {

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
	Posts.updateOne({_id: id, createdBy: req.userData.userId}, updatedPost)
		.then((result) => {
			console.log(result);
			if(result.nModified > 0){
				res.status(200).json({message: `Post id: ${id} updated`})
			}
			else{
				res.status(401).json({message: `Post not updated`})
			}
		})
		.catch((error) =>{
			res.status(500).json({message: "Post update failed"})
		})
});
router.delete("/:id", checkAuth,  (req,res,next) => {
	Posts.deleteOne({_id:req.params.id, createdBy: req.userData.userId})
		.then((result) => {
			console.log(result);
			if(result.n > 0){
				res.status(200).json({message: "Post Deleted"});
			}
			else{
				res.status(401).json({message: `Post not Deleted`})
			}
		})
});

module.exports = router;
