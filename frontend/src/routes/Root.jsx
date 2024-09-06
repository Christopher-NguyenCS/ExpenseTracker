import { useEffect, useState } from 'react';
import { Outlet,Link } from 'react-router-dom';
import styles from "../styles/mainPage.module.css";
import TransactionList from './TransactionList';
import {differenceInCalendarDays} from 'date-fns';
import Calendar from 'react-calendar';
import "../styles/calendar.css";
import { getExpenses } from '../data/expenseServices.js';

function Root() {

  const[date,setDate] = useState(new Date());
  const[data, setData] = useState(null);

useEffect(() => {
  let active = true;
  const fetchData = async () => {
    try {
      const result = await getExpenses();
      if(active){
        setData(result);
        // setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  fetchData();
  return ()=>{
    active =false;
  };
}, []); 

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
          {/* <Outlet context={[data,setData]} />       */}
          <Outlet/>
        </div>

        <div className={styles.listContainer}>
          <Calendar 
            onChange={onChange} 
            value={date}
            selectRange={true}
          />
          <TransactionList data={data}/>
        </div>
      </section>
      
    </>
  )
}

export default Root
