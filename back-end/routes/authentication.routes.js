const auth = require("../controllers/authentication.controller");
const router = require("express").Router();

router.post("/", auth.authenticate);

router.post("/checkJWT", auth.validJWT);

module.exports = router;