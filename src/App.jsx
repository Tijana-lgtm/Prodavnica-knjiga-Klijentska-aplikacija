import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Welcome from './components/Welcome';
import PublishersList from './pages/PublishersList';
import BooksList from './pages/BooksList';
import BooksForm from './pages/BooksForm';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <div style={{padding: '20px'}}>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/publishers" element={<PublishersList />} />
          <Route path="/books" element={<BooksList />} />
          <Route path="/books/new" element={<BooksForm />} />
          <Route path="/books/edit/:id" element={<BooksForm />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}