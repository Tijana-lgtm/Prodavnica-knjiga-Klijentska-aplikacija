import React, { useState, useEffect } from 'react';
import { getBooks, deleteBook } from '../services/booksService';
import { useNavigate } from 'react-router-dom';

export default function BooksList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  const loadBooks = async () => {
    try {
      const data = await getBooks();
      setBooks(data);
      setLoading(false);
    } catch (err) {
      alert('Error loading books!');
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooks();
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setRole(payload.role);
      } catch (error) {
        console.error('Nevalidan token');
      }
    }
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await deleteBook(id);
        loadBooks(); 
      } catch (err) {
        alert('Error deleting book!');
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/books/edit/${id}`);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="page-title">Books</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>ISBN</th>
            <th>Page Count</th>
            <th>Published Date</th>
            <th>Author</th>
            <th>Publisher</th>
            {role === "Editor" && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.title}</td>
              <td>{book.isbn}</td>
              <td>{book.pageCount}</td>
              <td>{new Date(book.publishedDate).toLocaleDateString('sr-RS')}</td>
              <td>{book.authorFullName}</td>
              <td>{book.publisherName}</td>
              {role === "Editor" && (
                <td>
                  <button onClick={() => handleEdit(book.id)}>Edit</button>
                  <button onClick={() => handleDelete(book.id)}>Delete</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
