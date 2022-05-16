const favourites = require("../controllers/favourites.controller");
module.exports = app => {
    const favourites = require("../controllers/favourites.controller");
    const router = require('express').Router();

    router.post("/add", favourites.toggleFavourites);

    router.get("/:id", favourites.getForUser);

    router.put("/", (req, res) => {res.send("Route Not Handled!")});

    router.delete("/", (req, res) => {res.send("Route Not Handled!")});


    app.use("/api/favourites", router);
}