import React, { useState } from 'react';

const Portfolio = () => {
  //eslint-disable-next-line no-unused-vars
  const [photos, setPhotos] = useState([]);

  // Fetch photos from Airtable or another backend here

  return (
    <div>
      {photos.map((photo) => (
        <img key={photo.id} src={photo.url} alt={photo.name} />
      ))}
    </div>
  );
};

export default Portfolio;
