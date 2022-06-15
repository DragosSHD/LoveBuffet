const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const cors = require('cors');
const serveStatic = require('serve-static');
const path = require('path');

// parse requests of content-type - application/json
app.use(bodyParser.json());
app.use(cors());
// Serve the Vue app
// app.use(serveStatic(__dirname + "/dist"));
// app.route('/*')
//     .get(function(req, res) {
//         res.sendFile(path.join(__dirname + '/dist/index.html'));
//     });

// ----------------------------- Routes -----------------------------
require("./routes/product.routes")(app);
require("./routes/user.routes")(app);
require("./routes/address.routes")(app);
require("./routes/authentication.routes")(app);
require("./routes/foodApi.routes")(app);
require("./routes/recipe.routes")(app);
require("./routes/history.routes")(app);
require("./routes/favourites.routes")(app);



// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}.`);
});

