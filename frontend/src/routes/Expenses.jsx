import { useState } from "react";
import styles from "../styles/expenses.module.css" ;
import {Link,useLocation, useLoaderData, Outlet } from "react-router-dom";
import { getExpenses } from "../data/expenseServices";

export async function loader(){
    const data = await getExpenses();
    return {data};
}

export default function Expenses(){
    const {data} = useLoaderData();
    const [selected, setSelected] = useState(new Array(data.length).fill(false));
    const location = useLocation();
    const background = location.state && location.state.background;

    if(data == null){
        <div>Loading expenses</div>
    }

    function handleMultipleCheckbox(event){
        const isChecked = event.target.checked;
        const item = selected.map(()=> isChecked);
        setSelected(item);
    }

    function handleCheckBox(event,index){
        const isChecked = event.target.checked;
        if(isChecked == true){
            const newSelected = [...selected];
            newSelected[index] = true;
            setSelected(newSelected);
        }else{
            const newSelected = [...selected];
            newSelected[index] = false;
            setSelected(newSelected);
        }
    }
    return(
        <>
            <div className={styles.container}>
                    <header className={styles.header1}>
                        <h1>Expense Transaction</h1>
                        <Link to="modal" state={{background:location}}>
                            <button type="button">Add Expense</button>
                        </Link>
                        <Outlet/>
                    </header>
                    <div>

                    </div>
                    <table className={styles.tableContainer}>
                        <tbody>
                            <tr className={styles.header2}>
                                <th><input 
                                        type="checkbox" 
                                        name="selectAll"
                                    
                                        onChange={(e) => {handleMultipleCheckbox(e)}} 
                                    />
                                </th>
                                <th>Date</th>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Total</th>
                            </tr>
                        </tbody>
                        <tbody>
                            {data && data.map((value,index)=>{
                                return (
                                    <tr key={index}>
                                        <td>
                                            <input 
                                                type="checkbox" 
                                                name={value.title} 
                                                id={index} 
                                                checked={selected[index]} 
                                                onChange={(e)=>handleCheckBox(e,index)}
                                            />
                                        </td>
                                        <td>{value.date}</td>
                                        <td>{value.title}</td>
                                        <td>{value.category}</td>
                                        <td>$ {value.cost.toFixed(2)}</td>
                                    </tr>
                                )
                            })}

                        </tbody>
                    </table>
            </div>
        </>
    )
}