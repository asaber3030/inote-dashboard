import './button.scss'

import React from 'react';

export default function Button({ type = 'button', className = '', is_disabled, children }) {
  return (
    <button
      type={type}
      className={'default-btn dark ' + className}
      disabled={is_disabled}
    >
      {children}
    </button>
  );
}
