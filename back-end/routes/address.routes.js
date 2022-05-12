module.exports = app => {
    const address = require("../controllers/address.controller.js");
    const router = require("express").Router();

    router.post("/", address.create);

    router.get("/", address.getAll);

    router.get("/:id", address.getOne);

    router.put("/:id", address.update);

    router.delete("/:id", address.delete);

    router.delete("/", (req, res) => {res.send("Route Not Handled!")});
    app.use("/api/address", router);

};