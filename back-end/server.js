const express = require('express')
const app = express()
const bodyParser = require("body-parser");

// parse requests of content-type - application/json
app.use(bodyParser.json());
// simple route
app.get("/", (req, res) => {
res.json({ message: "Welcome to LoveBuffet, where you will fall in love with our food." });
});

// ----------------------------- Routes -----------------------------
// require("./routes/product.routes")(app);
// require("./routes/signup.routes")(app);
// require("./routes/signin.routes")(app);
// require("./routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}.`);
});

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
















