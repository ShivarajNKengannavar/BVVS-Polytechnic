const express = require('express');
const router = express.Router();
const data = require('../data/bvvs.data');

router.get('/',              (req, res) => res.json(data.administration));
router.get('/accreditation', (req, res) => res.json(data.administration.accreditation));
router.get('/eoa',           (req, res) => res.json(data.administration.eoaLetters));
router.get('/finance',       (req, res) => res.json(data.administration.finance));
router.get('/downloads',     (req, res) => res.json(data.administration.downloads || []));

module.exports = router;
