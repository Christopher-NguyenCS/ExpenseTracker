import { useState } from 'react';
import { Outlet,Link } from 'react-router-dom';
import styles from "../styles/mainPage.module.css";
import TransactionList from './TransactionList';
import {differenceInCalendarDays} from 'date-fns';
import Calendar from 'react-calendar';
import "../styles/calendar.css";

function Root() {

  const[date,setDate] = useState(new Date());

  function onChange(value){
    setDate(value);
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
          <Calendar 
            onChange={onChange} 
            value={date}
            selectRange={true}
            activeStartDate={new Date()}
          />
          <TransactionList/>
        </div>
        {/* {date.length > 1 ? <div>
          <p>Start: {date[0].toDateString()}</p>
          <p>End:{date[1].toDateString()}</p>
          </div>:null } */}
      </section>
      
    </>
  )
}

export default Root
