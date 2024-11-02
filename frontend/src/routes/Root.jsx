
import { Outlet,Link,} from 'react-router-dom';
import styles from "../styles/mainPage.module.css";






function Root() {

  return (
    <>

      <div className={styles.mainPage}>
        <h1>ExpensesTracker.io</h1>
      </div>

      <section className={styles.mainContainer}>
        
        <div className={styles.verticalTabs}>
          <ul className={styles.navigation}>
            <li >
              <Link to="/" className={styles.navigationLink }>
                <button className={styles.navigationBtn}>Dashboard  </button> 
              </Link>
            </li>

            <li>
              <Link to="/expenses" className={styles.navigationLink}>
                <button className={styles.navigationBtn}>Expenses</button>
              </Link>

            </li>

            
          </ul>
        </div>
          <Outlet/>
      </section>
    </>
  )
}

export default Root
