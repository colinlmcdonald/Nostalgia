import React from 'react';

export const BirthdayForm = ({handleBirthdaySubmit}) => (
  <form onSubmit={(e) => handleBirthdaySubmit(e)}>
    <input name='birthday' type='date'/>
    <input type='submit' />
  </form>
)