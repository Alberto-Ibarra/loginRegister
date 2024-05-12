const User  = require('../models/user')

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
        //create a user
        const user = await User.create({name, email, password})

        return res.json(user)
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    test,
    registerUser
}