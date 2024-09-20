import { useEffect, useState } from "react";
import styles from "../styles/expenses.module.css" ;
import {Link,useLocation, useLoaderData, Outlet, useActionData,Form } from "react-router-dom";
import { getExpenses ,deleteExpenses,postExpenses,updateExpenses } from "../data/expenseServices";
import { format } from "date-fns";
import {FaTrashCan} from "react-icons/fa6";
import {FaEdit} from "react-icons/fa";
import DeleteExpense from "./DeleteExpense";



export async function loader() {
    const data = await getExpenses();
    return data ;
}

export default function Expenses() {
    const data  = useLoaderData();
    const actionData = useActionData();
    const [selected, setSelected] = useState(new Array(data.length).fill(false));
    const [turnOnDeleteAll, setTurnOnDeleteAll] = useState(false);
    const [expenses,setExpenses] = useState(data);
    const location = useLocation();
    const background = location.state && location.state.background;

    if (data == null) {
        return <div>Loading expenses</div>;
    }

    // Update expenses state when loader data changes
    useEffect(() => {
        setExpenses(data);
        

    }, [data, setExpenses]);
    useEffect(()=>{
        if(actionData){
            setExpenses(actionData);
            setTurnOnDeleteAll(false);
        }
    },[actionData,setExpenses])

    function handleMultipleCheckbox(event) {
        const isChecked = event.target.checked;
        const item = selected.map(() => isChecked);
        if(isChecked){
            setTurnOnDeleteAll(true);
        }
        else{
            setTurnOnDeleteAll(false);
        }
        setSelected(item);
    }

    function handleCheckBox(event, index) {
        const isChecked = event.target.checked;
        const newSelected = [...selected];
        newSelected[index] = isChecked;
        if(newSelected.filter(n=>n).length>1){
            setTurnOnDeleteAll(true);
        }
        else{
            setTurnOnDeleteAll(false);
        }
        setSelected(newSelected);
    }

    // async function handleDeleteAll(event) {
    //      const deleteList = [];
    //      selectedInput.forEach((select, index) => {
    //      if (select) {
    //          deleteList.push({"id":data[index].id});
    //      }
    //      });
    //      await deleteExpenses(deleteList);
    //      const updatedExpenses = await getExpenses();
    //      setExpenses(updatedExpenses);
    //      const newSelected = selectedInput.filter(s=>s != true)
    //     // setSelected(newSelected);
    //     event.preventDefault();
    //     setTurnOnDeleteAll(true);

    // }

    async function handleDelete(index) {
        selected.splice(index,1);
        setSelected(selected);
    }



    return (
        <div className={styles.container}>
            <header className={styles.header1}>
                <h1>Expense Transaction</h1>
                <Link to="modal" state={{ background: location }} className={styles.addBtn}>
                    <button type="button">Add Expense</button>
                </Link>
                <Outlet context={[expenses,setExpenses]}/>
            </header>
            <table className={styles.tableContainer}>
                <thead>
                    <tr className={styles.header2}>
                        <th>
                            {/* <input
                                type="checkbox"
                                name="selectAll"
                                onChange={handleMultipleCheckbox}
                            />
                            {turnOnDeleteAll && (
                                <div onClick={(event)=>{handleDeleteAll(event)}}>
                                {/* <FaTrashCan /> /*}
                                <DeleteExpense
                                    expenseSet={expenses.filter((_, index) => selected[index])}
                                    selected={selected}
                                />
                                </div>
                            )} */}
                        </th>
                        <th>Date</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses ? data.map((expense, index) => (
                        <tr key={expense.id}>
                            <td>
                                <input
                                type="checkbox"
                                name={expense?.title}
                                id={index.toString()}
                                checked={selected[index]}
                                onChange={e => handleCheckBox(e, index)}
                                />
                                <DeleteExpense 
                                        expenseSet={expense}
                                        selected={selected[index]}
                                />
                            <Link to={`modal/${expense.id}`} state={{ background: location }} className={selected[index]?styles.editIcon:styles.hideIcon} onClick={(event)=>{selected[index] = false}}>
                                <FaEdit />
                            </Link>
                            </td>
                            <td>{expense.date}</td>
                            <td>{expense.title}</td>
                            <td>{expense.category}</td>
                            <td>$ {expense.cost.toFixed(2)}</td>
                        </tr>
                    )):<div>Loading expenses</div>}
                </tbody>
            </table>
    </div>
    );
}