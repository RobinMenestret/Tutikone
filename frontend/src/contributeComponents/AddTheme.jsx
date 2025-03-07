import React, { useState } from 'react';
import axios from 'axios';

const AddTheme = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const API_URL = process.env.REACT_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const theme = { name, description };
    const token = localStorage.getItem('token'); // Retrieve the token from local storage

    if (token != null) {
      try {
        const response = await axios.post(API_URL + '/api/modifydb/themes', 
          theme, // Send the theme data
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}` // Use the authentication token
            }
          }
        );

        console.log('Theme added:', response.data);
        alert('Theme added successfully!');
        setName('');
        setDescription('');
      } catch (error) {
        if (error.response && error.response.status === 400 && error.response.data.error === 'Theme with the same name already exists') {
          setErrorMessage('A theme with the same name already exists.');
        } else {
          console.error('Error adding theme:', error.response ? error.response.data : error.message);
          setErrorMessage('Failed to add theme.');
        }

        // Clear the error message after 2 seconds
        setTimeout(() => {
          setErrorMessage('');
        }, 2000);
      }
    } else {
      alert('You must be logged in to add a theme.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Nom du thème :</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <button type="submit">Créer le theme</button>
    </form>
  );
};

export default AddTheme;