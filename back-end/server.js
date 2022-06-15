const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const cors = require('cors');

app.use(express.static( __dirname + '/dist'));
// parse requests of content-type - application/json
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api', require('./routes/router'));
// Serve the Vue app
app.get('*', (req, res) =>
    res.sendFile(__dirname + '/dist/index.html'));

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}.`);
});

