import { useState, useEffect } from "react";
import { Link,redirect } from "react-router-dom";
import styles from "../styles/transactionList.module.css";
import { set } from "date-fns";
import { getExpenses } from "../data/expenseServices";



export default function TransactionList({data}){

    if(!data){
        return(
            <>
                <div>Loading data....</div>
            </>
        )
    }

    return(
        <>
            <div className={styles.container}>

                <div className={styles.listContainer}>
                    <header><h2>Transaction History</h2></header>
                    <ul className={styles.list}>    
                        {data?.length > 0? data.map(d => (<li key={d?.id}>{d?.title}: ${d?.cost}</li>)):<li>None in Transaction history: {data.length}</li>}
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