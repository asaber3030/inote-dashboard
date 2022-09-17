import './app-logo.scss'

import React from 'react';
import DarkLogo from '../../assets/logo/dark-logo.png'
import WhiteLogo from '../../assets/logo/white-logo.png'

export default function ApplicationLogo({ className }) {
  return (
    <img src={DarkLogo} className={className + ' app-logo'} />
  );
}
