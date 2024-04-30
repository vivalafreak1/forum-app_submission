import React from 'react';

function NotFoundPage() {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404 - Not Found</h1>
      <p className="not-found-text">Halaman yang anda cari tidak dapat ditemukan.</p>
      <a href="/" className="not-found-link">Kembali</a>
    </div>
  );
}

export default NotFoundPage;
