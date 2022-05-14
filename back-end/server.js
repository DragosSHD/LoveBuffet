const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const cors = require('cors');

// parse requests of content-type - application/json
app.use(bodyParser.json());
app.use(cors())
// simple route
app.get("/", (req, res) => {
res.json({ message: "Welcome to LoveBuffet, where you will fall in love with our food." });
});

// ----------------------------- Routes -----------------------------
require("./routes/product.routes")(app);
require("./routes/user.routes")(app);
require("./routes/address.routes")(app);
require("./routes/authentication.routes")(app);
require("./routes/foodApi.routes")(app);
require("./routes/recipe.routes")(app);
require("./routes/history.routes")(app);


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}.`);
});

