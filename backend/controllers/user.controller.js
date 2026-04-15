const userModel = require('../models/user.model');

const getUserProfile = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.userId).select('-password').lean();
        if (!user) {
            return res.status(404).json({ message: 'Something went wrong' });
        }
        res.status(200).json({
            user: {
                name: user.name,
                email: user.email,
                credits: user.credits,
                plans: user.plan,
            }
        });
        
    } catch (err) {
        res.status(500).json({ message: 'Error fetching user profile', error: err.message });
    }
}

module.exports = {
    getUserProfile,
}