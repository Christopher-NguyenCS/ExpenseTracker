import { useContext, useEffect, useState } from "react";
import styles from "../styles/expenses.module.css" ;
import {Link,useLocation, useLoaderData, Outlet, useActionData, useNavigate,} from "react-router-dom";
import { getExpenses } from "../data/expenseServices";
import {FaEdit} from "react-icons/fa";
import DeleteExpense from "./DeleteExpense";
import { CalendarContext } from "./CalendarProvider";

//remove if it does not work
import { format } from "date-fns";
import SharedCalendar from "./SharedCalendar";


// export async function loader({request,params}) {
//     console.log("Params",params);
//     console.log("Request url:",request.url);
//     const data = await getExpenses();
//     return data ;
// }


//remove if it does not work
export const loader = async ({ request }) => {
    const url = new URL(request.url);
    const startDate = url.searchParams.get('startDate') || new Date().toISOString().split('T')[0];
    const endDate = url.searchParams.get('endDate') || new Date().toISOString().split('T')[0];
    const date = [startDate , endDate]
    const response = await getExpenses(date);
    const data = await response.json();
    return data;
};

export default function Expenses() {
    //remove if not work
    const{dateRange,setDateRange} = useContext(CalendarContext);
    const data  = useLoaderData();
    const actionData = useActionData();
    const [selected, setSelected] = useState(new Array(data.length).fill(false));
    // const [turnOnDeleteAll, setTurnOnDeleteAll] = useState(false);
    const [expenses,setExpenses] = useState(data);
    const location = useLocation();
    const navigate = useNavigate();
    
    
    // useEffect(() => {
    //     if(data){
    //         setExpenses(data);
    //     }
    // }, [data, setExpenses]);

    // useEffect(()=>{
    //     if(actionData){
    //         setExpenses(actionData);
    //         // setTurnOnDeleteAll(false);
    //     }
    // },[actionData,setExpenses])

    //remove
    const handleDateChange = (newDateRange) => {
        setDateRange(newDateRange);
        navigate(`/expenses?startDate=${newDateRange.startDate}&endDate=${newDateRange.endDate}`);
      };


    //remove
      useEffect(() => {
        navigate(`/expenses?startDate=${dateRange.startDate}&endDate=${dateRange.endDate}`);
      }, [dateRange, navigate]);

    if (data == null) {
        return <div>Loading expenses</div>;
    }

    // Update expenses state when loader data changes

    // function handleMultipleCheckbox(event) {
    //     const isChecked = event.target.checked;
    //     const item = selected.map(() => isChecked);
    //     if(isChecked){
    //         setTurnOnDeleteAll(true);
    //     }
    //     else{
    //         setTurnOnDeleteAll(false);
    //     }
    //     setSelected(item);
    // }

    function handleCheckBox(event, index) {
        const isChecked = event.target.checked;
        const newSelected = [...selected];
        newSelected[index] = isChecked;
        // if(newSelected.filter(n=>n).length>1){
        //     setTurnOnDeleteAll(true);
        // }
        // else{
        //     setTurnOnDeleteAll(false);
        // }
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

    function handleDelete(index) {
        const deleteIndex = data.map((d,i) => {
            if(d.id == index){
                return i;
            }
        });
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