import { Form,useNavigate,useParams,useLoaderData } from "react-router-dom";
import styles from "../styles/modal.module.css";
import {IoCloseOutline} from "react-icons/io5";
import { format,parse } from "date-fns";


function findData(lists,id){ 
    return lists.find(list => list.id == id)
}

export default function EditExpenseModal({location}){
    const navigate = useNavigate();
    const {data} = useLoaderData();
    const {id} = useParams();
    const mainData = findData(data,id);
    // console.log("Got id from expenses when it goes to the edit link",id);
    console.log(mainData);

    const handleClose = () =>{
        navigate("/expenses");
    }

    return(
        <>
            <div className={styles.modalDiv} onClick={()=>{handleClose()}}>
                <div className={styles.modal} onClick={(e)=>{e.stopPropagation()}}>
                    <h1>{mainData.title}</h1>
                    <div className={styles.closeBtnContainer}>
                        <button className={styles.closeBtnOutline} onClick={()=>{handleClose()}}><IoCloseOutline className={styles.closeBtn} onClick={()=>{handleClose()}}/></button>
                    </div>
                    <Form method="put" className={styles.formContainer}>
                        <div className={styles.formGroup}>
                            <label htmlFor="title">Title:</label>
                            <input 
                                type="text" 
                                name="title" 
                                defaultValue={mainData.title} 
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="cost">Cost:</label>
                            <input 
                                type="number" 
                                name="cost" 
                                value={mainData.cost} 
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="Category">Category:</label>
                            <input 
                                type="text" 
                                name="category" 
                                value={mainData.category}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="date">Date:</label>
                            <input 
                                type="date" 
                                name="date" 
                                value={format((mainData.date),"yyyy-MM-dd")}
                                required 
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="time">Time:</label>
                            <input 
                                type="time" 
                                name="time" 
                                value={format(parse(mainData.time,"hh:mm a",new Date()),"HH:mm")}
                            />
                        </div>
                        <div className={styles.formDescription}>
                            <label htmlFor="description">Description:</label>
                            <textarea 
                                name="description" id="description" 
                                value={mainData.description}>
                            </textarea>
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