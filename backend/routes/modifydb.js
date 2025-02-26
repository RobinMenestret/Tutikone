const express = require('express');
const router = express.Router();
const db = require('../db');

// Route to add a new theme
router.post('/themes', async (req, res) => {
  const { name, description } = req.body;

  try {
    const result = await db.query(
      'INSERT INTO themes (name, description) VALUES ($1, $2) RETURNING id',
      [name, description]
    );
    res.status(201).json({ id: result.rows[0].id });
  } catch (error) {
    console.error('Error inserting theme:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to add a new category
router.post('/categories', async (req, res) => {
  const { name, description, theme_id } = req.body;

  try {
    const result = await db.query(
      'INSERT INTO categories (name, description, theme_id) VALUES ($1, $2, $3) RETURNING id',
      [name, description, theme_id]
    );
    res.status(201).json({ id: result.rows[0].id });
  } catch (error) {
    console.error('Error inserting category:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to add a new question
router.post('/questions', async (req, res) => {
  const { subject_id, level, statement, hint, question_comment, answer, explanation, answer_comment, answer_source, origin_source, author_id } = req.body;

  try {
    const result = await db.query(
      'INSERT INTO questions (subject_id, level, statement, hint, question_comment, answer, explanation, answer_comment, answer_source, origin_source, author_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id',
      [subject_id, level, statement, hint, question_comment, answer, explanation, answer_comment, answer_source, origin_source, author_id]
    );
    res.status(201).json({ id: result.rows[0].id });
  } catch (error) {
    console.error('Error inserting question:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;