import { useState, useEffect } from "react";
import styles from "../styles/transactionList.module.css";

export default function TransactionList(dates){
    const [data,setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    let startDate;
    let endDate;
    
    const getExpenses = async () =>{
        const response = await fetch("http://localhost:5258/expenses",{
            method:"GET", 
            headers:{
                "Content-Type":"application/json"
            }
        });
        try{
            if(!response.ok){
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            setData(result);
        }catch (error) {
            setError(error.message);
          } finally {
            setLoading(false);
          }
        }

    useEffect(()=>{
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
                List
                {startDate}
                <ul>    
                    {/* {props.expenses.map(expense => (
                        <li>{expense}</li>
                    ))}; */}
                    {data.map(d => {<li>d.title</li>})}
                </ul>
                
            </div>
        </>
    )
}