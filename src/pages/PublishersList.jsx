import React, { useState, useEffect } from 'react';
import { getPublishers } from '../services/publishersService';

export default function PublishersList() {
  const [publishers, setPublishers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPublishers = async () => {
      try {
        const data = await getPublishers();
        setPublishers(data);
        setLoading(false);
      } catch (err) {
        alert('Error loading publishers!');
        setLoading(false);
      } 
    };

    fetchPublishers();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="page-title">Publishers</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>Website</th>
          </tr>
        </thead>
        <tbody>
          {publishers.map(publisher => (
            <tr key={publisher.id}>
              <td>{publisher.id}</td>
              <td>{publisher.name}</td>
              <td>{publisher.address}</td>
              <td>
                <a href={publisher.website}>{publisher.website}</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}