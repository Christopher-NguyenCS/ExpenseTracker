
import { Outlet,Link,} from 'react-router-dom';
import styles from "../styles/mainPage.module.css";





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

        <Outlet/>
      </section>
    </>
  )
}

export default Root
