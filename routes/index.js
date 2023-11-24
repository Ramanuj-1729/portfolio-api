const express = require('express');
const { queryController } = require('../controllers');
const router = express.Router();

router.post('/queries', queryController.createQuery);
router.get('/queries', queryController.getAllQuery);

module.exports = router;
