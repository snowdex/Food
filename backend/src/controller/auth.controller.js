const userModel = require('../models/user.model');
const foodPartnerModel = require('../models/foodPartner.model');    
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//User Section
// User Registration
const register = async (req,  res)=>{
    try{
        const { username, password, email } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const existingUser = await userModel.findOne({ $or: [ { username }, { email } ] });
        if(existingUser){
            return res.status(400).json({ message: 'Username or Email already exists' });
        }
        const newUser = new userModel({
            username,
            password: hashedPassword,
            email
        });
        
        await newUser.save();
        
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
        
        res.cookie("token", token)
        res.status(201).json({ message: 'User registered successfully', userId: newUser._id, email: newUser.email, username: newUser.username});
        
    }catch(error){
        res.status(500).json({ message: 'Server Error', error: error.message });
    }

}
//User login
const ulogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const checkUser = await userModel.findOne({ username });
        if (!checkUser) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }
        const isPasswordValid = await bcrypt.compare(password, checkUser.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }
        const token = jwt.sign({ userId: checkUser._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
        res.cookie("token", token)
        res.status(200).json({ message: 'Login successful',  userId: checkUser._id, email: checkUser.email, username: checkUser.username });

    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
}

const logout = (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: 'Logout successful' });

}


//FoodPartner section
//FoodPartner register
const FPregister = async (req,  res)=>{
    try{
        const { name, password, email } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const existingPartner = await foodPartnerModel.findOne({ $or: [{ email } ] });
        if(existingPartner){
            return res.status(400).json({ message: 'Email already exists' });
        }
        const newPartner = new foodPartnerModel({
            name,
            email,
            password: hashedPassword
        });
        
        await newPartner.save();
        
        const token = jwt.sign({ FPId: newPartner._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
        
        res.cookie("token", token)
        res.status(201).json({ message: 'Food Partner registered successfully', FPId: newPartner._id, email: newPartner.email, name: newPartner.name});
        
    }catch(error){
        res.status(500).json({ message: 'Server Error', error: error.message });
    }

}
//FP login
const FPlogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const checkFP = await foodPartnerModel.findOne({ email });
        if (!checkFP) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const isPasswordValid = await bcrypt.compare(password, checkFP.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const token = jwt.sign({ FpId: checkFP._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
        res.cookie("token", token)
        res.status(200).json({ message: 'Food-Partner Login successful',  FPId: checkFP._id, email: checkFP.email, username: checkFP.username });

    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
}



module.exports = {
    register,
    ulogin,
    logout,
    FPregister,
    FPlogin
}