import React from 'react';

const QuestionList = ({ questions }) => {
  return (
    <div>
      <h3>Questions :</h3>
      {questions.map((question, index) => (
        <div key={index} className="question">
          <h4>Question {index + 1}</h4>
          <div className="question-details">
            <label>Niveau :</label>
            <span>{question.niveau}</span><br />
            <label>Énoncé :</label>
            <span>{question.question.énoncé}</span><br />
            <label>Indice :</label>
            <span>{question.question.indice}</span><br />
            <label>Commentaire :</label>
            <span>{question.question.commentaire}</span><br />
            <label>Réponse :</label>
            <span>{question.réponse.réponse}</span><br />
            <label>Explication :</label>
            <span>{question.réponse.explication}</span><br />
            <label>Commentaire :</label>
            <span>{question.réponse.commentaire}</span><br />
            <label>Source :</label>
            <span>{question.réponse.source}</span><br />
            <label>Source origine :</label>
            <span>{question.origine.source}</span><br />
            <label>Auteur :</label>
            <span>{question.origine.auteur}</span><br />
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuestionList;