var router = require('express').Router();

router.use('/users', require('./user/userRoutes'));
router.use('/sessions', require('./session/sessionRoutes'));

module.exports = router;