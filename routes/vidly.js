const express = require('express');
var Joi = require('joi');

var route = express.Router();

var vidly = [
    {id: 1, name: "Horror", total: 10},
    {id: 2, name: "Sci-Fi", total: 5},
    {id: 3, name: "Comedy", total: 30},
    {id: 4, name: "Fiction", total: 1}
];

/**
 * GET REQUESTS
 */
// Changing its position completly change the response.
route.get("/query", (req, res) => {
    var _vidly = vidly.find((vid) => vid.total <= parseInt(req.query.total));
    if (!_vidly) {
        // Unable to find the data 404.
        res.status(404).send(req.query);
        return;
    }
    res.send(_vidly); 
});


route.get("/:id", (request, response) => {
    var _vidly = vidly.find( vid => vid.id === parseInt(request.params.id));
    if (!_vidly) {
        // Unable to find the data 404.
        response.status(404).send(`Unable to find the vidly ${_vidly} ${request.params.id}`);
        return;
    }
    response.send(_vidly);
});

route.get("/", (req, res) => {
    res.send(vidly);
});

/**
 * POST REQUESTS
 */
route.post("/", (request, response) => {
    // Cheack the user body
    var result = checkData(request);
    
    // If invalid the 400 error
    if (result.error) {
        response.status(400).send(result.error);
        return;
    }

    // Every thing is correct. Add data to list.
    var _vid = {
        id: vidly.length + 1,
        name: request.body.name,
        total: request.body.total
    };

    vidly.push(_vid);
    response.send(_vid);
});

/**
 * PUT REQUESTS
 */
route.put("/:id", (req, res) => {
    // Check that given ID exists.
    var _vidly = vidly.find( vid => vid.id === parseInt(req.params.id));
    if (!_vidly) {
        // Unable to find the data 404.
        res.status(404).send(`Unable to find the vidly ${_vidly} ${req.params.id}`);
        return;
    }

    // Check the given data which has to be updated
    var result = checkData(req);
    if (result.error) {
        res.status(400).send(result.error);
        return;
    }

    // Save the data
    var _vid = {
        id: req.params.id,
        name: req.body.name,
        total: req.body.total
    };

    vidly.push(_vid);
    res.send(_vid);
});

/**
 * DELETE REQUESTS
 */
route.delete("/:id", (req, res) => {
    // Check that id is present.
    var _vidly = vidly.find( vid => vid.id === parseInt(req.params.id));
    if (!_vidly) {
        // Unable to find the data 404.
        res.status(404).send(`Unable to find the vidly ${_vidly} ${req.params.id}`);
        return;
    }

    // Delete the id data.
    vidly.splice(vidly.indexOf(_vidly), 1);
    res.send("Deleted Succesfully");
});

function checkData(request){
    var schema = {
        name: Joi.string().min(5).required(),
        total: Joi.number().min(1).required()
    };
    return Joi.validate(request.body, schema);
}

// exports the route so that other module can use it.
module.exports = route;