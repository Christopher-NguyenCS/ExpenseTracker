
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';



const SharedCalendar = ({ onChange,value }) => {
  const handleDateChange = (newDate) => {
    const startDate = newDate[0];
    const endDate = newDate[1] || newDate[0];
    onChange({startDate,endDate});
  };

  return (
    <div>
      <h2>Select a Date</h2>
      <Calendar
        onChange={handleDateChange}
        value={[value.startDate,value.endDate]}
        selectRange={true}
        activeStartDate={null}
      />
    </div>
  );
};

export default SharedCalendar;