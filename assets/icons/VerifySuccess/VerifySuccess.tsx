import React from 'react';

export const VerifySuccess: React.FC<React.SVGProps<SVGSVGElement>> = (
  props,
) => (
  <svg
    width="224"
    height={props.height ?? props.width ?? 224}
    viewBox="0 0 224 224"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M93.398 19.635c-13.08-4.235-27.301 1.656-33.557 13.9l-7.52 14.72a9.332 9.332 0 0 1-4.066 4.065l-14.72 7.521c-12.244 6.256-18.135 20.476-13.9 33.557l5.091 15.727a9.333 9.333 0 0 1 0 5.749l-5.091 15.727c-4.235 13.082 1.656 27.302 13.9 33.558l14.72 7.52a9.337 9.337 0 0 1 4.065 4.066l7.521 14.72c6.256 12.245 20.476 18.135 33.557 13.9l15.727-5.091a9.332 9.332 0 0 1 5.749 0l15.727 5.091c13.082 4.235 27.302-1.655 33.558-13.9l7.52-14.72a9.342 9.342 0 0 1 4.066-4.066l14.72-7.52c12.245-6.256 18.135-20.476 13.9-33.558l-5.091-15.727a9.332 9.332 0 0 1 0-5.749l5.091-15.727c4.235-13.08-1.655-27.301-13.9-33.557l-14.72-7.52a9.337 9.337 0 0 1-4.066-4.066l-7.52-14.72c-6.256-12.244-20.476-18.135-33.558-13.9l-15.727 5.091a9.334 9.334 0 0 1-5.749 0l-15.727-5.091Zm-30.307 90.1 13.2-13.2 26.398 26.399 52.798-52.797 13.199 13.199-65.997 65.996-39.598-39.597Z"
      fill="currentColor"
    />
  </svg>
);
