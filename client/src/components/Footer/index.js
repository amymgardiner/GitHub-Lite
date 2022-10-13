import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-100 mt-auto p-4">
      <div className="container">&copy; Github Lite {currentYear}</div>
    </footer>
  );
};

export default Footer;
