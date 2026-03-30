const express = require('express');
const router = express.Router();
const data = require('../data/bvvs.data');
const pool = require('../data/db');

async function fetchCirculars() {
	const result = await pool.query(`
		SELECT
			icon,
			title,
			description,
			url AS "docUrl",
			label,
			TO_CHAR(published_date, 'YYYY-MM-DD') AS "publishedDate"
		FROM exam_circulars
		ORDER BY COALESCE(published_date, created_at::date) DESC, id DESC
	`);
	return result.rows;
}

router.get('/', async (req, res) => {
	try {
		const circulars = await fetchCirculars();
		return res.json({ ...data.examinations, circulars });
	} catch (err) {
		console.warn('Examinations DB fallback:', err.message);
		return res.json(data.examinations);
	}
});
router.get('/results', (req, res) => res.json(data.examinations.results));
router.get('/circulars', async (req, res) => {
	try {
		const circulars = await fetchCirculars();
		return res.json(circulars);
	} catch (err) {
		console.warn('Exam circulars DB fallback:', err.message);
		return res.json(data.examinations.circulars);
	}
});
router.get('/rules', (req, res) => res.json(data.examinations.rules));
module.exports = router;
