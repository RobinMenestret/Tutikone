import React, { useState } from 'react';
import AddTheme from '../contributeComponents/AddTheme';
import AddCategory from '../contributeComponents/AddCategory';
import AddQuestion from '../contributeComponents/AddQuestion';
import AddSubject from '../contributeComponents/AddSubject';
import './ContributePage.css';

const ContributePage = () => {
  const [selectedModule, setSelectedModule] = useState('');

  const renderModule = () => {
    switch (selectedModule) {
      case 'theme':
        return <AddTheme />;
      case 'category':
        return <AddCategory />;
      case 'subject':
        return <AddSubject />;
      case 'question':
        return <AddQuestion />;
      default:
        return <p>Selectionner le type d'objet à créer</p>;
    }
  };

  return (
    <div className="container">
      <h1>Contribuer à la base de donnée</h1>
      <div className="module-selection">
        <button onClick={() => setSelectedModule('theme')}>Créer un thème</button>
        <button onClick={() => setSelectedModule('category')}>Créer une catégorie</button>
        <button onClick={() => setSelectedModule('subject')}>Créer un sujet</button>
        <button onClick={() => setSelectedModule('question')}>Créer une question</button>
      </div>
      <div className="contribute-module">
        {renderModule()}
      </div>
    </div>
  );
};

export default ContributePage;