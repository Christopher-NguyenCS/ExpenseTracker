import { Form } from "react-router-dom";
import styles from "../styles/deleteForm.module.css";
import {FaTrashCan} from "react-icons/fa6";



export default function DeleteExpense({expenseSet,selected,onDelete}){
    return(
        <Form method="DELETE" className={styles.deleteContainer}>
                <div className={styles.formGroup}>
                        <input type="hidden"  name="id" value={expenseSet.id}/>
                </div>
            <button type="submit" className={selected ? styles.deleteIcon : styles.hideIcon} onClick={()=>{onDelete(expenseSet.id)}}>
                <FaTrashCan/>
            </button>
        </Form>  
    )
}