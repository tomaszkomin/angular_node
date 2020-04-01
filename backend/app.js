const CONNECTION_STRING = 'mongodb+srv://tomaszkomin:dupadupa123@cluster0-2e7xh.mongodb.net/mean_course_database_app?retryWrites=true&w=majority';
const express = require('express');
const mongoose = require('mongoose');
const bodyParser= require('body-parser');
const Post = require('./models/post');

const app = express();
mongoose.connect(CONNECTION_STRING,{
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(()=>{
  console.log('CONNECTED');
}).catch((error) => {
  console.log("CONNENCTION TO MONGO DB ERROR 43");
  console.log(error);
})

app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin','*');
	res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS")
	next();
})

app.use(bodyParser.json());

app.post('/api/posts', (req, res, next) => {
	const posts = req.body;
	const post = new Post({
		title: posts.title,
		content: posts.content
	});
  console.log(post);
  post.save();
	res.status(201).json({
		message: "post request sendt"
	});
})

app.get('/api/posts', (req, res, next)=>{
	Post.find().then( (documents) => {
    console.log(documents);
    res.status(200).json({
      message: "Send rom nopde app.js",
      posts: documents
    })
  })
});

app.delete("/api/posts/:id", (req,res,next) => {
  console.log(req.params.id);
  req.status(200);
});
module.exports = app;
