var router = require('express').Router();
var controller = require('./sessionController');
var auth = require('../user/auth');

var checkUser = [auth.decodeToken(), auth.getFreshUser()];

router.param('id', controller.params);

router.route('/')
    .get(checkUser, controller.get)
    .post(checkUser, controller.post);

router.post('/addSalary/:id', controller.addSum);
router.post('/subtSalary/:id', controller.subtractSum);

router.route('/:id')
    .get(checkUser, controller.getOne)
    .put(checkUser, controller.put)
    .delete(checkUser, controller.delete);

module.exports = router;