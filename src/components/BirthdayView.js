import React                  from 'react';
import { BirthdayDisplay }    from './BirthdayDisplay';
import { BirthdayForm }       from './BirthdayForm';

export const BirthdayView = ({name, image, birthday, handleBirthdaySubmit}) => (
  <div className='birthday-container'>
    <div className='birthday-header-container'>
      <h2 className='birthday-header'>Wasssupppp</h2>
      <h2 className='birthday-header'>{name}</h2>
    </div>
    <div className='birthday-form-container'>
      <BirthdayForm handleBirthdaySubmit={handleBirthdaySubmit} />
      <p className='birthday-direction'>Submit your birth date to get started!</p>
    </div>
  </div>
)