const router = require('express').Router();
const authControler = require('../Controller/AuthController/authController');
const ordersController = require('../Controller/OrsersController/ordersController');


router.get('/', (req, res) => {
    res.status(200).json({
        staus : "UP"
    })
});

module.exports = router;