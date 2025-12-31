import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <div className="header">
      <h1><Link to="/" style={{color: 'white'}}>Bookstore App</Link></h1>
      <nav className="nav">
        <Link to="/publishers">Publishers</Link>
        <Link to="/books">Books</Link>
        <Link to="/books/new">Create Book</Link>
      </nav>
    </div>
  );
}