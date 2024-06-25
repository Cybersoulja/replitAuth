const express = require('express'); // Import Express.js
const app = express();
app.use(express.static('public')); // Serve static files from the 'public' directory

// Root route
app.get('/', function (req, res) {
    if (req.header('X-Replit-User-Id')) { // Check if the user is logged in
        res.redirect(`/home/?user=${req.header('X-Replit-User-Name')}`); // Redirect to home page with user name as query parameter
    } else {
        res.sendFile(__dirname + '/public/login.html'); // Send login page if user is not logged in
    }
});

// Home route
app.get('/home', function (req, res) {
    if (!req.query.user) { // Ensure user parameter is present
        res.redirect('/'); // Redirect to login if user parameter is missing
    } else {
        res.send(`<h1>Hello, ${req.query.user}</h1>`); // Send a personalized greeting to the user
    }
});

// Start the server on port 8080
app.listen(8080, function () {
    console.log('Server up!');
});