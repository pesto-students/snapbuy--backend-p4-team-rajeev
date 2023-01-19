const router = require('express').Router();
const authControler = require('../Controller/AuthController/authController');
const shoppersController = require('../Controller/ShoppersController/ShoppersController');


router.post('/register', authControler.registerShopper);

router.put('/update', authControler.verifyAndAuthorizeShopper,shoppersController.updateShopper);

router.post('/login', authControler.login);

module.exports = router;