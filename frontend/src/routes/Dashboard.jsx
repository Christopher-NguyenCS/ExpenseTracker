import styles from "../styles/dashboard.module.css";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js/auto";
import PieChart from "./PieChart";
import { useContext,useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { getMonth,getDate, getYear, isSameDay, getDaysInMonth } from "date-fns";
import { months } from "../data/months";
import { CalendarContext } from "./CalendarProvider";

import SharedCalendar from "./SharedCalendar";
import TransactionList from "./TransactionList";
Chart.register(CategoryScale);


export default function Dashboard(){
    const {dateRange,setDateRange} = useContext(CalendarContext);
    const navigate = useNavigate();
    const data = useLoaderData();

    
    const handleDateChange = (newDateRange) => {
        setDateRange(newDateRange);
        navigate(`/?startDate=${newDateRange.startDate}&endDate=${newDateRange.endDate}`);
      };

    useEffect(() => {
        navigate(`/?startDate=${dateRange.startDate}&endDate=${dateRange.endDate}`);
    }, [dateRange, navigate]);

    function displayDate(){
        if(dateRange){
            if(isSameDay(dateRange.startDate,dateRange.endDate)){
            
                return(<h1>{months[getMonth(dateRange.startDate)]} {getDate(dateRange.startDate)}, {getYear(dateRange.startDate)}</h1>);
            }
            return(
                <h1>{ months[getMonth(dateRange.startDate)]} {getDate(dateRange.startDate)}, {getYear(dateRange.startDate)} - {months[getMonth(dateRange.endDate)]} {getDate(dateRange.endDate)}, {getYear(dateRange.endDate)}</h1>
            );
        }
        return(<h1>{months[getMonth(dateRange.startDate)]}</h1>);
    }

    return(
        <>
            <section className={styles.dashboardContainer}>
                <div className={styles.pieContainer}>
                    <div>
                        <header>{displayDate(dateRange)} </header>

                    </div>
                    <PieChart chartData={data}/>
                </div>

                <div className={styles.listContainer}>
                    <SharedCalendar onChange={handleDateChange} value={dateRange}/>
                    <TransactionList transactionData={data}/>
                </div>
            </section>
        </>
    )
}