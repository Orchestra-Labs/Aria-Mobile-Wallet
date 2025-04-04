import React from 'react';

export const Sort: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M3 6H21M6 12H18M10 18H14"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    ></path>
  </svg>
);
