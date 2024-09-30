
import { createContext,useState } from "react";


export const CalendarContext = createContext();

export const CalendarProvider = ({children}) =>{
    const[dateRange,setDateRange] = useState({startDate:new Date(), endDate: new Date()});

    return(
        <CalendarContext.Provider value={{dateRange, setDateRange}}>
            {children}
        </CalendarContext.Provider>

    )
}