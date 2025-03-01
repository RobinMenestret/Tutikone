import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddQuestion.css'; // Import the CSS file

const AddQuestion = () => {
  const [subjectId, setSubjectId] = useState('');
  const [level, setLevel] = useState(1); // Default value set to 1
  const [statement, setStatement] = useState('');
  const [hint, setHint] = useState('');
  const [questionComment, setQuestionComment] = useState('');
  const [answer, setAnswer] = useState('');
  const [explanation, setExplanation] = useState('');
  const [answerComment, setAnswerComment] = useState('');
  const [answerSource, setAnswerSource] = useState('');
  const [originSource, setOriginSource] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [subjects, setSubjects] = useState([]);
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    // Fetch subjects on component mount
    const fetchSubjects = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/browsedb/subjects`);
        setSubjects(response.data);
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    };

    fetchSubjects();
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
        setLevel(1); // Reset to default value
        setStatement('');
        setHint('');
        setQuestionComment('');
        setAnswer('');
        setExplanation('');
        setAnswerComment('');
        setAnswerSource('');
        setOriginSource('');
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
        <label htmlFor="subjectId">Sujets</label>
        <select
          id="subjectId"
          value={subjectId}
          onChange={(e) => setSubjectId(e.target.value)}
          required
        >
          {subjects.map((subject) => (
            <option key={subject.id} value={subject.id}>
              {subject.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="level">Niveau Supposé :</label>
        <input
          type="range"
          id="level"
          min="1"
          max="10"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          required
        />
        <span>{level}</span>
      </div>
      <div>
        <label htmlFor="statement">Question :</label>
        <textarea
          id="statement"
          value={statement}
          onChange={(e) => setStatement(e.target.value)}
          required
        ></textarea>
      </div>
      <div>
        <label htmlFor="hint">Indice :</label>
        <textarea
          id="hint"
          value={hint}
          onChange={(e) => setHint(e.target.value)}
        ></textarea>
      </div>
      <div>
        <label htmlFor="questionComment">Commentaire de la question (précision à apporter) :</label>
        <textarea
          id="questionComment"
          value={questionComment}
          onChange={(e) => setQuestionComment(e.target.value)}
        ></textarea>
      </div>
      <div>
        <label htmlFor="answer">Réponse :</label>
        <textarea
          id="answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          required
        ></textarea>
      </div>
      <div>
        <label htmlFor="explanation">Explication :</label>
        <textarea
          id="explanation"
          value={explanation}
          onChange={(e) => setExplanation(e.target.value)}
        ></textarea>
      </div>
      <div>
        <label htmlFor="answerComment">Commentaire de réponse (plusieurs réponses possible par exemple):</label>
        <textarea
          id="answerComment"
          value={answerComment}
          onChange={(e) => setAnswerComment(e.target.value)}
        ></textarea>
      </div>
      <div>
        <label htmlFor="answerSource">Source de la réponse :</label>
        <textarea
          id="answerSource"
          value={answerSource}
          onChange={(e) => setAnswerSource(e.target.value)}
        ></textarea>
      </div>
      <div>
        <label htmlFor="originSource">Source de la question :</label>
        <textarea
          id="originSource"
          value={originSource}
          onChange={(e) => setOriginSource(e.target.value)}
        ></textarea>
      </div>
      <button type="submit">Ajouter une question</button>
    </form>
  );
};

export default AddQuestion;