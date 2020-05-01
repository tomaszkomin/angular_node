"use strict"
class imageRecognition {
	req;
	unirest = require('unirest');;
	constructor(){
		this.setup();
	}
	setup(){
		this.req = this.unirest("POST", "https://microsoft-azure-microsoft-computer-vision-v1.p.rapidapi.com/describe");
	}
	sendUrl(url){
		this.req.headers({
			"x-rapidapi-host": "microsoft-azure-microsoft-computer-vision-v1.p.rapidapi.com",
			"x-rapidapi-key": "65772e1677msh18c5c84e580c878p1d6825jsn6b909c923f83",
			"content-type": "application/json",
			"accept": "application/json"
		});
		this.req.type("json");

		this.req.send({
			"url": url
		})
		return this.req;
	}
	sendFile(dataStream){
		const axios = require("axios");

	axios({
		"method":"POST",
		"url":"https://microsoft-azure-microsoft-computer-vision-v1.p.rapidapi.com/describe",
		"headers":{
		"content-type":"multipart/form-data",
		"x-rapidapi-host":"microsoft-azure-microsoft-computer-vision-v1.p.rapidapi.com",
		"x-rapidapi-key":"65772e1677msh18c5c84e580c878p1d6825jsn6b909c923f83"
		},"data":[{
			"body":{
				dataStream
			},"content-type":"application/octet-stream"
			}]
		})
		.then((response)=>{
			console.log(response)
		})
		.catch((error)=>{
			console.log(error)
		})
	}
}
module.exports = imageRecognition;

