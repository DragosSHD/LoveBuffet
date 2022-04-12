var express = require('express')
var cors = require('cors')  
var app = express()
app.use(cors()) 
app.get('/user/:id', function (req, res, next) {
  res.json({user: 'CORS enabled'})
})
app.listen(5000, function () {
  console.log('CORS-enabled web server listening on port 5000')
})
const bodyParser = require("body-parser");

// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application
app.use(bodyParser.urlencoded({ extended: true }));
// simple route
app.get("/", (req, res) => {
res.json({ message: "Welcome to LoveBuffet, where you will fall in love with our food." });
});

// ----------------------------- Routes -----------------------------
require("./routes/product.routes")(app);
require("./routes/signup.routes")(app);
require("./routes/signin.routes")(app);
require("./routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}.`);
});

const db = require("./models");
db.mongoose
.connect(db.url, {
useNewUrlParser: true,
useUnifiedTopology: true
})
.then(() => {
console.log("Connected to the database!");
})
.catch(err => {
console.log("Cannot connect to the database!", err);
process.exit();
});