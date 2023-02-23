const Order = require("../../models/Order");
const Product = require("../../models/Product");

// create Orders
exports.createOrder = async (req, res) => {

    req.body.userid = req.user.id;
    const newOrder = new Order(req.body);
    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    } catch (error) {
        res.status(200).json(error);
    }
}

exports.confirmOrder = async (req, res) => {
    try {
        const canceledOrder = await Order.findByIdAndUpdate(req.params.id, {
            status: "Confirmed"
        }, { new: true });
        res.status(200).json(canceledOrder);
    } catch (error) {
        res.status(500).json(error);
    }
}


// get Orders By Id
exports.getOrdersById = async (req, res) => {
    try {
        const order = await Order.find({ userid: req.params.id });
        if (order) {

            res.status(200).json(order);
        } else {
            res.status(204).json("Could Not find Any Orders for this Shopper");
        }
    } catch (error) {
        res.status(500).json(error);
    }
}




// Get All Orders 
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        if (orders) {
            res.status(200).json(orders);
        }
    } catch (error) {
        res.status(500).json(error);
    }
}


exports.cancelOrder = async (req, res) => {
    try {
        const canceledOrder = await Order.findByIdAndUpdate(req.params.id, {
            status: "Cancelled"
        }, { new: true });
        res.status(200).json(canceledOrder);
    } catch (error) {
        res.status(500).json(error);
    }

    // res.json("Request for CancelOrders");
}


exports.returnOrder = async (req, res) => {

    res.json("Request for returnOrder");
}





// Fetch orders from orders table that matches a specific seller id and the given Filters 
exports.getOrdersForSeller = async (req, res) => {

    res.json("Request for Gel All Orders for Seller with Filter");
}


