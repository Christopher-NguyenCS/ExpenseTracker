
import Calendar from 'react-calendar';
// import "../styles/calendar.css";

import "../styles/calendar.css";
import styles from '../styles/sharedCalendar.module.css';
import { useState } from 'react';

const SharedCalendar = ({ onChange,value }) => {
  const [selectDate, setSelectDate] = useState(false);
  const handleDateChange = (newDate) => {    
    const startDate = newDate[0]
    const endDate = newDate[1] || newDate[0];
    
    setSelectDate(prevState => {
      onChange({ startDate, endDate });
      return true;
    });
  };

  return (
    <div className={styles.sharedContainer}>
      {/* {selectDate ?  null 
      :
      <header className={styles.calendarHeader}>
        <h2>Select a Date Range</h2>
      </header>
      } */}
      <Calendar
        onChange={handleDateChange}
        value={[new Date(value.startDate), new Date(value.endDate)]}
        selectRange={true}
        activeStartDate={null}
      />
    </div>
  );
};

export default SharedCalendar;