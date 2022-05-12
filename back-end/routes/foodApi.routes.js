module.exports = app => {
    const foodApi = require("../controllers/foodApi.controller");
    const router = require("express").Router();

    router.get("/", foodApi.getToken);

    app.use("/api/foodApi", router);
};