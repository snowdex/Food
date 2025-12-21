const foodPartnerModel = require('../models/foodPartner.model');
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');

// Middleware to verify Food-Partner JWT token
const verifyfoodPartnerToken = async (req, res, next) => {
    try {
        const token = req.cookies?.token;
        // console.log("TOKEN:", token);

        if (!token) {
            return res.status(401).json({ message: 'No token' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log("DECODED:", decoded);

        const foodPartner = await foodPartnerModel.findById(decoded.FpId);
        // console.log("FOOD PARTNER FROM DB:", foodPartner);

        req.foodPartner = foodPartner;
        next();

    } catch (err) {
        return res.status(401).json({ error: err.message });
    }
};

const authUserMiddleware = async(req, res, next) => {
    
    const token = req.cookies?.token;

    if(!token){
        return res.status(401).json({message: 'Please login to access this resource'});
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findById(decoded.userId);

        req.user = user;
        next();

 
    } catch (error) {
        return res.status(401).json({ error: err.message });
    }




}



module.exports = { verifyfoodPartnerToken, authUserMiddleware };