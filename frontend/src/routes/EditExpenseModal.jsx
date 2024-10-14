import { Form,useNavigate,useParams,useLoaderData, useLocation } from "react-router-dom";
import styles from "../styles/modal.module.css";
import {IoCloseOutline} from "react-icons/io5";
import { format,parse } from "date-fns";
import { useState,useEffect,useContext } from "react";
import { getExpense } from "../data/expenseServices";
import { CalendarContext } from "./CalendarProvider";

async function findData(id){ 
    const response = await getExpense(id);
    return response.json();
}

export default function EditExpenseModal({location}){
    const navigate = useNavigate();
    // const history = useHistory();
    const {dateRange} = useContext(CalendarContext);
    const [mainData, setMainData] = useState(null);
    const {id} = useParams();
    const [title,setTitle] = useState(null);

    
    useEffect(()=>{
        let isMounted = true;
        const getData = async(id)=>{
            try {
                const data = await findData(id);
                if(isMounted){
                    setMainData(data);
                    setTitle(data.title);                
                }
            } catch (error) {
                console.error('Error fetching specific expense you wanted to edit: ', error);
            }
        }
        getData(id);
        return()=>{
            isMounted=false;
        };
    },[id])

    const handleClose = () =>{
        navigate(`/expenses/?startDate=${dateRange.startDate}&endDate=${dateRange.endDate}`);
    }

    const handleChange = (event) =>{
        setTitle(event.target.value);
    }


    if(!mainData){
        return <div>does not exist, the id ......</div>
    }

    return(
        <>
            <div className={styles.modalDiv} onClick={()=>{handleClose()}}>
                <div className={styles.modal} onClick={(e)=>{e.stopPropagation()}}>
                    <h1>{title}</h1>
                    <div className={styles.closeBtnContainer}>
                        <button className={styles.closeBtnOutline} onClick={()=>{handleClose()}}><IoCloseOutline className={styles.closeBtn} onClick={()=>{handleClose()}}/></button>
                    </div>
                    <Form method="put" className={styles.formContainer} >
                        <div className={styles.formGroup}>
                            <label htmlFor="title">Title:</label>
                            <input 
                                type="text" 
                                name="title" 
                                defaultValue={mainData.title} 
                                required
                                onChange={handleChange}
                                
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="cost">Cost:</label>
                            <input 
                                type="number" 
                                name="cost" 
                                defaultValue={mainData.cost} 
                                step=".01"
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="Category">Category:</label>
                            <input 
                                type="text" 
                                name="category" 
                                defaultValue={mainData.category}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="date">Date:</label>
                            <input 
                                type="date" 
                                name="date" 
                                defaultValue={format((mainData.date),"yyyy-MM-dd")}
                                required 
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="time">Time:</label>
                            <input 
                                type="time" 
                                name="time" 
                                defaultValue={format(parse(mainData.time,"hh:mm a",new Date()),"HH:mm")}
                            />
                        </div>
                        <div className={styles.formDescription}>
                            <label htmlFor="description">Description:</label>
                            <textarea 
                                name="description" id="description" 
                                defaultValue={mainData.description}>
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