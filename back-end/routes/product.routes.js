const product = require("../controllers/product.controller.js");
const router = require("express").Router();

router.post("/", (req, res) => {res.send("Route Not Handled!")});

router.get("/", (req, res) => {res.send("Route Not Handled!")});

router.get("/:id", (req, res) => {res.send("Route Not Handled!")});

router.put("/:id", (req, res) => {res.send("Route Not Handled!")});

router.delete("/:id", (req, res) => {res.send("Route Not Handled!")});

router.delete("/", (req, res) => {res.send("Route Not Handled!")});

module.exports = router;