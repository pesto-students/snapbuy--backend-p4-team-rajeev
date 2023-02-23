const router = require('express').Router();
const authControler = require('../Controller/AuthController/authController');
const SellersController = require('../Controller//SellersController/SellersController');


router.post('/register', authControler.registerSeller);

router.post('/login', authControler.login);

router.put('/update', authControler.verifyAndAuthorizeSeller, SellersController.updateSeller);

module.exports = router;