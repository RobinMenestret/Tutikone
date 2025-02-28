import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BrowseDatabase = () => {
  const [themes, setThemes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
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
      // Fetch questions when a category is selected
      const fetchQuestions = async () => {
        try {
          const response = await axios.get(`${API_URL}/api/browsedb/categories/${selectedCategory.id}/questions`);
          setQuestions(response.data);
        } catch (error) {
          console.error('Error fetching questions:', error);
        }
      };

      fetchQuestions();
    }
  }, [selectedCategory, API_URL]);

  return (
    <div>
      <h1>Browse Database</h1>
      <div>
        <h2>Select a Theme</h2>
        <ul>
          {themes.map((theme) => (
            <li key={theme.id}  onClick={() => setSelectedTheme(theme)} style={{ cursor: 'pointer' }}>
              {theme.name}
            </li>
          ))}
        </ul>
      </div>
      {selectedTheme && (
        <div>
          <h2>Select a Category</h2>
          <ul>
            {categories.map((category) => (
              <li key={category.id} onClick={() => setSelectedCategory(category)} style={{ cursor: 'pointer' }}>
                {category.name}
              </li>
            ))}
          </ul>
        </div>
      )}
      {selectedCategory && (
        <div>
          <h2>Select a Question</h2>
          <ul>
            {questions.map((question) => (
              <li key={question.id} style={{ cursor: 'pointer' }}>
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