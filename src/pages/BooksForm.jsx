import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBook, createBook, updateBook } from '../services/booksService';
import { useForm } from 'react-hook-form';

export default function BooksForm() {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState, reset } = useForm();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      if (isEditMode) {
        const bookData = await getBook(id);
        reset({
          title: bookData.title,
          isbn: bookData.isbn,
          pageCount: bookData.pageCount,
          publishedDate: bookData.publishedDate.split('T')[0],
          //odvaja datum od vremena i uzima nulti element-datum
          authorId: bookData.authorId,
          publisherId: bookData.publisherId
        });
      }
      
      setLoading(false);
    } catch (err) {
      alert('Error loading data!');
      setLoading(false);
    }
  };

  const onSubmit = async (formData) => {
    try {
      const bookData = {
        title: formData.title,
        isbn: formData.isbn,
        pageCount: parseInt(formData.pageCount),
        publishedDate: new Date(formData.publishedDate).toISOString(),
        authorId: parseInt(formData.authorId),
        publisherId: parseInt(formData.publisherId)
      };

      if (isEditMode) {
        await updateBook(id, { ...bookData, id: parseInt(id) });
        alert('Book updated successfully!');
      } else {
        await createBook(bookData);
        alert('Book created successfully!');
      }

      navigate('/books');
    } catch (err) {
      alert('Error saving book!');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>{isEditMode ? 'Edit Book' : 'Create Book'}</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{marginBottom: '15px'}}>
          <label style={{display: 'inline-block', width: '150px'}}>Title:</label>
          <input type="text" {...register('title', { required: 'Title is required' })} />
          {formState.errors.title && <p>{formState.errors.title.message}</p>}
        </div>

        <div style={{marginBottom: '15px'}}>
          <label style={{display: 'inline-block', width: '150px'}}>ISBN:</label>
          <input type="text" {...register('isbn', { required: 'ISBN is required' })} />
          {formState.errors.isbn && <p>{formState.errors.isbn.message}</p>}
        </div>

        <div style={{marginBottom: '15px'}}>
          <label style={{display: 'inline-block', width: '150px'}}>Page Count:</label>
          <input type="number" {...register('pageCount', { required: 'Page count is required' })} />
          {formState.errors.pageCount && <p>{formState.errors.pageCount.message}</p>}
        </div>

        <div style={{marginBottom: '15px'}}>
          <label style={{display: 'inline-block', width: '150px'}}>Published Date:</label>
          <input type="date" {...register('publishedDate', { required: 'Date is required' })} />
          {formState.errors.publishedDate && <p>{formState.errors.publishedDate.message}</p>}
        </div>

        <div style={{marginBottom: '15px'}}>
          <label style={{display: 'inline-block', width: '150px'}}>Author ID:</label>
          <input type="number" {...register('authorId', { required: 'Author ID is required' })} />
          {formState.errors.authorId && <p>{formState.errors.authorId.message}</p>}
        </div>

        <div style={{marginBottom: '15px'}}>
          <label style={{display: 'inline-block', width: '150px'}}>Publisher ID:</label>
          <input type="number" {...register('publisherId', { required: 'Publisher ID is required' })} />
          {formState.errors.publisherId && <p>{formState.errors.publisherId.message}</p>}
        </div>

        <div style={{marginBottom: '15px'}}>
          <label style={{display: 'inline-block', width: '150px'}}></label>
          <button type="submit">{isEditMode ? 'Update Book' : 'Create Book'}</button>
          <button type="button" onClick={() => navigate('/books')}>Cancel</button>
        </div>
      </form>
    </div>
  );
}