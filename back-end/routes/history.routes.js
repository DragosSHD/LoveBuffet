module.exports = app => {
    const history = require('../controllers/history.controller');
    const router = require('express').Router();

    router.post("/add", history.addOne);

    router.get("/:id", history.getForUser);

    router.put("/", (req, res) => {res.send("Route Not Handled!")});

    router.delete("/", (req, res) => {res.send("Route Not Handled!")});


    app.use("/api/history", router);
}