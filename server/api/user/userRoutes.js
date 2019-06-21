var router = require('express').Router();
var auth = require('./auth');
var verifyUser = auth.verifyUser;
var controller = require('./userController');
var checkUser = [auth.decodeToken(), auth.getFreshUser()];

router.post('/signin', verifyUser(), controller.signin);
router.post('/reset', checkUser, controller.resetSalary);
router.get('/me', checkUser, controller.me);
router.put('/', checkUser, controller.put);

module.exports = router;