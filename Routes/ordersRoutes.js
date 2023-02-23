const router = require('express').Router();
const authController = require('../Controller/AuthController/authController');
const ordersController = require('../Controller/OrsersController/ordersController');

// For Shoppers
router.post('/create', authController.verifyAndAuthorizeShopper, ordersController.createOrder);
router.put('/cancel:id', authController.verifyAndAuthorizeShopper,ordersController.cancelOrder);
router.get('/getbyid:id',authController.verifyAndAuthorizeShopper,ordersController.getOrdersById);
// router.patch('/returnorder', ordersController.returnOrder);


// For Seller
// Admin Will get All Orders 
router.get('/getorders', ordersController.getAllOrders);

module.exports = router;