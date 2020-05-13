const express= require('express');
const helmet= require('helmet');
const auth_route= require('../auth/auth-router.js');
const user_route= require('../users/user-router.js');
const cookieParser = require("cookie-parser");

const server= express();

server.use(express.json());
server.use(helmet());
server.use(cookieParser());

// route handlers
server.get('/', async (req, res, next) => {
    try {
        await res.send(`<h4 align='center'>Welcome to my server! :)</h4>`);
    } catch (err) {
        next(err);
    };
});

server.use('/api/auth', auth_route);
server.use('/api/users', user_route);

// handles no supporting route
server.use((req, res) => {
    res.status(404).send(
        `<h4 align='center'>The url ${req.url.toUpperCase()} was not found.</h4>`
    );
});

// handles errors
server.use((err, req, res, next) => {
    console.log('Server error:', err);
	res.status(500).json({
		message: "Oops, something went wrong. Please try again later.",
	});
});

module.exports= server;