const User  = require('../models/user')
const {hashPassword, comparePassword} = require('../helpers/auth')

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
            return res.json('Password match')
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    test,
    registerUser,
    loginUser
}