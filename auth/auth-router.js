const express= require('express');
const auth= require('../middleware/authN.js');
const db= require('../users/user-model.js');
const bcrypt= require('bcryptjs');
const jwt= require('jsonwebtoken');

const router= express.Router();

router.post('/register', async (req, res, next) => {
    try {
        const username= req.body.username;
        const user= await db.findBy({username}).first();

        if(user){
            return res.status(409).json({
                message: 'Username is already taken'
            });
        };

        const newUser= await db.add(req.body);

        res.status(201).json(newUser);

    } catch (err) {
        console.log('Error registering:', err);
        next(err);
    };
});

router.post('/log_in', async (req, res, next) => {
    const authErr= {
        login_errormessage: 'You shall not pass'
    };

    try {
        const {username}= req.body;
        const user= await db.findBy({username}).first();

        if(!user){
            return res.status(401).json(authErr);
        };

        const validPswrd= await bcrypt.compare(req.body.password, user.password);

        if(!validPswrd){
            return res.status(401).json(authErr);
        };

        const payload= {
            userId: user.id,
        };

        // this sends the token back as a cookie instead of in the request body,
        // so the client will automatically save it in its cookie jar.
        
        res.cookie('token', jwt.sign(payload, process.env.SECRET));

        res.json({
            message: `Welcome ${user.username}!`
        });
        
    } catch (err) {
        console.log('Error logging in:', err);
        next(err);
    };
});

// router.get('/log_out', async (req, res, next) => {
//     try {
        
//     } catch (err) {
//         console.log('Error logging out:', err);
//         next(err);
//     };
// });

module.exports= router;