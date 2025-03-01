import React from 'react';
import './Footer.css'; // Import the CSS file for styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>Contact : <a href="mailto:tutikonegame@gmail.com">tutikonegame@gmail.com</a></p>
        <p>Contribuer au code : <a href="https://github.com/RobinMenestret/Tutikone" target="_blank" rel="noopener noreferrer">Github</a></p>
      </div>
    </footer>
  );
};

export default Footer;