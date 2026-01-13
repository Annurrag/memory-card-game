const express = require('express');
const aiControllers = require('../controllers/ai.controllers');
const router = express.Router();

router.get("/get-response", aiControllers.getResponse)
module.exports = router;