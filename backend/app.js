const CONNECTION_STRING = 'mongodb+srv://' + "tomaszkomin:dupadupa123@cluster0-2e7xh.mongodb.net" + '/mean_course_database_app?w=majority' ;

const express = require('express');
const mongoose = require('mongoose');
const bodyParser= require('body-parser');
const path = require("path");
const casual = require('casual');
const postRouters = require('./routes/posts');
const userRouters = require('./routes/user');

const app = express();
mongoose.connect(CONNECTION_STRING,{
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(()=>{
}).catch((error) => {
  console.log(error);
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//static routes
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/", express.static(path.join(__dirname, "angular")));

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin','*');
	res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');
	res.setHeader('Access-Control-Allow-Methods', ' GET, POST, PATCH, PUT, DELETE, OPTIONS');
	next();
})

app.use("/api/posts", postRouters);
app.use("/api/user", userRouters);
// any request not targeting api are used as angular front
app.use((req, res, next)=>{
	res.sendFile(path.join(__dirname, "angular", "index.html"))
})
module.exports = app;
