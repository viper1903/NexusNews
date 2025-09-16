import React from 'react';

const SummarizeIcon = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9-9 9a9 9 0 0 1-9-9c0-7.2 1.8-9 9-9z"></path>
    <path d="M10 12a2.5 2.5 0 0 0 4 0"></path>
    <path d="M10 12a2.5 2.5 0 0 1 4 0"></path>
    <path d="m14 12 2-2.5"></path>
    <path d="m10 12-2-2.5"></path>
    <path d="m14 12 2 2.5"></path>
    <path d="m10 12-2 2.5"></path>
  </svg>
);

export default SummarizeIcon;