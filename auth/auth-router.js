const express= require('express');
const auth= require('../middleware/authN.js');
const db= require('../users/user-model.js');

const router= express.Router();

router.post('/register', async (req, res, next) => {
    try {
        
    } catch (err) {
        console.log('Error registering:', err);
        next(err);
    };
});

router.post('/log_in', async (req, res, next) => {
    try {
        
    } catch (err) {
        console.log('Error logging in:', err);
        next(err);
    };
});

router.get('/log_out', async (req, res, next) => {
    try {
        
    } catch (err) {
        console.log('Error logging out:', err);
        next(err);
    };
});

module.exports= router;