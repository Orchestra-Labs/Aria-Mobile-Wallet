import React from 'react';

export const Link: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m13.06 8.111 1.415 1.414a7 7 0 0 1 0 9.9l-.354.353a7 7 0 1 1-9.9-9.9l1.415 1.415a5 5 0 1 0 7.071 7.071l.354-.354a5 5 0 0 0 0-7.07l-1.415-1.415 1.415-1.414Zm6.718 6.01-1.414-1.414a5 5 0 0 0-7.071-7.07l-.354.353a5 5 0 0 0 0 7.07l1.415 1.415-1.415 1.414-1.414-1.414a7 7 0 0 1 0-9.9l.354-.353a7 7 0 1 1 9.9 9.9Z"
      fill="#F2F2FA"
    />
  </svg>
);
