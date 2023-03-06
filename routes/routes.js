var express=require("express");
var userController = require('../src/user/userController');
const router = express.Router();



router.route('/user/login').get(userController.loginUserControllerFn);

router.route('/user/create').post(userController.createUserControllerFn);

module.exports = router;