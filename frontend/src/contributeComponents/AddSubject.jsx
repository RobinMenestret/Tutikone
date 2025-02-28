import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddSubject = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [categoryIds, setCategoryIds] = useState([]);
    const [categories, setCategories] = useState([]);
    const API_URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        // Fetch categories from the backend
        axios.get(API_URL + '/api/browsedb/categories')
            .then(response => {
                if (Array.isArray(response.data)) {
                    setCategories(response.data);
                } else {
                    console.error('Unexpected response format:', response.data);
                }
            })
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        console.log('Token:', token);
        try {
            const user_id = await axios.get(API_URL + '/api/user/id', {
                headers: {
                  Authorization: `Bearer ${token}`,
                }
              })
            console.log('User:', user_id.data);
            const response = await axios.post(API_URL + '/api/modifydb/subjects', { name, description, user_id: user_id.data, category_ids: categoryIds });
            console.log('Subject created:', response.data);
        } catch (error) {
            console.error('Error creating subject:', error);
        }
    };

    const handleCategoryChange = (e) => {
        const options = e.target.options;
        const selectedCategories = [];
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                selectedCategories.push(options[i].value);
            }
        }
        setCategoryIds(selectedCategories);
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
                <label>Categories:</label>
                <select multiple value={categoryIds} onChange={handleCategoryChange} required>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
            </div>
            <button type="submit">Create Subject</button>
        </form>
    );
};

export default AddSubject;