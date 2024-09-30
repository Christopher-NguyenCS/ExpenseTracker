import { useEffect, useState } from 'react';
import { Outlet,Link, useLoaderData } from 'react-router-dom';
import styles from "../styles/mainPage.module.css";
import TransactionList from './TransactionList';
import { getExpenses } from '../data/expenseServices';
import Calendar from 'react-calendar';
import "../styles/calendar.css";
import SharedCalendar from './SharedCalendar';



function Root() {
  const rootData = useLoaderData();
  
  // const [specificExpense,setSepecificExpense] = useState(null);

  const[date,setDate] = useState(new Date());
 

  const handleDateChange =(date)=>{
    setDate(date);
  }


  return (
    <>

      <div className={styles.mainPage}>
        <h1>Main Page!</h1>
      </div>

      <section className={styles.mainContainer}>
        
        <div className={styles.verticalTabs}>
          <nav className={styles.navigation}>
            <ul>
              <li><Link to="/">Dashboard</Link> </li>
              <li><Link to="expenses">Expenses</Link> </li>

            </ul>
          </nav>
        </div>

        <div className={styles.mainContent}>
            <Outlet/>
        </div>

        <div className={styles.listContainer}>
          {/* <Calendar 
            onChange={setDate}             
            selectRange={true}
            value={date}
            activeStartDate={null}
          /> */}
           {/* <SharedCalendar
            onDateChange={handleDateChange}
          />  */}

          <TransactionList transactionData={rootData}/>
        </div>
      </section>
      
    </>
  )
}

export default Root
