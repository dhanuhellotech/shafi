import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateOfBirthPicker = ({ dateOfBirth, setDateOfBirth }) => {
  return (
    <DatePicker
      selected={dateOfBirth}
      onChange={(date) => setDateOfBirth(date)}
      dateFormat="dd/MM/yyyy"
      placeholderText="Select Date of Birth"
      showYearDropdown
      scrollableYearDropdown
      yearDropdownItemNumber={15}
      maxDate={new Date()}
    />
  );
};

export default DateOfBirthPicker;
