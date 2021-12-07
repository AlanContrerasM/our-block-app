const router = require('express').Router();
//Bring in the user registration function
const {userRegister, userLogin, userAuth, serializeUser, checkRole} = require('../utils/Auth');



//users Registration route
router.post('/register-user', async(req, res) => {
    await userRegister(req.body, 'user', res);
})
//body containing username, name, email, password

//Admin registration
router.post('/register-admin', async(req, res) => {
    await userRegister(req.body, 'admin', res);
})

//SuperAdmin registration 
router.post('/register-superadmin', async(req, res) => {
    await userRegister(req.body, 'superadmin', res);
})


//users login route, user user, email and password
router.post('/login', async(req, res) => {
    await userLogin(req.body, res);
})

//not really necessary
//body containing username and password. could change for email if wanted.
// //Admin login route admin admin
// router.post('/login-admin', async(req, res) => {
//     await userLogin(req.body, 'admin', res);
// })
// //SuperAdmin login route superadmin superadmin
// router.post('/login-superadmin', async(req, res) => {
//     await userLogin(req.body, 'superadmin', res);
// })


//profile route
//user has to send in headers, Authorization as a key, and the token as value
router.get('/profile', userAuth, async(req, res) => {
    return res.json(serializeUser(req.user));
});

//users protected route
router.get('/user-profile', userAuth, checkRole(['user']), async(req, res) => {
    return res.json(serializeUser(req.user));
});
//Admin protected route
router.get('/admin-profile', userAuth, checkRole(['admin']),  async(req, res) => {
    return res.json(serializeUser(req.user));
});
//SuperAdmin protected route
router.get('/superadmin-profile', userAuth, checkRole(['superadmin']), async(req, res) => {
    return res.json(serializeUser(req.user));
});

//SuperAdmin protected route
router.get('/superadmin-admin-profile', userAuth, checkRole(['superadmin', 'admin']), async(req, res) => {
    return res.json(serializeUser(req.user));
});

router.get('/logout', async(req,res)=>{
    res.clearCookie('refreshToken');
    res.json({
        message: "Logged out",
        success: true
    })
});


module.exports = router;