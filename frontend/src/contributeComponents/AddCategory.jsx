import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddCategory = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [themeId, setThemeId] = useState('');
    const [themes, setThemes] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const API_URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        // Fetch themes from the backend
        axios.get(API_URL + '/api/browsedb/themes')
            .then(response => {
                if (Array.isArray(response.data)) {
                    setThemes(response.data);
                } else {
                    console.error('Unexpected response format:', response.data);
                }
            })
            .catch(error => console.error('Error fetching themes:', error));
    }, [API_URL]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // Clear any previous error message
        try {
            const response = await axios.post(API_URL + '/api/modifydb/categories', { name, description, theme_id: themeId });
            console.log('Category created:', response.data);
            alert('Category added successfully!');
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setErrorMessage('Une catégorie avec le même nom existe déjà.');
            } else {
                setErrorMessage('Erreur lors de la création de la catégorie.');
            }
            console.error('Error creating category:', error);

            // Clear the error message after 2 seconds
            setTimeout(() => {
                setErrorMessage('');
            }, 2000);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-input">
                <label>Nom de la catégorie</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="form-input">
                <label>Description</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
            </div>
            <div className="form-input">
                <label>Thème associé</label>
                <select value={themeId} onChange={(e) => setThemeId(e.target.value)} required>
                    <option value="">Choisir un thème</option>
                    {themes.map(theme => (
                        <option key={theme.id} value={theme.id}>{theme.name}</option>
                    ))}
                </select>
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button type="submit">Créer la catégorie</button>
        </form>
    );
};

export default AddCategory;