module.exports = app => {
    const auth = require("../controllers/authentication.controller");
    const router = require("express").Router();

    router.post("/", auth.authenticate);

    router.get("/checkJWT", auth.validJWT);

    app.use("/api/auth", router);
};