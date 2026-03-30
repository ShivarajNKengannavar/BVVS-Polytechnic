const express = require('express');
const router = express.Router();
const data = require('../data/bvvs.data');
router.get('/', (req, res) => res.json(data.placement));
router.get('/companies', (req, res) => res.json(data.placement.companies));
module.exports = router;
