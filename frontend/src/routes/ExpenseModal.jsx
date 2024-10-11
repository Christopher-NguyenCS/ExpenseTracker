import { Form,useNavigate,redirect, useLocation, useOutletContext, useActionData } from "react-router-dom";
import { deleteExpenses, getExpenses, postExpenses,updateExpenses } from "../data/expenseServices";
import styles from "../styles/modal.module.css";
import {IoCloseOutline} from "react-icons/io5";
import EditExpenseModal from "./EditExpenseModal.jsx";
import { useEffect, useContext } from "react";
import { CalendarContext } from "./CalendarProvider.jsx";

export async function action({request,params}){
    const formData = await request.formData();

    switch(request.method){

        case "POST":{
            const data = Object.fromEntries(formData);
            const newData = await postExpenses(data);
            return newData;

        }
        case "PUT":{
            const data = Object.fromEntries(formData);
            const id = params.id;
            await updateExpenses(data,id);
            return 1;
        }
        case "DELETE":{
            const ids = formData.getAll('id')
            await deleteExpenses(ids);
            return 1;
        }
    }
}

export default function ExpenseModal(){
    const [expenses,setExpenses] = useOutletContext();
    const{dateRange,setDateRange} = useContext(CalendarContext);
    const actionData = useActionData();
    const navigate = useNavigate();
    const location = useLocation();


    useEffect(() => {
        if (actionData) {
            setExpenses(actionData);
            navigate(-1);
        }
    }, [actionData, setExpenses]);


    const handleClose = async() =>{
        navigate(`/expenses/?startDate=${dateRange.startDate}&endDate=${dateRange.endDate}`);
    }

    if(location.pathname !== "/expenses/modal"){
        return(
        <EditExpenseModal location={location}/>
        )
    }

    return(
        <>
            <div className={styles.modalDiv} onClick={()=>{handleClose()}}>
                <div className={styles.modal} onClick={(e)=> e.stopPropagation()}>
                    <div className={styles.closeBtnContainer}>
                        <button className={styles.closeBtnOutline} onClick={()=>{handleClose()}}><IoCloseOutline className={styles.closeBtn} onClick={()=>{handleClose()}}/></button>
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
        </>
    )
}