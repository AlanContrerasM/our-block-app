const User = require('../models/User');
const {SECRET} = require('../config');
//bring strategy
const { Strategy, ExtractJwt} = require('passport-jwt');

// const opts = {
//     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    
//     secretOrKey: SECRET
// }
var cookieExtractor = function(req) {
    var token = null;
    if (req && req.cookies) token = req.cookies['refreshToken'];
    // console.log(token);
    return token;
  };

module.exports = (passport) => {
    var opts = {};
    opts.jwtFromRequest = cookieExtractor; // check token in cookie
    opts.secretOrKey = SECRET;
    passport.use(new Strategy(opts, async(payload, done) =>{
        //we get this from the token
        await User.findById(payload.user_id).then(async user =>{
            if(user){
                return done(null, user);
            }
            return done(null, false)
        }).catch((err)=>{
            return done(null, false);
        })
    }))
}