import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddCategory = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [themeId, setThemeId] = useState('');
    const [themes, setThemes] = useState([]);
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
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(API_URL + '/api/modifydb/categories', { name, description, theme_id: themeId });
            console.log('Category created:', response.data);
        } catch (error) {
            console.error('Error creating category:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
                <label>Description:</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
            </div>
            <div>
                <label>Theme:</label>
                <select value={themeId} onChange={(e) => setThemeId(e.target.value)} required>
                    <option value="">Select a theme</option>
                    {themes.map(theme => (
                        <option key={theme.id} value={theme.id}>{theme.name}</option>
                    ))}
                </select>
            </div>
            <button type="submit">Create Category</button>
        </form>
    );
};

export default AddCategory;