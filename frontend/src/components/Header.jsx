import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { showToast } from "../utils/toast";

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
    showToast('success', 'Logout successful');
      setTimeout(() => {
         navigate('/login');
      }, 500);
   
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  return (
    <section id="header">
      <Link to="/"><img src="/images/ChatGPT Image May 16, 2025, 10_31_34 AM.png" className="log" alt="Logo" /></Link>

      <div>
        <ul id="navbar" className={isMobileMenuOpen ? 'active' : ''}>
          <li><Link className="active" to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link></li>
          <li><Link to="/shop" onClick={() => setIsMobileMenuOpen(false)}>Shop</Link></li>
          <li><Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>About</Link></li>
          <li><Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link></li>
          <li id="lg-bag"><Link to="/cart" onClick={() => setIsMobileMenuOpen(false)}><i className="bi bi-cart2"></i></Link></li>

          <li className="user-menu" id="userMenu">
            <i
              className="bi bi-person-circle user-icon"
              id="userIcon"
              onClick={handleUserIconClick}
            ></i>

            {isLoggedIn && (
              <div className={`user-dropdown ${showUserDropdown ? '' : 'hidden'}`} id="userDropdown">
                <p id="userInfo">Logged in as {userInfo?.name || 'User'}</p>
                <Link to="/myorders">
                  <button id="myOrdersBtn">My Orders</button>
                </Link>
                {userInfo?.isAdmin && (
                  <Link to="/admin/dashboard"><button id="adminBtn">Admin Dashboard</button></Link>
                )}
                {userInfo?.isAdmin && (
                  <Link to="/admin/orders">
                    <button id="adminOrdersBtn">Manage Orders</button>
                  </Link>
                )}

                <button id="logoutBtn" onClick={handleLogout}>Logout</button>
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
