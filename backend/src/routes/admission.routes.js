const express = require('express');
const router = express.Router();
const data = require('../data/bvvs.data');
router.get('/', (req, res) => res.json(data.admission));
module.exports = router;
