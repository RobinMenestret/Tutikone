import React from 'react';
import AddTheme from '../contributeComponents/AddTheme';
import AddCategory from '../contributeComponents/AddCategory';
import AddQuestion from '../contributeComponents/AddQuestion';
import './ContributePage.css';
import AddSubject from '../contributeComponents/AddSubject';

const ContributePage = () => {
  return (
    <div className="container">
      <h1>Contribute to the Database</h1>
      <div className="contribute-module">
        <AddTheme />
      </div>
      <div className="contribute-module">
        <AddCategory />
      </div>
      <div className="contribute-module">
        <AddSubject />
      </div>
      <div className="contribute-module">
        <AddQuestion />
      </div>
    </div>
  );
};

export default ContributePage;

