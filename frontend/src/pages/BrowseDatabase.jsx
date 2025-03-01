import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BrowseDatabase.css'; // Import the CSS file

const BrowseDatabase = () => {
  const [themes, setThemes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    // Fetch themes on component mount
    const fetchThemes = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/browsedb/themes`);
        setThemes(response.data);
      } catch (error) {
        console.error('Error fetching themes:', error);
      }
    };

    fetchThemes();
  }, [API_URL]);

  useEffect(() => {
    if (selectedTheme) {
      // Fetch categories when a theme is selected
      const fetchCategories = async () => {
        try {
          const response = await axios.get(`${API_URL}/api/browsedb/themes/${selectedTheme.id}/categories`);
          setCategories(response.data);
          setSelectedCategory(null); // Reset lower selections
          setSelectedSubject(null);
          setSelectedQuestion(null);
        } catch (error) {
          console.error('Error fetching categories:', error);
        }
      };

      fetchCategories();
    }
  }, [selectedTheme, API_URL]);

  useEffect(() => {
    if (selectedCategory) {
      // Fetch subjects when a category is selected
      const fetchSubjects = async () => {
        try {
          const response = await axios.get(`${API_URL}/api/browsedb/categories/${selectedCategory.id}/subjects`);
          setSubjects(response.data);
          setSelectedSubject(null); // Reset lower selections
          setSelectedQuestion(null);
        } catch (error) {
          console.error('Error fetching subjects:', error);
        }
      };

      fetchSubjects();
    }
  }, [selectedCategory, API_URL]);

  useEffect(() => {
    if (selectedSubject) {
      // Fetch questions when a subject is selected
      const fetchQuestions = async () => {
        try {
          const response = await axios.get(`${API_URL}/api/browsedb/subjects/${selectedSubject.id}/questions`);
          setQuestions(response.data);
          setSelectedQuestion(null); // Reset lower selections
        } catch (error) {
          console.error('Error fetching questions:', error);
        }
      };

      fetchQuestions();
    }
  }, [selectedSubject, API_URL]);

  return (
    <div className="browse-database">
      <h1>Parcourir la base de donnée</h1>
      <div className="section">
        <h2>Choix du thème</h2>
        <ul className="list">
          {themes.map((theme) => (
            <li key={theme.id} onClick={() => setSelectedTheme(theme)} className="list-item">
              {theme.name}
            </li>
          ))}
        </ul>
      </div>
      {selectedTheme && (
        <div className="section">
          <h2>Choix de la catégorie</h2>
          <ul className="list">
            {categories.map((category) => (
              <li key={category.id} onClick={() => setSelectedCategory(category)} className="list-item">
                {category.name}
              </li>
            ))}
          </ul>
        </div>
      )}
      {selectedCategory && (
        <div className="section">
          <h2>Choix du sujet</h2>
          <ul className="list">
            {subjects.map((subject) => (
              <li key={subject.id} onClick={() => setSelectedSubject(subject)} className="list-item">
                {subject.name}
              </li>
            ))}
          </ul>
        </div>
      )}
      {selectedSubject && (
        <div className="section">
          <h2>Choix de la question</h2>
          <ul className="list">
            {questions.map((question) => (
              <li key={question.id} onClick={() => setSelectedQuestion(question)} className="list-item">
                {question.statement}
              </li>
            ))}
          </ul>
        </div>
      )}
      {selectedQuestion && (
        <div className="section question-details">
          <h2>Détails de la question</h2>
          <table>
            <tbody>
              <tr>
                <td><strong>Énoncé:</strong></td>
                <td>{selectedQuestion.statement}</td>
              </tr>
              {selectedQuestion.hint && (
                <tr>
                  <td><strong>Indice:</strong></td>
                  <td>{selectedQuestion.hint}</td>
                </tr>
              )}
              {selectedQuestion.question_comment && (
                <tr>
                  <td><strong>Commentaire de la question:</strong></td>
                  <td>{selectedQuestion.question_comment}</td>
                </tr>
              )}
              {selectedQuestion.level && (
                <tr>
                  <td><strong>Niveau:</strong></td>
                  <td>{selectedQuestion.level}</td>
                </tr>
              )}
              <tr>
                <td><strong>Réponse:</strong></td>
                <td>{selectedQuestion.answer}</td>
              </tr>
              {selectedQuestion.explanation && (
              <tr>
                <td><strong>Explication:</strong></td>
                <td>{selectedQuestion.explanation}</td>
              </tr>
              )}
              {selectedQuestion.answer_comment && (
              <tr>
                <td><strong>Commentaire de réponse:</strong></td>
                <td>{selectedQuestion.answer_comment}</td>
              </tr>
              )}
              {selectedQuestion.answer_source && (
              <tr>
                <td><strong>Source de la réponse:</strong></td>
                <td><a href={selectedQuestion.answer_source} target="_blank" rel="noopener noreferrer">{selectedQuestion.answer_source}</a></td>
              </tr>
              )}
              {selectedQuestion.origin_source && (
              <tr>
                <td><strong>Source de la question:</strong></td>
                <td><a href={selectedQuestion.origin_source} target="_blank" rel="noopener noreferrer">{selectedQuestion.origin_source}</a></td>
              </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BrowseDatabase;