const multer = require("multer")
const MIIE_TYPE_MAP = {
	'image/png':'png',
	'image/jpg':'jpg',
	'image/jpeg':'jpg'
}
const storageConfig = multer.diskStorage({
  	destination: (req, file, callback) => {
		const isValid = MIIE_TYPE_MAP[file.mimetype];
		let error = new Error("Invalid File Type");
		if(isValid){
			error = null;
		}
		callback(error, "images");
	},
	filename: ( req, file, callback) => {
		const name = file.originalname.toLocaleLowerCase().split(' ').join('-');
		const ext = MIIE_TYPE_MAP[file.mimetype]
		callback(null, name + '-' + Date.now() + '.' + ext)
	}
});
module.exports = multer({storage:storageConfig}).single("image");
