const Shopper = require('../../models/Shopper');
const Seller = require('../../models/Seller');
const catchAsync = require('../../utils/catchAsync');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');


// Verify & Authorize Seller 
exports.verifyAndAuthorizeSeller = catchAsync(async (req, res, next) => {
    console.log("Request to Verify JWT in authController");
    try {
        const token = req.headers['authorization'];
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, authData) => {
            if (err) {
                return res.status(403).json("Token is not valid");
            } else {
                req.user = authData;
                if (req.user.id && req.user.role === "seller") {
                    next();
                }
                else {
                    res.status(403).json("Access Denied");
                }
            }
        });
    } catch (error) {
        // Access Denied
        console.log(error);
        return res.status(401).send("you are not authenticated");
    }

});


// Verify & Authorize Shopper 
exports.verifyAndAuthorizeShopper = catchAsync(async (req, res, next) => {
    console.log("Request to Verify JWT in authController");
    try {
        const token = req.headers['authorization'];
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, authData) => {
            if (err) {
                return res.status(403).json("Token is not valid");
            } else {
                req.user = authData;
                if (req.user.id && req.user.role === "shopper") {
                    next();
                }
                else {
                    res.status(403).json("Access Denied");
                }

            }
        });
    } catch (error) {
        // Access Denied
        console.log(error);
        return res.status(401).send("you are not authenticated");
    }

});


// Registration for Shopper
exports.registerShopper = catchAsync(async (req, res, next) => {
    console.log("Request for Register Shopper");

    // Verify If Mail Id exists
    const data = await Shopper.findOne({ "email": req.body.email });
    console.log(data);
    data && res.status(500).json("Mail id already Exists");

    const newShopper = new Shopper({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        mobilenumber: req.body.mobilenumber,
        age: req.body.age,
        gender: req.body.gender,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
        address: {
            country: req.body.address.country,
            State: req.body.address.State,
            city: req.body.address.city,
            street: req.body.address.street,
            zip: req.body.address.zip,
        }
    });

    try {
        const savedShopper = await newShopper.save();
        res.status(201).json(savedShopper);
    } catch (error) {
        res.status(500).json(error);
    }

});


// Registration for Seller
exports.registerSeller = catchAsync(async (req, res, next) => {
    console.log("Request for Register Seller");

    // Verify If Mail Id exists
    const data = await Seller.findOne({ "email": req.body.email });
    data && res.status(500).json("Mail id already Exists");

    const newSeller = new Seller({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        mobilenumber: req.body.mobilenumber,
        age: req.body.age,
        gender: req.body.gender,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
        address: {
            country: req.body.address.country,
            State: req.body.address.State,
            city: req.body.address.city,
            street: req.body.address.street,
            zip: req.body.address.zip,
        },
        paymentinfo: {
            pan: req.body.paymentinfo.pan,
            bankname: req.body.paymentinfo.bankname,
            branchname: req.body.paymentinfo.branchname,
            ifsc: req.body.paymentinfo.ifsc,
            accountnumber: req.body.paymentinfo.accountnumber,
        }
    });

    try {
        const savedSeller = await newSeller.save();
        res.status(201).json(savedSeller);
    } catch (error) {
        res.status(500).json(error);
    }

});


// Shoppers & Sellers Login
exports.login = catchAsync(async (req, res, next) => {
    console.log("Request for login");
    try {

        if (req.body.role === "shopper") {
            const user = await Shopper.findOne({ email: req.body.email });
            !user && res.status(401).json("Wrong Credentials!");

            const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
            const Originalpassword = hashedPassword.toString(CryptoJS.enc.Utf8);

            Originalpassword !== req.body.password &&
                res.status(401).json("Wrong Credentials!");

            const accessToken = jwt.sign({
                id: user._id,
                role: user.role,
            }, process.env.JWT_SECRET_KEY,
                { expiresIn: "3d" }
            );

            const { password, ...others } = user._doc;
            res.status(200).json({ ...others, accessToken });

        } else if (req.body.role == "seller") {
            const user = await Seller.findOne({ email: req.body.email });
            !user && res.status(401).json("Wrong Credentials!");

            const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
            const Originalpassword = hashedPassword.toString(CryptoJS.enc.Utf8);

            Originalpassword !== req.body.password &&
                res.status(401).json("Wrong Credentials!");

            const accessToken = jwt.sign({
                id: user._id,
                role: user.role,
            }, process.env.JWT_SECRET_KEY,
                { expiresIn: "3d" }
            );

            const { password, ...others } = user._doc;
            res.status(200).json({ ...others, accessToken });
        } else {
            res.status(500).json("Please Choose Role");
        }

    } catch (error) {
        res.status(500).json(error)
    }
});


// Shoppers & Seller Logout
exports.logout = async (req, res) => {
    res.json("Request for logout");
}

