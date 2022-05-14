module.exports = app => {
    const recipe = require('../controllers/recipe.controller');
    const router = require('express').Router();

    router.post("/", recipe.create);

    router.get("/", recipe.getAll);

    router.get("/:id", recipe.getOne);

    router.put("/", (req, res) => {res.send("Route Not Handled!")});

    router.delete("/", (req, res) => {res.send("Route Not Handled!")});


    app.use("/api/recipes", router);
}