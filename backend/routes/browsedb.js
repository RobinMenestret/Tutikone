const express = require('express');
const router = express.Router();
const db = require('../db');

// Route to get all themes
router.get('/themes', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM themes');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching themes:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// Route to get all categories
router.get('/categories', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM categories');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to get categories by theme ID
router.get('/themes/:themeId/categories', async (req, res) => {
    const { themeId } = req.params;
    try {
        const result = await db.query('SELECT * FROM categories WHERE theme_id = $1', [themeId]);
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to get all subjects
router.get('/subjects', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM subjects');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching subjects:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// Route to get all subjects associated with a specific category
router.get('/categories/:categoryId/subjects', async (req, res) => {
    const { categoryId } = req.params;
  
    try {
      const result = await db.query(
        `SELECT s.id, s.name, s.description, s.user_id
         FROM subjects s
         JOIN subject_categories sc ON s.id = sc.subject_id
         WHERE sc.category_id = $1`,
        [categoryId]
      );
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error fetching subjects for category:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

// Route to get questions by category ID
router.get('/subjects/:subjectId/questions', async (req, res) => {
    const { subjectId } = req.params;
    try {
        const result = await db.query('SELECT * FROM questions WHERE subject_id = $1', [subjectId]);
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching questions:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;