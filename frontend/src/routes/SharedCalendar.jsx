
import Calendar from 'react-calendar';
// import "../styles/calendar.css";
import 'react-calendar/dist/Calendar.css';
import { getHours } from 'date-fns';



const SharedCalendar = ({ onChange,value }) => {
  const handleDateChange = (newDate) => {
    
    
    const startDate = newDate[0].toUTCString();
    const endDate = newDate[1].toUTCString() || newDate[0].toUTCString();
    
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