const express = require('express');
const router = express.Router();
const db = require('../db');

// Route to add a new theme
router.post('/themes', async (req, res) => {
  const { name, description } = req.body;

  try {
    // Vérifier si un thème avec le même nom existe déjà (insensible à la casse)
    const existingTheme = await db.query('SELECT * FROM themes WHERE LOWER(name) = LOWER($1)', [name]);
    if (existingTheme.rows.length > 0) {
      return res.status(400).json({ error: 'Theme with the same name already exists' });
    }

    // Insérer le nouveau thème
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

// Route to add a new subject
router.post('/subjects', async (req, res) => {
  const { name, description, user_id, category_ids } = req.body;
  try {
    // Insérer le nouveau sujet
    const result = await db.query(
      'INSERT INTO subjects (name, description, user_id) VALUES ($1, $2, $3) RETURNING id',
      [name, description, user_id]
    );
    const subjectId = result.rows[0].id;
    console.log("subject added successfully");

    // Associer les catégories au sujet
    if (category_ids && category_ids.length > 0) {
      const insertPromises = category_ids.map(category_id => {
        return db.query(
          'INSERT INTO subject_categories (subject_id, category_id) VALUES ($1, $2)',
          [subjectId, category_id]
        );
      });
      await Promise.all(insertPromises);
    }

    res.status(201).json({ id: subjectId });
  } catch (error) {
    console.error('Error adding subject:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to add a new question
router.post('/questions', async (req, res) => {
  const { subject_id, level, statement, hint, question_comment, answer, explanation, answer_comment, answer_source, origin_source } = req.body;

  try {
    console.log("request : ", req.body);
    const result = await db.query(
      'INSERT INTO questions (subject_id, level, statement, hint, question_comment, answer, explanation, answer_comment, answer_source, origin_source) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id',
      [subject_id, level, statement, hint, question_comment, answer, explanation, answer_comment, answer_source, origin_source]
    );
    res.status(201).json({ id: result.rows[0].id });
  } catch (error) {
    console.error('Error inserting question:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;