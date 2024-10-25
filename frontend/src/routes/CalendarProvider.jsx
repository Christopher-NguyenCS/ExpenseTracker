import { createContext, useState } from "react";

export const CalendarContext = createContext();

export const CalendarProvider = ({ children }) => {
  let startDate = new Date();
  let endDate = new Date();
  startDate.setHours(0,0,0,0);
  endDate.setHours(23,59,59,999);
  const [dateRange, setDateRange] = useState({
    startDate: startDate.toUTCString(),
    endDate: endDate.toUTCString()
  });

  return (
    <CalendarContext.Provider value={{ dateRange, setDateRange }}>
      {children}
    </CalendarContext.Provider>
  );
};
