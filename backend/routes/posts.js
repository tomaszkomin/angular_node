const express = require('express');
const fileConfig = require('./../middleware/file-config');
const checkAuth = require('./../middleware/check-auth');
const router = express.Router();
const PostsController = require("./../controller/posts")

router.get(
	"",
	PostsController.getPosts
);
router.get(
	"/:id",
	PostsController.getPost
);
router.post(
	"",
	checkAuth,
	fileConfig,
	PostsController.addPost
	);
router.put(
	"/:id",
	checkAuth,
	fileConfig,
	PostsController.updatePost
);
router.delete(
	"/:id",
	checkAuth,
	PostsController.deletePost
);

module.exports = router;
