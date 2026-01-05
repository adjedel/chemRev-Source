import * as React from 'react';

export const BenzeneRing = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 21.5-6 17v-10L0 4.5 6 1l6 3.5 6-3.5 6 3.5-6 2.5v10L12 21.5z" />
    <path d="M6 5v10" />
    <path d="M18 5v10" />
    <path d-sodipodi-type="arc" d="M12 9a3 3 0 1 1-3 3" />
  </svg>
);
