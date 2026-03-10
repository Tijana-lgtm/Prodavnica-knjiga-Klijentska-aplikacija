import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Welcome from './components/Welcome';
import PublishersList from './pages/PublishersList';
import BooksList from './pages/BooksList';
import BooksForm from './pages/BooksForm';
import AuthorsPagination from './pages/AuthorsPagination';
import UserContext from './userContext';
import Login from './pages/Login';
import GoogleCallback from './pages/GoogleCallback';
import SearchVolumes from './pages/SearchVolumes.jsx';


export default function App() {

  const [user, setUser] = useState(null);
  

  return (
    <UserContext.Provider value={{ user, setUser }}>
    <BrowserRouter>
      <Header />
      <div style={{padding: '20px'}}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/google-callback" element={<GoogleCallback />} />
          <Route path="/" element={<Welcome />} />
          <Route path="/publishers" element={<PublishersList />} />
          <Route path="/books" element={<BooksList />} />
          <Route path="/books/new" element={<BooksForm />} />
          <Route path="/books/edit/:id" element={<BooksForm />} />
          <Route path="/authors/pagination" element={<AuthorsPagination />} />
          <Route path="/volumes/search" element={<SearchVolumes />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
    </UserContext.Provider>
    
  );
}