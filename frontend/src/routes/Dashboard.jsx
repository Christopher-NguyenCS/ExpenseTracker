import styles from "../styles/dashboard.module.css";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js/auto";
import PieChart from "./PieChart";
import { useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMonth,getDate, getYear, isSameDay,format } from "date-fns";
import { months } from "../data/months";
import { CalendarContext } from "./CalendarProvider";
import SharedCalendar from "./SharedCalendar";
Chart.register(CategoryScale);


export default function Dashboard({data}){
    const {dateRange,setDateRange} = useContext(CalendarContext);
    const navigate = useNavigate();

    
    const handleDateChange = (newDateRange) => {
        setDateRange(newDateRange);
        navigate(`/?startDate=${newDateRange.startDate}&endDate=${newDateRange.endDate}`);
      };


    //remove
      useEffect(() => {
        navigate(`/?startDate=${dateRange.startDate}&endDate=${dateRange.endDate}`);
      }, [dateRange, navigate]);

    function displayDate(){
        if(dateRange.length>1){
            if(isSameDay(dateRange.startDate,dateRange.endDate)){
                return(<h1>{months[getMonth(dateRange.startDate)]}</h1>);
            }
            return(
                <h1>{ months[getMonth(dateRange.startDate)]} {getDate(dateRange.startDate)}, {getYear(dateRange.startDate)} - {months[getMonth(dateRange.endDate)]} {getDate(dateRange.endDate)}, {getYear(dateRange.endDate)}</h1>
            );
        }
        return(<h1>{months[getMonth(dateRange.startDate)]}</h1>);
    }
    return(
        <>
            <div>
                <h1>Dashboard Page</h1>
            </div>

            <section>
                <div className={styles.pieContainer}>
                    {displayDate(dateRange)}
                    <PieChart chartData={data}/>
                </div>
                <SharedCalendar onChange={handleDateChange} value={dateRange}/>
            </section>
        </>
    )
}