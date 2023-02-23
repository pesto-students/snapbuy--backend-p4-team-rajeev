const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema(
    {
        userid: { type: String, required: true },
        products: [
            {
                productid: {
                    type: String
                },
                title: {
                    type: String,
                },
                color: { type: String },
                size: { type: String },
                price: {type : Number},
                quantity: {
                    type: Number,
                    default: 1
                }
            }
        ],
        amount: { type: Number, required: true },
        address: { type: String }, 
        status: { type: String, default: "Pending" },
    }, { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);



