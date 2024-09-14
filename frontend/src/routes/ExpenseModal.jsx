import { Form,useNavigate,redirect,useParams, useLocation } from "react-router-dom";
import { getExpenses, postExpenses,updateExpenses } from "../data/expenseServices";
import styles from "../styles/modal.module.css";
import {IoCloseOutline} from "react-icons/io5";
import EditExpenseModal from "./EditExpenseModal.jsx";

export async function action({request,params}){
    console.log(request);
    switch(request.method){
        case "POST":{
            const formData = Object.fromEntries(await request.formData());
            const data = postExpenses(formData);
            // if(data !== null){
            //     getExpenses();
            // }

            return redirect("/expenses/modal");

        }
        case "PUT":{
            const formData = Object.fromEntries(await request.formData());
            const id = params.id;
            const data = updateExpenses(formData,id);
            return redirect("/expenses");
        }
    }
}

export default function ExpenseModal(){
    const navigate = useNavigate();
    const location = useLocation();
    console.log("Location", location);


    const handleClose = () =>{
        navigate("/expenses");
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
                            <input type="number" name="cost" />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="Category">Category:</label>
                            <input type="text" name="category"/>
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="date">Date:</label>
                            <input type="date" name="date" required />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="time">Time:</label>
                            <input type="time" name="time" />
                        </div>
                        <div className={styles.formDescription}>
                            <label htmlFor="description">Description:</label>
                            <textarea name="description" id="description"></textarea>
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