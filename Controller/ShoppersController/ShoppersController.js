const Shopper = require('../../models/Shopper');
const CryptoJS = require('crypto-js');


exports.updateShopper = async (req, res) => {
    console.log("Reached to Update Shopper" + req.user.id);
    if(req.body.password){
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(); 
    }
    try {
        const updatedUser = await Shopper.findByIdAndUpdate(req.user.id, {
            $set: req.body
        }, {new: true});
        res.status(200).json(updatedUser);
        
    } catch (error) {
        res.status(500).json("Could Not Update " + error)
    }
}
