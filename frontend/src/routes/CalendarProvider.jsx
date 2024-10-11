
import { createContext,useState } from "react";


export const CalendarContext = createContext();

export const CalendarProvider = ({children}) =>{
    const firstDate = new Date();
    const secondDate = new Date();
    const[dateRange,setDateRange] = useState({startDate:firstDate.toUTCString(), endDate: secondDate.toUTCString()});

    return(
        <CalendarContext.Provider value={{dateRange, setDateRange}}>
            {children}
        </CalendarContext.Provider>

    )
}