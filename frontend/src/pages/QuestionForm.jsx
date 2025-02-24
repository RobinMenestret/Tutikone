import React, { useState } from 'react';

const QuestionForm = ({ onQuestionsChange }) => {
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState([]);

  const addQuestion = () => {
    setQuestions([...questions, { niveau: '', enonce: '', indice: '', commentaire: '', reponse: '', explication: '', commentaireReponse: '', sourceReponse: '', sourceOrigine: '', auteur: '' }]);
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = questions.map((question, i) => (i === index ? { ...question, [field]: value } : question));
    setQuestions(updatedQuestions);
    onQuestionsChange(updatedQuestions);
  };

  const generateJSON = () => {
    const jsonResult = {
      nom,
      description,
      questions,
    };
    const jsonString = JSON.stringify(jsonResult, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const fileName = `${nom.toLowerCase().replace(/\s+/g, '_')}.json`;
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = fileName;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <form>
      <label>
        Nom:
        <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} required />
      </label>
      <label>
        Description:
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <div>
        <h3>Questions:</h3>
        <button type="button" onClick={addQuestion}>Ajouter une question</button>
        {questions.map((question, index) => (
          <div key={index}>
            <h4>Question {index + 1}</h4>
            <label>
              Niveau:
              <input type="number" min="1" max="10" value={question.niveau} onChange={(e) => handleQuestionChange(index, 'niveau', e.target.value)} required />
            </label>
            <label>
              Énoncé:
              <input type="text" value={question.enonce} onChange={(e) => handleQuestionChange(index, 'enonce', e.target.value)} required />
            </label>
            <label>
              Indice:
              <input type="text" value={question.indice} onChange={(e) => handleQuestionChange(index, 'indice', e.target.value)} />
            </label>
            <label>
              Commentaire:
              <input type="text" value={question.commentaire} onChange={(e) => handleQuestionChange(index, 'commentaire', e.target.value)} />
            </label>
            <label>
              Réponse:
              <input type="text" value={question.reponse} onChange={(e) => handleQuestionChange(index, 'reponse', e.target.value)} required />
            </label>
            <label>
              Explication:
              <input type="text" value={question.explication} onChange={(e) => handleQuestionChange(index, 'explication', e.target.value)} />
            </label>
            <label>
              Commentaire:
              <input type="text" value={question.commentaireReponse} onChange={(e) => handleQuestionChange(index, 'commentaireReponse', e.target.value)} />
            </label>
            <label>
              Source:
              <input type="text" value={question.sourceReponse} onChange={(e) => handleQuestionChange(index, 'sourceReponse', e.target.value)} />
            </label>
            <label>
              Source origine:
              <input type="text" value={question.sourceOrigine} onChange={(e) => handleQuestionChange(index, 'sourceOrigine', e.target.value)} />
            </label>
            <label>
              Auteur:
              <input type="text" value={question.auteur} onChange={(e) => handleQuestionChange(index, 'auteur', e.target.value)} />
            </label>
          </div>
        ))}
      </div>
      <button type="button" onClick={generateJSON}>Générer le JSON</button>
    </form>
  );
};

export default QuestionForm;