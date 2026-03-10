import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../userContext';
import LogoutButton from './LogoutButton';

export default function Header() {

  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUser(payload);
      } catch (error) {
        console.error('Nevalidan token');
      }
    }
  }, []);

  return (
    <div className="header">
      <h1><Link to="/" style={{ color: 'white' }}>Bookstore App</Link></h1>
      <nav className="nav">
        <Link to="/publishers">Publishers</Link>
        <Link to="/books">Books</Link>
        {user && user.role === "Editor" && (
          <Link to="/volumes/search">Search Volumes</Link>
        )}
        {user && (
          <>
            <Link to="/books/new">Create Book</Link>
            <LogoutButton />
          </>
        )}
      </nav>
    </div>
  );
}