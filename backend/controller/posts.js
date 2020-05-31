
const ImageRecognitionApp = require('./../api/imageRecognition');
const Posts = require('./../models/post');

exports.getPosts = (req, res, next) => {
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
}
exports.getPost = (req, res, next) =>{
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
}
exports.addPost = async (req, res, next) => {
	const url = req.protocol + '://' + req.get("host");
	let imageUrl = url + '/images/' + req.file.filename;
	const imageRecognition = new ImageRecognitionApp();
	let tagsFromImage  = {}
	try{
		const imageApiResult = await imageRecognition.sendUrl(imageUrl);
		console.log(imageApiResult)
		tagsFromImage = imageApiResult.description ? imageApiResult.description : 'Image URL'+imageApiResult+' is not accessible';
	}
	catch(error){
		tagsFromImage = { error: "image recognition service fail" };
		console.log("ERROR CAUGHT");
		console.log(error);
	}
	const posts = new Posts({
		title: req.body.title,
		content: req.body.content,
		imageUrl: imageUrl,
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
	}).catch(error => {
		console.log(error);
		res.status(500).json({

			message: "Crate Post Failed"
		})
	});
}
exports.updatePost = async (req, res, next) => {

	let imageUrl = req.body.imageUrl;
	if(req.file){
		const url = req.protocol + '://' + req.get("host");
		imageUrl = url + "/images/" + req.file.filename;

	};
	const id = req.params.id;
	const imageRecognition = new ImageRecognitionApp();
	let tagsFromImage  = {};
	const imageApiResult = await imageRecognition.sendUrl(imageUrl);
	tagsFromImage = imageApiResult.description ? imageApiResult.description : 'Image URL is not accessible';
	if (res.error) throw new Error(res.error);

	const updatedPost = new Posts({
		_id: id,
		title: req.body.title,
		content: req.body.content,
		imageUrl: imageUrl,
		tags: tagsFromImage
	})
	Posts.updateOne({_id: id, createdBy: req.userData.userId}, updatedPost)
		.then((result) => {
			if(result.n > 0){
				res.status(200).json({message: `Post id: ${id} updated`})
			}
			else{
				res.status(401).json({message: `Post not updated`})
			}
		})
		.catch((error) =>{
			res.status(500).json({message: "Post update failed"})
		})

}
exports.deletePost = (req, res, next) => {
	Posts.deleteOne({_id:req.params.id, createdBy: req.userData.userId})
		.then((result) => {
			if(result.n > 0){
				res.status(200).json({message: "Post Deleted"});
			}
			else{
				res.status(401).json({message: `Post not Deleted`})
			}
		})
}
