const foodApi = require("../controllers/foodApi.controller");
const router = require("express").Router();

router.get("/", foodApi.getToken);

module.exports = router;