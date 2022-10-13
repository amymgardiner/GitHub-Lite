import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

const Header = () => {
  // remove the token from localStorage
  // then refresh the application by taking the user back to the homepage
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  // user has to log in to gain access to user-based features in the nav bar
  return (
    <header className="mb-4 py-2 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <Link to="/">
          <h1>
            GitHub Lite<i class="fa-solid fa-hippo"></i>
          </h1>
        </Link>

        <nav className="text-center">
          {Auth.loggedIn() ? (
            <>
              <Link to="/profile">Your Profile</Link>
              <a href="/" onClick={logout}>
                Logout
              </a>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
