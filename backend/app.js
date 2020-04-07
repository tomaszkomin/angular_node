const CONNECTION_STRING = 'mongodb+srv://tomaszkomin:dupadupa123@cluster0-2e7xh.mongodb.net/mean_course_database_app?retryWrites=true&w=majority';
const express = require('express');
const mongoose = require('mongoose');
const bodyParser= require('body-parser');

const postRouters = require('./routes/posts')

const app = express();
mongoose.connect(CONNECTION_STRING,{
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(()=>{
  console.log('CONNECTED');
}).catch((error) => {
  console.log("CONNENCTION TO MONGO DB ERROR 413");
})

app.use((req,res,next)=>{
  console.log("CORS SETUP");
  res.setHeader('Access-Control-Allow-Origin','*');
	res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
	res.setHeader('Access-Control-Allow-Methods', ' GET, POST, PATCH, PUT, DELETE, OPTIONS');
	next();
})

app.use(bodyParser.json());

app.use("/api/posts/",postRouters);
module.exports = app;
