
import React from 'react';

const BrainIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v1.2a1 1 0 0 0 1 1h.3a1.7 1.7 0 0 1 1.7 1.7v.3a1 1 0 0 0 1 1h1.2a2.5 2.5 0 0 1 2.5 2.5v1.5a2.5 2.5 0 0 1-2.5 2.5h-1.2a1 1 0 0 0-1 1v.3a1.7 1.7 0 0 1-1.7 1.7h-.3a1 1 0 0 0-1 1v1.2a2.5 2.5 0 0 1-2.5 2.5h-3A2.5 2.5 0 0 1 6 19.5v-1.2a1 1 0 0 0-1-1h-.3A1.7 1.7 0 0 1 3 15.5v-.3a1 1 0 0 0-1-1H.5A2.5 2.5 0 0 1-2 11.5v-1.5A2.5 2.5 0 0 1 .5 7.5h1.2a1 1 0 0 0 1-1v-.3A1.7 1.7 0 0 1 4.5 4.5h.3a1 1 0 0 0 1-1V2.5A2.5 2.5 0 0 1 8 0h3.5" />
    <path d="M12 4.5v15" />
  </svg>
);

export default BrainIcon;
