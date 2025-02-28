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
// Route to get subject by category ID
router.get('/categories/:categoryId/subjects', async (req, res) => {
    const { categoryId } = req.params;
    try {
        const result = await db.query('SELECT * FROM subjects WHERE category_id = $1', [categoryId]);
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching questions:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to get questions by category ID
router.get('/categories/:categoryId/questions', async (req, res) => {
    const { categoryId } = req.params;
    try {
        const result = await db.query('SELECT * FROM questions WHERE category_id = $1', [categoryId]);
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching questions:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;