const User  = require('../models/user')
const {hashPassword, comparePassword} = require('../helpers/auth')
const jwt = require('jsonwebtoken')

const test = (req, res) => {
    res.json("test is working")
}
////////////Register User/////////////
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


////////////Login User/////////////
const loginUser = async (req, res) => {
    console.log('login triggered');
    try {
        const {email, password} = req.body
        //check is user exist
        const user = await User.findOne({email})
        if(!user){
            return res.json({
                error: "user not found"
            })
        }
        //check if password match
        const match = await comparePassword(password, user.password)
        if(match){
            jwt.sign({email: user.email, id: user._id, name: user.name}, process.env.JWT_SECRET, {}, (err, token) => {
                if (err) {
                    console.error('Error signing JWT token:', err);
                    return res.status(500).json({ error: 'Internal server error' });
                }
                //res.cookie('token', token).json(user)
                //res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict' }).json({ user, token });
                res.cookie('token', token, {
                    httpOnly: true, // Cookie is accessible only via HTTP(S)
                    secure: true,   // Cookie is sent only over HTTPS
                    sameSite: 'lax', // Apply same-site policy (optional)
                    maxAge: 3600000, // Cookie expiration time in milliseconds (optional)
                    path: '/',       // Path for which the cookie is valid (optional)
                    domain: 'yourdomain.com' // Domain for which the cookie is valid (optional)
                });
            })
            return res.json('Password match')
        }
        if(!match) return res.json({
            error: "password does not match"
        })
    } catch (error) {
        console.log(error);
    }
}

const getProfile = (req, res) => {
    const {token} = req.cookies
    console.log(token);
    if(token){
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if(err) throw err
            res.json(user)
        })
    }else{
        res.json(null)
    }
}

module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile
}