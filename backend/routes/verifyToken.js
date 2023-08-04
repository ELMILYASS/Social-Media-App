const express = require("express");
const router = express.Router();
const VerifyJwt = require("../middleware/VerifyJwt");
router.get("/", VerifyJwt);

module.exports = router;
