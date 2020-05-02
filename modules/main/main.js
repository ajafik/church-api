var express = require('express');
var router = express.Router();
const config = require("../../config/config");

router.get("/", (req, res) => {
    res.json({ "description": config.get_app_name, "version": config.get_app_version });
});

module.exports = router;