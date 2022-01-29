const express = require('express');

var homeRoute = express.Router();

homeRoute.get("/", (req, res) => {
    res.render('index', {
        // Include all value for parameter in pug
        title: 'Custom title',
        message: 'This is HTML Pug'
    })
});

module.exports = homeRoute;