const CONNECTION_STRING = 'mongodb+srv://' + "tomaszkomin:dupadupa123@cluster0-2e7xh.mongodb.net" + '/mean_course_database_app?w=majority' ;
console.log(CONNECTION_STRING);
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
  console.log('CONNECTED');
  console.log(casual.city  + ' ' +  casual.country);
}).catch((error) => {
  console.log(error);
})

app.use("/images", express.static(path.join("images")));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin','*');
	res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');
	res.setHeader('Access-Control-Allow-Methods', ' GET, POST, PATCH, PUT, DELETE, OPTIONS');
	next();
})

app.use(bodyParser.json());

app.use("/api/posts", postRouters);
app.use("/api/user", userRouters);
module.exports = app;
