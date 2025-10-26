
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center p-4 md:p-6">
      <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
        Recruitment Sandbox AI
      </h1>
      <p className="text-slate-400 mt-2 max-w-2xl mx-auto">
        Paste your raw job notes below. Our AI will craft a professional job description and a targeted interview guide in seconds.
      </p>
    </header>
  );
};

export default Header;
