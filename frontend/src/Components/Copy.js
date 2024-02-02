import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in by looking at the authentication state
    // This could be managed by a state management library or context
    // For now, you can use a simple condition based on your authentication logic
    const isAuthenticated = /* Check your authentication state here */;
    setIsLoggedIn(isAuthenticated);

    // If the user is authenticated, you may fetch user details and update the state
    if (isAuthenticated) {
      // Example: Fetch user details and update the state
      // const userDetails = /* Fetch user details */;
      // setUserName(userDetails.name);
    }
  }, []);

  const handleLogout = () => {
    // Handle the logout logic
    // Clear user details, update authentication state, etc.
    setIsLoggedIn(false);
    // Redirect to the home page or login page
    navigate('/');
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-light">
        {/* ... Your existing navbar code ... */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* ... Your existing menu items ... */}
          </ul>
          {isLoggedIn ? (
            <div className="d-flex">
              <button className="btn btn-outline-primary me-2" type="button">
                {userName}'s Profile
              </button>
              <button className="btn btn-outline-danger" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <form className="d-flex" role="search">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
              </ul>
              <Link to="/register">
                <button className="btn btn-outline-success" type="submit">
                  Registration
                </button>
              </Link>
            </form>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
