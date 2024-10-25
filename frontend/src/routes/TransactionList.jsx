import { Link } from "react-router-dom";
import styles from "../styles/transactionList.module.css";


export default function TransactionList({transactionData}){

    return(
        <>
            <div className={styles.container}>

                <div className={styles.listContainer}>
                    <header><h2>Transaction History</h2></header>
                    <ul className={styles.list}>    
                        {transactionData.length > 0 ? transactionData.map(d => (<li key={d?.id}>{d.title}: ${d.cost}</li>)):<li>None in Transaction history....</li>}
                    </ul>
                </div> 

                <div className={styles.btnContainer}>
                    <Link to={"/expenses"}>
                        <button type="button" className={styles.btn}>View All Transaction</button>
                    </Link>
                </div>
            </div>
        </>
    )
}