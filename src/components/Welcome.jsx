import React from 'react';
import { Link } from 'react-router-dom';

export default function Welcome() {
  return (
    <div>
      <div className="welcome-item">
        <h3>Publishers</h3>
        <p>View all publishers</p>
        <Link to="/publishers">Go to Publishers</Link>
      </div>

      <div className="welcome-item">
        <h3>Books</h3>
        <p>View all books</p>
        <Link to="/books">Go to Books</Link>
      </div>

      <div className="welcome-item">
        <h3>Create Book</h3>
        <p>Add new book</p>
        <Link to="/books/new">Go to Form</Link>
      </div>
    </div>
  );
}