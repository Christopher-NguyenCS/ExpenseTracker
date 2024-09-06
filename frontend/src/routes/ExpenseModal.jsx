import { Form,useNavigate,redirect } from "react-router-dom";
import { postExpenses } from "../data/expenseServices";
import styles from "../styles/modal.module.css";

export async function action({request,params}){
    console.log(request);
    switch(request.method){
        case "POST":{
            const formData = Object.fromEntries(await request.formData());
            formData.cost = parseFloat(formData.cost);
            postExpenses(formData);
            return redirect("/expenses");
        }
    }
}

export default function ExpenseModal(){
    const navigate = useNavigate();
    return(
        <>
            <div className={styles.modalDiv}>
                <div className={styles.modal}>
                    <div className={styles.closeBtn}>
                        <button onClick={()=>{navigate("/expenses");}}>Close</button>
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