import { Form, useNavigation } from "react-router-dom";
import styles from "../styles/deleteForm.module.css";
import {FaTrashCan} from "react-icons/fa6";



export default function DeleteExpense({expenseSet,selected,onDelete,index}){
    const navigation = useNavigation();


    return(
        <>
            {navigation.state == "submitting" && <p>Submitting...</p>}
            {navigation.state == "loading" && <p>Loading...</p>}
            {navigation.state != "loading" && navigation.state != "submitting"}
            <Form method="DELETE" className={styles.deleteContainer}>
                    <div className={styles.formGroup}>
                            <input type="hidden"  name="id" value={expenseSet.id}/>
                    </div>
                <button type="submit" className={selected ? (index % 2 == 0 ? styles.deleteIconEven:styles.deleteIconOdd) : styles.hideIcon} onClick={()=>{onDelete(expenseSet.id)}}>
                    <FaTrashCan/>
                </button>
            </Form>  
        
        </>
    )
}