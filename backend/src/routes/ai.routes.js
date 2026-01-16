const express = require('express');
const aiControllers = require('../controllers/ai.controllers');

const router = express.Router();

router.post("/game-review", aiControllers.getGameReview)
module.exports = router;