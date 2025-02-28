import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddQuestion = () => {
  const [subjectId, setSubjectId] = useState('');
  const [level, setLevel] = useState('');
  const [statement, setStatement] = useState('');
  const [hint, setHint] = useState('');
  const [questionComment, setQuestionComment] = useState('');
  const [answer, setAnswer] = useState('');
  const [explanation, setExplanation] = useState('');
  const [answerComment, setAnswerComment] = useState('');
  const [answerSource, setAnswerSource] = useState('');
  const [originSource, setOriginSource] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [categories, setCategories] = useState([]);
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    // Fetch categories on component mount
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/browsedb/categories`);
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, [API_URL]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const question = { 
      subject_id: subjectId, 
      level, 
      statement, 
      hint, 
      question_comment: questionComment, 
      answer, 
      explanation, 
      answer_comment: answerComment, 
      answer_source: answerSource, 
      origin_source: originSource, 
      author_id: authorId 
    };
    const token = localStorage.getItem('token'); // Retrieve the token from local storage

    if (token != null) {
      try {
        const response = await axios.post(API_URL + '/api/modifydb/questions', 
          question, // Send the question data
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}` // Use the authentication token
            }
          }
        );

        console.log('Question added:', response.data);
        alert('Question added successfully!');
        setSubjectId('');
        setLevel('');
        setStatement('');
        setHint('');
        setQuestionComment('');
        setAnswer('');
        setExplanation('');
        setAnswerComment('');
        setAnswerSource('');
        setOriginSource('');
        setAuthorId('');
      } catch (error) {
        console.error('Error adding question:', error.response ? error.response.data : error.message);
        alert('Failed to add question.');
      }
    } else {
      alert('You must be logged in to add a question.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="subjectId">Subject ID:</label>
        <input
          type="text"
          id="subjectId"
          value={subjectId}
          onChange={(e) => setSubjectId(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="level">Level:</label>
        <input
          type="text"
          id="level"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="statement">Statement:</label>
        <textarea
          id="statement"
          value={statement}
          onChange={(e) => setStatement(e.target.value)}
          required
        ></textarea>
      </div>
      <div>
        <label htmlFor="hint">Hint:</label>
        <textarea
          id="hint"
          value={hint}
          onChange={(e) => setHint(e.target.value)}
        ></textarea>
      </div>
      <div>
        <label htmlFor="questionComment">Question Comment:</label>
        <textarea
          id="questionComment"
          value={questionComment}
          onChange={(e) => setQuestionComment(e.target.value)}
        ></textarea>
      </div>
      <div>
        <label htmlFor="answer">Answer:</label>
        <textarea
          id="answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          required
        ></textarea>
      </div>
      <div>
        <label htmlFor="explanation">Explanation:</label>
        <textarea
          id="explanation"
          value={explanation}
          onChange={(e) => setExplanation(e.target.value)}
        ></textarea>
      </div>
      <div>
        <label htmlFor="answerComment">Answer Comment:</label>
        <textarea
          id="answerComment"
          value={answerComment}
          onChange={(e) => setAnswerComment(e.target.value)}
        ></textarea>
      </div>
      <div>
        <label htmlFor="answerSource">Answer Source:</label>
        <textarea
          id="answerSource"
          value={answerSource}
          onChange={(e) => setAnswerSource(e.target.value)}
        ></textarea>
      </div>
      <div>
        <label htmlFor="originSource">Origin Source:</label>
        <textarea
          id="originSource"
          value={originSource}
          onChange={(e) => setOriginSource(e.target.value)}
        ></textarea>
      </div>
      <div>
        <label htmlFor="authorId">Author ID:</label>
        <input
          type="text"
          id="authorId"
          value={authorId}
          onChange={(e) => setAuthorId(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="categoryId">Category:</label>
        <select
          id="categoryId"
          value={subjectId}
          onChange={(e) => setSubjectId(e.target.value)}
          required
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Add Question</button>
    </form>
  );
};

export default AddQuestion;