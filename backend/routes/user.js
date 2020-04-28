const enviroment = require('./../enviroment');
const express = require('express');
const UserController = require("../controller/user");
const router = express.Router();

const EXPIRATION_TIME = 3600;
router.post("/signup",UserController.createUser);
router.post("/login",UserController.userLogin);
module.exports = router;
