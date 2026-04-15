const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await userModel.create({ name, email, password: hashedPassword });
        res.status(200).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error registering user', error: err.message });
    }
}

const loginUser = async (req, res) => {
    try{
        const {email, password} = req.body;
        
        if(!email || !password){
            return res.status(400).json({message: "All fields are required"})
        }

        const user = await userModel.findOne({email});
        
        if(!user){
            return res.status(400).json({message: "Invalid email or password"});

        }
        const matchedPassword = await bcrypt.compare(password, user?.password);

        if(!matchedPassword){
            return res.status(400).json({message: "Invalid email or password"});
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ 
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                credits: user.credits,
            },
            token,
            message: "User Login Successfully"
         });


    }catch(err){
        res.status(500).json({ message: 'Error logging in user', error: err.message });
    }
}

module.exports = {
    registerUser,
    loginUser
}