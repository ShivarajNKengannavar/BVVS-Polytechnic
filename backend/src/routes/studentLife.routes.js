const express = require('express');
const router = express.Router();
const data = require('../data/bvvs.data');
router.get('/', (req, res) => res.json(data.studentLife));
router.get('/resources', (req, res) => res.json(data.studentLife.resources));
router.get('/committees', (req, res) => res.json(data.studentLife.committees));
router.get('/scholarships', (req, res) => res.json(data.studentLife.resources || []));
module.exports = router;
