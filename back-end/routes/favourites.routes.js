const favourites = require("../controllers/favourites.controller");
const router = require('express').Router();

router.post("/add", favourites.toggleFavourites);

router.get("/:id", favourites.getForUser);

router.get("/isFavourite/:id", favourites.isFavourite);

router.delete("/", (req, res) => {res.send("Route Not Handled!")});

module.exports = router;