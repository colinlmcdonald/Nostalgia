import React from 'react';

export const BirthdayDisplay = ({birthday}) => (
  <div>
    {birthday.month} - {birthday.day} - {birthday.year}
  </div>
)