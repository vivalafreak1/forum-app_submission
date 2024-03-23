import React from 'react';

function NotFoundPage() {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404 - Not Found</h1>
      <p className="not-found-text">The page you are looking for does not exist.</p>
      <a href="/" className="not-found-link">Go Home</a>
    </div>
  );
}

export default NotFoundPage;
