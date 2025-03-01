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
        return <p>Please select a module to contribute.</p>;
    }
  };

  return (
    <div className="container">
      <h1>Contribute to the Database</h1>
      <div className="module-selection">
        <button onClick={() => setSelectedModule('theme')}>Add Theme</button>
        <button onClick={() => setSelectedModule('category')}>Add Category</button>
        <button onClick={() => setSelectedModule('subject')}>Add Subject</button>
        <button onClick={() => setSelectedModule('question')}>Add Question</button>
      </div>
      <div className="contribute-module">
        {renderModule()}
      </div>
    </div>
  );
};

export default ContributePage;