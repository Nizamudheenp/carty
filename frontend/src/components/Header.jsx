import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    if (token && user) {
      setIsLoggedIn(true);
      setUserInfo(user);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleUserIconClick = () => {
    if (isLoggedIn) {
      setShowUserDropdown(prev => !prev);
    } else {
      navigate('/login'); 
    }
  };

  const handleOutsideClick = (e) => {
    if (!e.target.closest('#userMenu')) {
      setShowUserDropdown(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setShowUserDropdown(false);
    navigate('/login');
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  return (
    <section id="header">
      <Link to="/"><img src="/images/logo1.jpg" className="log" alt="Logo" /></Link>

      <div>
        <ul id="navbar" className={isMobileMenuOpen ? 'active' : ''}>
          <li><Link className="active" to="/">Home</Link></li>
          <li><Link to="/shop">Shop</Link></li>
          <li><Link to="/blog">Blog</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li id="lg-bag"><Link to="/cart"><i className="bi bi-cart2"></i></Link></li>

          <li className="user-menu" id="userMenu">
            <i
              className="bi bi-person-circle user-icon"
              id="userIcon"
              onClick={handleUserIconClick}
            ></i>

            {isLoggedIn && (
              <div className={`user-dropdown ${showUserDropdown ? '' : 'hidden'}`} id="userDropdown">
                <p id="userInfo">Logged in as {userInfo?.name || 'User'}</p>
                <button id="logoutBtn" onClick={handleLogout}>Logout</button>
                {userInfo?.isAdmin && (
                  <Link to="/admin/dashboard"><button id="adminBtn">Admin Dashboard</button></Link>
                )}
              </div>
            )}
          </li>

          <a href="#" id="close" onClick={() => setIsMobileMenuOpen(false)}>
            <i className="bi bi-x-lg"></i>
          </a>
        </ul>
      </div>

      <div id="mobile">
        <Link to="/cart"><i className="bi bi-cart2"></i></Link>
        <i id="bar" className="bi bi-list" onClick={() => setIsMobileMenuOpen(true)}></i>
      </div>
    </section>
  );
};

export default Header;
