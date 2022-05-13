module.exports = app => {
    const router = require('express').Router();

    router.post("/", (req, res) => {res.send("Route Not Handled!")});


    app.use("/api/recipes", router);
}