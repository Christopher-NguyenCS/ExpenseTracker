import { useState } from 'react';
import { Outlet,Link } from 'react-router-dom';
import styles from "../styles/mainPage.module.css";
import TransactionList from './TransactionList';
import Calendar from 'react-calendar';
function Root() {

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
          <Calendar/>
          <TransactionList/>
        </div>
      </section>
      
    </>
  )
}

export default Root
