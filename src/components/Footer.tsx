import React from 'react';

import '../styles/Footer.scss';

export default function Footer() {
  return (
    <div className='row footer'>
      <div className='col'>
        <p>Created with love by Markiian Benovskyi © 2020 - {new Date().getFullYear()}</p>
      </div>
    </div>
  )
}