
import React from 'react';

const YouTubeLogo: React.FC<{ className?: string }> = ({ className = "h-6" }) => (
  <svg
    className={className}
    viewBox="0 0 28 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M27.3895 3.13938C27.0685 1.89591 26.0913 0.931574 24.8324 0.610503C22.6623 0 14 0 14 0C14 0 5.33768 0 3.16761 0.610503C1.90873 0.931574 0.931486 1.89591 0.610415 3.13938C0 5.36062 0 10 0 10C0 10 0 14.6394 0.610415 16.8606C0.931486 18.1041 1.90873 19.0684 3.16761 19.3895C5.33768 20 14 20 14 20C14 20 22.6623 20 24.8324 19.3895C26.0913 19.0684 27.0685 18.1041 27.3895 16.8606C28 14.6394 28 10 28 10C28 10 28 5.36062 27.3895 3.13938Z"
      fill="#FF0000"
    />
    <path d="M11.1999 14.2857L18.3999 10L11.1999 5.71429V14.2857Z" fill="white" />
  </svg>
);

export default YouTubeLogo;
    