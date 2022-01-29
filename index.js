const config = require('config');
const express = require('express');
const home = require('./routes/home');  // returns the Route
const vidly = require('./routes/vidly');  // returns the Route

var app = express();

app.set('view engine', 'pug');
app.set('views', './views');  // default value to place all view template.

app.use(express.json())
app.use('/', home);  // Use the routes to add in Middleware Pipeline.
app.use('/api/vidly', vidly)  // Use the routes to add in Middleware Pipeline.

// Configuration
console.log("appliction name "+ config.get('name'));
console.log("mail "+ config.get('mail.host'));

// Set port.
var port = process.env.PORT || 3030;
app.listen(port, () => {
    console.log(`Listening to port ${port}...`);
});