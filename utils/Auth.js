const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const {SECRET} =require('../config');

//3.add passport
const passport = require('passport');

// @DESC To register the user
const userRegister = async (userDets, role, res) => {
    try {
      // Validate the username
      let usernameTaken = await validateUsername(userDets.username);
      if (usernameTaken) {
        return res.status(400).json({
          message: `Username is already taken.`,
          success: false
        });
      }
  
      // validate the email
      let emailTaken = await validateEmail(userDets.email);
      if (emailTaken) {
        return res.status(400).json({
          message: `Email is already registered.`,
          success: false
        });
      }
  
      // Get the hashed password
      const password = await bcrypt.hash(userDets.password, 12);
      // create a new user
      const newUser = new User({
        ...userDets,
        password,
        role
      });
  
      await newUser.save();
      return res.status(201).json({
        message: "User was registered",
        success: true
      });
    } catch (err) {
      
      return res.status(500).json({
        message: "Unable to create your account.",
        success: false
      });
    }
};


const userLogin = async (userCreds, res) =>{
    let {email, password} = userCreds;
    //First check if username is in the database
    const user = await User.findOne({email});
    if(!user){
        return res.status(404).json({
            message: `email is not found, invalid login credentials.`,
            success: false
          });
    }

    //not necessary we could be using authRoles if they wanna access cool parts
    // if(user.role !== role){
    //     return res.status(403).json({
    //         message: `Please make sure you are logging in from correct portal`,
    //         success: false
    //       });
    // }

    //user is valid and is logging through correct portal
    //now passw

    let isMatch = await bcrypt.compare(password, user.password);
    if(isMatch){
        //sign in the token and issue the token to user.
        let token = jwt.sign(
            {
                user_id: user._id,
                role: user.role, 
                username: user.username,
                email: user.email
            }, 
            SECRET, 
            {expiresIn: "7d"} //can be "7 days", "7d", "24h", or just numebr for seconds
        );

        let result = {
            username: user.username,
            name: user.name,
            role: user.role, 
            events: user.events,
            email: user.email,
            // token: `Bearer ${token}`, 
            expiresIn: 168

        }

        res.cookie("refreshToken", token, {
            // secure: true,
            httpOnly: true,
            sameSite: "Strict",
        });

        return res.status(200).json({
            ...result,
            message: "User is now logged in",
            success: true
          });

    }else{
        return res.status(403).json({
            message: `Incorrect password`,
            success: false
          });
    }


}

const validateUsername = async username =>{
    let user = await User.findOne({username});
    return user ? true : false;
}

const validateEmail = async email =>{
    let user = await User.findOne({email});
    return user ? true : false;
}
//@DESC check role middleware
const checkRole = roles  => (req,res,next)=> roles.includes(req.user.role) 
    ? next() 
    : res.status(401).json({ message: "Invalid permissions", success: false });


//3. and add it to the exports
//@DESC Passport middleware
const userAuth = (req,res,next) => passport.authenticate('jwt', {session:false}, function(err, user, info) {
    if (err || !user ) { 
        res.clearCookie('refreshToken');
        res.status(401).send({
            message: "authentication failed, please sign in again for new token",
            success: false
        });
    }else{
        req.user = user;
        return next();
    }
  })(req, res, next);

//this is to protect password, for when we send response back to user after authenticating.
const serializeUser = user => {
    return {
        username: user.username,
        email: user.email,
        _id: user._id,
        name: user.name,
        events: user.events,
        updatedAt: user.updatedAt,
        createdAt: user.createdAt
    }
}

module.exports = {
    userRegister,
    userLogin,
    userAuth,
    serializeUser,
    checkRole
}