import React from 'react';

export const BirthdayForm = ({handleBirthdaySubmit}) => (
  <form onSubmit={(e) => handleBirthdaySubmit(e)}>
    <input className='birthday-form' name='birthday' type='date'/>
    <input type='submit' />
  </form>
)