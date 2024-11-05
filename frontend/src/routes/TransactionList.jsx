
import styles from "../styles/transactionList.module.css";
import { useEffect, useState } from "react";


export default function TransactionList({transactionData}){
    const [empty, setEmpty] = useState(null);

    useEffect(()=>{
        if(transactionData.length >0){
            setEmpty(false);
        }
        setEmpty(true);
    },[transactionData])

    return(
        <>
            <div className={styles.container}>
            <header><h2>Transaction History</h2></header>
                <div className={styles.listExpenses}>
                    <div className={empty ? styles.emptyTransactionContainer : styles.listContainer}>
                        <ul className={styles.list}>    
                            {transactionData.length > 0 ? transactionData.map((d) => {
                                return <li key={d?.id}>{d.title}: ${d.cost}</li>
                        }):<li>
                                None in Transaction history, so populate data in expenses or pick a date range!!!
                            </li>}
                        </ul>
                    </div> 
                </div>
            </div>
        </>
    )
}