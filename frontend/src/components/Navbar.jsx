import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'; 
import { UserContext } from '../UserContext';

function Navbar() {
  const { user, setUser } = useContext(UserContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleNavbar = () => {
    setNavbarOpen(!navbarOpen);
  };

  return (
    <nav className={`navbar ${navbarOpen ? 'open' : ''}`}>
      <ul className="navbar-list">
        <li className="navbar-item"><Link to="/">ACCUEIL</Link></li>
        {user && <li className="navbar-item"><Link to="/contribute">CONTRIBUER</Link></li>}
        <li className="navbar-item"><Link to="/browse">NAVIGUER</Link></li>
        {!user && <li className="navbar-item"><Link to="/login">CONNEXION</Link></li>}
        {!user && <li className="navbar-item"><Link to="/register">INSCRIPTION</Link></li>}
        {user && (
          <li className="navbar-item">
            <div className="navbar-name" onClick={toggleDropdown}>
              <p>{user.username.toUpperCase()}</p>
              {dropdownOpen && (
                <div className="dropdown-menu">
                  <Link to="/settings"><p>Settings</p></Link>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;