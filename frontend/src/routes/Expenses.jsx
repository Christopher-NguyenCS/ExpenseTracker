import { useState } from "react";
import styles from "../styles/expenses.module.css" ;
import {Link,useLocation, useLoaderData, Outlet } from "react-router-dom";
import { getExpenses,deleteExpenses } from "../data/expenseServices";
import { format } from "date-fns";
import {FaTrashCan} from "react-icons/fa6";
import {FaEdit} from "react-icons/fa";


export async function loader(){
    const data = await getExpenses();
    return {data};
}

export default function Expenses() {
    const { data } = useLoaderData();
    const [selected, setSelected] = useState(new Array(data.length).fill(false));
    const location = useLocation();
    const background = location.state && location.state.background;

    if (data == null) {
        return <div>Loading expenses</div>;
    }

    function handleMultipleCheckbox(event) {
        const isChecked = event.target.checked;
        const item = selected.map(() => isChecked);
        setSelected(item);
    }

    function handleCheckBox(event, index) {
        const isChecked = event.target.checked;
        const newSelected = [...selected];
        newSelected[index] = isChecked;
        setSelected(newSelected);
    }

    async function handleDeleteAll(selectedInput) {
        const deleteList = [];
        selectedInput.forEach((select, index) => {
        if (select) {
            deleteList.push(data[index]);
        }
        });
        await deleteExpenses(deleteList);
        setSelected(new Array(data.length).fill(false));
    }

    async function handleDelete(input) {
        await deleteExpenses(input);
        setSelected(prevSelected => prevSelected.map(() => false));
    }

    return (
        <div className={styles.container}>
            <header className={styles.header1}>
                <h1>Expense Transaction</h1>
                <Link to="modal" state={{ background: location }} className={styles.addBtn}>
                    <button type="button">Add Expense</button>
                </Link>
                <Outlet />
            </header>
            <table className={styles.tableContainer}>
                <thead>
                    <tr className={styles.header2}>
                        <th>
                            <input
                                type="checkbox"
                                name="selectAll"
                                onChange={handleMultipleCheckbox}
                            />
                            {selected.filter(select => select).length > 1 && (
                            <FaTrashCan onClick={() => handleDeleteAll(selected)} />)}
                        </th>
                        <th>Date</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((value, index) => (
                        <tr key={index}>
                            <td>
                                <input
                                type="checkbox"
                                name={value.title}
                                id={index.toString()}
                                checked={selected[index]}
                                onChange={e => handleCheckBox(e, index)}
                                />    
                            <FaTrashCan
                                className={selected[index] ? styles.deleteIcon : styles.hideIcon}
                                onClick={() => handleDelete([value])}
                            />
                            <Link to={`modal/${value.id}`} state={{ background: location }} className={selected[index]?styles.editIcon:styles.hideIcon}>
                                <FaEdit />
                            </Link>
                            </td>
                            <td>{value.date}</td>
                            <td>{value.title}</td>
                            <td>{value.category}</td>
                            <td>$ {value.cost.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
    </div>
    );
}