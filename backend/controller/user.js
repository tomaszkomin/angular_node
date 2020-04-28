const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const User = require("./../models/user");

const EXPIRATION_TIME = 3600;

exports.createUser = (req,res,next) => {
	console.log("signup action v.2 controller");
	bcrypt.hash(req.body.password, 10 ).then((hash) => {
		const user = new User({
			email: req.body.email,
			password: hash
		})
		user.save().then(result => {
			res.status(201).json({
				message: "User Created",
				result: result
			})
		}).catch(error => {
			res.status(500).json({
					message: "Invalid authentication credentials!"
				}
			)
		})
	})
}
exports.userLogin = (req,res,next) => {
	let userFetched = false;
	User.findOne({email: req.body.email})
		.then( user => {
			if(!user){
				return res.status(404).json({
					message: "Authentication Failed! :33"
				})
			}
			userFetched = user;
			return bcrypt.compare(req.body.password,user.password)
		})
		.then(resultCompare => {
			if (!resultCompare){
				return res.status(401).json({
					message: "Authentication error! :41"
				})
			}
			const token = jwt.sign(
				{ email: userFetched.email, userId: userFetched._id },
				enviroment.secret_salt,
				{ expiresIn: EXPIRATION_TIME}
			)
			return res.status(200).json({
				message: "Authentication success! :51",
				token: token,
				expiresIn: EXPIRATION_TIME,
				userId: userFetched._id,
				username: userFetched.email
			})
		})
		.catch(error => {
			console.error(error);
			return res.status(401).json({
				message: "Wrong username/password! :54"
			})
		})
}
