"use strict"
class imageRecognition {
	req;
	unirest = require('unirest');;
	constructor(){
		this.setup();
	}
	setup(){
		console.log("SETUP+++++++++++++++++++++");
		this.req = this.unirest("POST", "https://microsoft-azure-microsoft-computer-vision-v1.p.rapidapi.com/analyze");
		this.req.query({
			"visualfeatures": "Tags"
		});
		this.req.headers({
			"x-rapidapi-host": "microsoft-azure-microsoft-computer-vision-v1.p.rapidapi.com",
			"x-rapidapi-key": "65772e1677msh18c5c84e580c878p1d6825jsn6b909c923f83",
			"content-type": "application/json",
			"accept": "application/json"
		});
		this.req.type("json");
		console.log("SETUP++END+++++++++++++++++++");
	}
	sendUrl(url){
		console.log("SETUP SENDDDDD URLLLLLLLLLL");
		this.req.send({
			"url": url
		});
		return this.req;
	}
	sendFile(url){
		this.req.send({
			"url": url
		});
		this.req.end(function (res) {
			if (res.error) throw new Error(res.error);
			return res.body;
		});
	}
}

module.exports = imageRecognition;

