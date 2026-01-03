import React from 'react';
import { useParams } from 'react-router-dom';

export default function BooksForm() {
  const { id } = useParams();

  return (
    <div>
      <h2>{id ? 'Edit Book' : 'Create Book'}</h2>
      {id ? (
        <p>Form for editing book with ID: {id}</p>
      ) : (
        <p>Form for creating new book</p>
      )}
    </div>
  );
}