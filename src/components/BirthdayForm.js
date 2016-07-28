import React from 'react';

export const BirthdayForm = ({handleSubmit}) => (
  <form onSubmit={(e) => handleSubmit(e)}>
    <input name='birthday' type='date'/>
    <input type='submit' />
  </form>
)