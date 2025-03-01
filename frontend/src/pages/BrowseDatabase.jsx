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
        } catch (error) {
          console.error('Error fetching questions:', error);
        }
      };

      fetchQuestions();
    }
  }, [selectedSubject, API_URL]);

  return (
    <div className="browse-database">
      <h1>Browse Database</h1>
      <div className="section">
        <h2>Select a Theme</h2>
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
          <h2>Select a Category</h2>
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
          <h2>Select a Subject</h2>
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
          <h2>Select a Question</h2>
          <ul className="list">
            {questions.map((question) => (
              <li key={question.id} className="list-item">
                {question.statement}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BrowseDatabase;