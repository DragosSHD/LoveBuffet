module.exports = app => {
    const user = require("../controllers/user.controller.js");
    const router = require("express").Router();

    router.post("/", user.create);

    router.get("/", (req, res) => {res.send("Route Not Handled!")});

    router.get("/:id", (req, res) => {res.send("Route Not Handled!")});

    router.put("/:id", (req, res) => {res.send("Route Not Handled!")});

    router.delete("/:id", (req, res) => {res.send("Route Not Handled!")});

    router.delete("/", (req, res) => {res.send("Route Not Handled!")});
    app.use("/api/user", router);
};