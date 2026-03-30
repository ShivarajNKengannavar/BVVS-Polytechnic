const express = require('express');
const router = express.Router();
const data = require('../data/bvvs.data');

router.get('/', (req, res) => res.json(data.about));
router.get('/overview', (req, res) => res.json(data.about.overview));
router.get('/entrepreneurship', (req, res) => res.json(data.about.entrepreneurship));

module.exports = router;
