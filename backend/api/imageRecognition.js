"use strict"
class imageRecognition {

	constructor(){
		this.setup();
	}
	setup(){
		console.log("SETUP+++++++++++++++++++++");
	}
	sendUrl(url){
		console.log("SETUP SENDDDDD URLLLLLLLLLL");
		const unirest = require('unirest');
		let req = unirest("POST", "https://microsoft-azure-microsoft-computer-vision-v1.p.rapidapi.com/analyze");
		req.query({
			"visualfeatures": "Tags"
		});
		req.headers({
			"x-rapidapi-host": "microsoft-azure-microsoft-computer-vision-v1.p.rapidapi.com",
			"x-rapidapi-key": "65772e1677msh18c5c84e580c878p1d6825jsn6b909c923f83",
			"content-type": "application/json",
			"accept": "application/json"
		});
		req.type("json");
		req.send({
			"url": "https://upload.wikimedia.org/wikipedia/commons/1/11/Kanye_West_at_the_2009_Tribeca_Film_Festival.jpg"
		});
		req.end(function (res) {
			console.log(" =================================res======================================");
			console.log(res);
			if (res.error) throw new Error(res.error);
			console.log(res.body);
			return res.body;
		});
	}
	sendFile(url){
		this.req.send({
			"url": url
		});
		this.req.end(function (res) {
			if (res.error) throw new Error(res.error);
			console.log(res.body);
			return res.body;
		});
	}
}

module.exports = imageRecognition;

