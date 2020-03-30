const express = require('express');
//console.log(express);
const app = express();
const bodyParser= require('body-parser');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded())


app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS")
  console.log(res);
  next();
})

app.post('/api/posts', (req, res, next) => {
  const posts = req.body;
  console.log('ADD  POST REQUEST FROM EXPRESS');
  console.log(posts);
  res.status(201).json({
    message: "post request sendt"
  });
})

app.use('/api/posts', (req, res, next)=>{
  const posts = [
    {
      id:1,
      title:"TITLE FROM NODEMON",
      content:"CONTENT FROM NODEMON"
    },
    {
      id:2,
      title:"2nd TITLE FROM NODE 2",
      content:"2nd CONTENT FROM NODE 2"
    }
  ]
  res.status(200).json({
    message: "Send rom nopde app.js",
    posts: posts
  })
});

module.exports = app;
