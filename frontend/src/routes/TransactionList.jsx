import styles from "../styles/transactionList.module.css";

export default function TransactionList(props){
    return(
        <>
            <div className={styles.container}>
                List
                <ul>    
                    {/* {props.expenses.map(expense => (
                        <li>{expense}</li>
                    ))}; */}
                </ul>
                
            </div>
        </>
    )
}