import { useContext, useEffect, useState } from "react";
import styles from "../styles/expenses.module.css" ;
import {Link,useLocation, useLoaderData, Outlet, useNavigate, useActionData} from "react-router-dom";
import { getExpenses } from "../data/expenseServices";
import {FaEdit} from "react-icons/fa";
import DeleteExpense from "./DeleteExpense";
import { CalendarContext } from "./CalendarProvider";


import SharedCalendar from "./SharedCalendar";



export default function Expenses() {
    const{dateRange,setDateRange} = useContext(CalendarContext);
    const data  = useLoaderData();
    const expenseResult = useActionData();
    const [selected, setSelected] = useState(new Array(data.length).fill(false));
    const [expenses,setExpenses] = useState(data);
    const location = useLocation();
    const navigate = useNavigate();
    

    useEffect(()=>{
        if(expenseResult){
            navigate(`/expenses?startDate=${dateRange.startDate}&endDate=${dateRange.endDate}`)
        }
    },[expenseResult, dateRange, navigate]);
    const handleDateChange = (newDateRange) => {
        setDateRange(newDateRange);
        navigate(`/expenses?startDate=${newDateRange.startDate}&endDate=${newDateRange.endDate}`);
      };

      useEffect(() => {
        navigate(`/expenses?startDate=${dateRange.startDate}&endDate=${dateRange.endDate}`);
      }, [dateRange, navigate]);

    if (data == null) {
        return <div>Loading expenses</div>;
    }


    function handleCheckBox(event, index) {
        const isChecked = event.target.checked;
        const newSelected = [...selected];
        newSelected[index] = isChecked;
        setSelected(newSelected);
    }



    function handleDelete(index) {
        const deleteIndex = data.findIndex((d) => d.id === index);
        selected[deleteIndex] = false;
        selected.splice(deleteIndex,1);
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
                                        onDelete={handleDelete}
                                />
                                <Link 
                                to={`modal/${expense.id}`} 
                                state={{ background: location }} 
                                className={selected[index]?styles.editIcon:styles.hideIcon} 
                                onClick={()=>{selected[index] = false}}
                                >
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
            <SharedCalendar onChange={handleDateChange} value={dateRange}/>
    </div>
    );
}