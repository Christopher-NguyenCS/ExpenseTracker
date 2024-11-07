import { Form,useNavigate,redirect, useLocation, useOutletContext, useActionData, useFetcher, useNavigation } from "react-router-dom";
import { deleteExpenses, getExpenses, postExpenses,updateExpenses } from "../data/expenseServices";
import styles from "../styles/modal.module.css";
import {IoCloseOutline} from "react-icons/io5";

import { useEffect, useContext } from "react";
import { CalendarContext } from "./CalendarProvider.jsx";



export default function ExpenseModal(){
    const{dateRange,setDateRange} = useContext(CalendarContext);
    const navigate = useNavigate();
    const action = useActionData();
    const navigation = useNavigation();
    const location = useLocation();
    console.log("action in modal: ", action);


    console.log("modal");
    const handleClose = async() =>{
        navigate(`/expenses/?startDate=${dateRange.startDate}&endDate=${dateRange.endDate}`);
       
    }


    return(
        <>
          {navigation.state == "submitting" && <p>Submitting...</p>}
          {navigation.state == "loading" && <p>Loading...</p>}
          {navigation.state != "submitting" && navigation.state != "loading" &&(
                <div className={styles.modalDiv} onClick={()=>{handleClose()}}>
                    <div className={styles.modal} onClick={(e)=> e.stopPropagation()}>
                        <div className={styles.closeBtnContainer}>
                            <button className={styles.closeBtnOutline} onClick={()=>{handleClose()}}><IoCloseOutline onClick={()=>{handleClose()}}/></button>
                        </div>
                        <Form method="post" className={styles.formContainer}>
                            <div className={styles.formGroup}>
                                <label htmlFor="title">Title:</label>
                                <input type="text" name="title" required/>
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="cost">Cost:</label>
                                <input type="number" name="cost" step=".01" required/>
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="Category">Category:</label>
                                <input type="text" name="category" required/>
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="date">Date:</label>
                                <input type="date" name="date" required />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="time">Time:</label>
                                <input type="time" name="time" required/>
                            </div>
                            <div className={styles.formDescription}>
                                <label htmlFor="description">Description:</label>
                                <textarea name="description" id="description" required></textarea>
                            </div>
                            <div className={styles.submitBtnContainer}>
                                <button type="submit" className={styles.submitBtn}>Submit Expense</button>
                            </div>
                        </Form>
                    </div>
                </div>

          )}
        </>
    )
}