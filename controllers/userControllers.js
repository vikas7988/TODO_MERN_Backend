import User from "../database/model/userModel.js"


export async function getUserProfile(req, res) {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve user profile' });
    }
}
