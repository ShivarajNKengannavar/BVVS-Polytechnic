const express = require('express');
const router = express.Router();
const data = require('../data/bvvs.data');
const pool = require('../data/db');

router.get('/stats',    (req, res) => res.json(data.stats));
router.get('/notices', async (req, res) => {
	try {
		const result = await pool.query(
			'SELECT text, url FROM home_notices ORDER BY created_at DESC, id DESC'
		);
		return res.json(result.rows);
	} catch (err) {
		console.warn('Home notices DB fallback:', err.message);
		return res.json(data.notices);
	}
});
router.get('/achievements', (req, res) => res.json({ list: data.achievements, highlights: data.achievementHighlights }));
router.get('/skill-programmes', (req, res) => res.json(data.skillProgrammes));

module.exports = router;
