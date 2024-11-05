
import { Outlet,Link, NavLink,} from 'react-router-dom';
import styles from "../styles/mainPage.module.css";






function Root() {

  return (
    <>

      <div className={styles.mainPage}>
        <h1>ExpensesTracker.io</h1>
      </div>

      <section className={styles.mainContainer}>
        
        <div className={styles.verticalTabs}>
          <div className={styles.navigation}>
            <NavLink to="/" className={({isActive,isPending})=> isPending?"pending":isActive?"active":""}>
            Dashboard 
            </NavLink>

            <NavLink to="/expenses"  className={({isActive,isPending})=> isPending?"pending":isActive?"active":""}>
                Expenses
            </NavLink>


            
          </div>
        </div>
          <Outlet/>
      </section>
    </>
  )
}

export default Root
