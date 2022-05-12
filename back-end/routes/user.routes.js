module.exports = app => {
    const user = require("../controllers/user.controller.js");
    const router = require("express").Router();

    router.post("/", user.create);

    router.get("/", user.getUsers);

    router.get("/:id", user.getOne);

    router.put("/:id", user.update);

    router.delete("/:id", user.delete);

    router.delete("/", (req, res) => {res.send("Route Not Handled!")});
    app.use("/api/users", router);
};