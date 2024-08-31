import { useState, useEffect } from "react";
import { Link,redirect } from "react-router-dom";
import styles from "../styles/transactionList.module.css";
import { set } from "date-fns";




export default function TransactionList(dates){
    const [data,setData] = useState([null]);
    const [loading, setLoading] = useState(true);
    const [error,setError] = useState("None");
    let startDate;
    let endDate;
    


    useEffect(()=>{
        const getExpenses = async () =>{
            try{
                const response = await fetch("http://localhost:5258/expenses",{
                    method:"GET", 
                    headers:{
                        "Content-Type":"application/json"
                    }
                });
                if(!response.ok){
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();
                setData(result);
            }catch (error) {
                setError(error.message);
            }finally{setLoading(false)}
        }

        getExpenses();
        
    },[]);



    if(loading){
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
                        {data.length > 0 ? data.map(d => (<li key={d?.id}>{d.title}: ${d.cost}</li>)):<li>None in Transaction history: {data.length}</li>}
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