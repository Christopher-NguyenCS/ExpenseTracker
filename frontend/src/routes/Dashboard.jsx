import styles from "../styles/dashboard.module.css";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js/auto";
import PieChart from "./PieChart";
import { useContext,useEffect,useState } from "react";
import { redirect, useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { getMonth,getDate, getYear, isSameDay, getDaysInMonth } from "date-fns";
import { months } from "../data/months";
import { CalendarContext } from "./CalendarProvider";

import SharedCalendar from "./SharedCalendar";
import TransactionList from "./TransactionList";
import { getExpenses } from "../data/expenseServices";
Chart.register(CategoryScale);


export default function Dashboard(){
    const {dateRange,setDateRange} = useContext(CalendarContext);
    const navigate = useNavigate();
    const location = useLocation();
    const data = useLoaderData();
    const [chartData,setChartData] = useState(data);
    
    const handleDateChange = (newDateRange) => {
        const startDate = new Date(newDateRange.startDate);
        const endDate = new Date(newDateRange.endDate);
        const formattedDateRange = {
            startDate: startDate.toUTCString(),
            endDate: endDate.toUTCString(),
        };
        setDateRange(formattedDateRange);
        navigate(`/?startDate=${formattedDateRange.startDate}&endDate=${formattedDateRange.endDate}`);
    };
    
    useEffect(()=>{
        const fetchExpenseOnce = async()=>{
            let startDate = new Date();
            let endDate = new Date();
            startDate.setHours(0,0,0,0);
            endDate.setHours(23,59,59,999);
            const response = await getExpenses([startDate,endDate]);
            const newExpense = await response.json();
            setChartData(newExpense);
            console.log("fetchEXPENSEONCE");
        }
        fetchExpenseOnce();
    },[]);

    useEffect(()=>{

        const fetchExpenses = async () => {
            if(dateRange.startDate && dateRange.endDate){
                try {
                    const response = await getExpenses([dateRange.startDate, dateRange.endDate]);
                    const newExpenses = await response.json();
                    setChartData(newExpenses);
                } catch (error) {
                    console.error("Error fetching expenses:", error);
                } 
            }
            else{
                console.log("dateRange undefined");
            }
        };
        fetchExpenses();
    },[data,dateRange]);
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
            {chartData.length != 0 ?
                <div className={styles.pieContainer}>
                    <div>
                        <header>{displayDate(dateRange)} </header>

                    </div>
                    <PieChart chartData={chartData}/>
                </div>
                :
                <div className={styles.noDataContainer}>
                    <div>
                        <header>{displayDate(dateRange)}</header>
                    </div>
                </div>
            }

                <div className={styles.listContainer}>
                    <div className={styles.testCalendar}>
                        <SharedCalendar onChange={handleDateChange} value={dateRange}/>
                    </div>
                    <div className={styles.transactionHistoryList}>
                        <TransactionList transactionData={chartData}/>
                    </div>
                </div>
                
            </section>
        </>
    )
}