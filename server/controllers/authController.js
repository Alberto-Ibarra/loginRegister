const User  = require('../models/user')
const {hashPassword, comparePassword} = require('../helpers/auth')

const test = (req, res) => {
    res.json("test is working")
}

const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body
        //check if name was entered
        if(!name){
            return res.json({
                error: 'Name is required'
            })
        }
        //check password
        if(!password || password.length < 6 ){
            return res.json({
                error: 'Password has to be at least 6 characters long'
            })
        }
        //check email
        const exist = await User.findOne({email})
        if(exist){
            return res.json({
                error: 'Email is used already'
            })
        }

        //hashing password
        const hashedPassword = await hashPassword(password)

        //create a user
        const user = await User.create({name, email, password: hashedPassword})

        return res.json(user)
    } catch (error) {
        console.log(error);
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: 'Email not found. Sign up today!' });
        }

        // Check if the provided password matches the stored hashed password
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Incorrect Password' });
        }

        // If email and password are correct, login is successful
        res.json({ success: 'Login successful' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    test,
    registerUser,
    loginUser
}