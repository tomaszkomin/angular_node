const jwt = require('jsonwebtoken');
const JWT_KEY =  "Secret_key_very_long_blabalablablab_daskdnoisfnhidjoiugfdiuhobdfghudsbuhidofughddd"

module.exports = (req, res, next) =>{
	try{
		const token = req.headers.authorization.split(" ")[1];
		const decodedToken = jwt.verify(token, JWT_KEY);
		req.userData = {email: decodedToken.email, userId: decodedToken.userId}
		next();
	} catch (error){
		res.status(401).json({message: "Auth Check Failed"});
	}
}
