import { useContext, useEffect, useState, useMemo,useRef } from "react";
import styles from "../styles/expenses.module.css";
import { Link, useLocation, useLoaderData, Outlet, useNavigate, useNavigation,  } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import DeleteExpense from "./DeleteExpense";
import { CalendarContext } from "./CalendarProvider";
import ExpenseLoading from "./ExpenseLoading";
import SharedCalendar from "./SharedCalendar";
import { getExpenses } from "../data/expenseServices";
import Pagination from "./Pagination";
export default function Expenses() {
    const { dateRange, setDateRange } = useContext(CalendarContext);
    const data = useLoaderData();

    const [selected, setSelected] = useState(new Array(data.length).fill(false)); // Ensure this is always a boolean array
    const [expenses, setExpenses] = useState(data); // State for the fetched expenses
    const [loading, setLoading] = useState(false);
    const [selectAll, setSelectAll] = useState(false);
    const [currentPage,setCurrentPage] = useState(1);
    const expensesPerPage = 10;
    const location = useLocation();
    const navigate = useNavigate(); 
    const prevPage = useRef(currentPage);


    const handleDateChange = (newDateRange) => {

        const startDate = new Date(newDateRange.startDate);
        const endDate = new Date(newDateRange.endDate);
        const formattedDateRange = {
            startDate: startDate.toUTCString(),
            endDate: endDate.toUTCString(),
        };
        setDateRange(formattedDateRange);
        navigate(`/expenses?startDate=${formattedDateRange.startDate}&endDate=${formattedDateRange.endDate}`);
    };
    
    const expenseDataTable = useMemo(()=>{
        const firstPageIndex = (currentPage - 1) * expensesPerPage;
        const lastPageIndex = firstPageIndex + expensesPerPage;
        return expenses.slice(firstPageIndex,lastPageIndex);

    },[currentPage,expenses]);

    useEffect(()=>{
        if(prevPage != currentPage){
            setSelected(new Array(expenseDataTable.length).fill(false));
            setSelectAll(false);
            prevPage.current = currentPage;
        }
    },[currentPage]);

    useEffect(() => {
        const fetchExpenses = async () => {
            if (dateRange.startDate && dateRange.endDate) {
                setLoading(true);
                try {
                    const response = await getExpenses([dateRange.startDate, dateRange.endDate]);
                    const newExpenses = await response.json();
                    setExpenses(newExpenses);
                    setSelected(new Array(newExpenses.length).fill(false)); 
                } catch (error) {
                    console.error("Error fetching expenses:", error);
                } finally {
                    setLoading(false);
                }
            } else {
                console.log("dateRange is undefined:", dateRange);
            }
        };
        fetchExpenses();
    }, [dateRange,data]);

    const handleMultipleCheckBox = (event) =>{
        const isChecked = event.target.checked;
        const item = selected.map(() => isChecked);
        setSelected(item);
        setSelectAll(isChecked);
    }
    const handleDeleteAll = () =>{
        setSelected(prevSelected =>
            prevSelected.filter(p => p ==false)
        );

    }

    const handleCheckBox = (event, index) => {
        const isChecked = event.target.checked;
        setSelected(prevSelected => {
            const newSelected = [...prevSelected];
            newSelected[index] = isChecked;
            return newSelected;
        });
    };

    function handleDelete(index) {
        const deleteIndex = expenses.findIndex((d) => d.id === index);
        setSelected(prevSelected => {
            const newSelected = [...prevSelected];
            newSelected.splice(deleteIndex, 1);
            return newSelected;
        });
    }

    return (
        <>
            {loading ? <ExpenseLoading /> : (
                <div className={styles.container}>
                    <section className={styles.expensesList}>

                        <header className={styles.header1}>
                            <h1>Expense Transaction</h1>
                            <Link to={`/expenses/modal/?startDate=${dateRange.startDate}&endDate=${dateRange.endDate}`} state={{ background: location }} className={styles.addBtn}>
                                <button type="button">Add Expense</button>
                            </Link>
                            <Outlet context={[expenses, setExpenses]} />
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
                                {expenseDataTable.map((expense, index) => (
                                    <tr key={expense.id}>
                                        <td>
                

                                            
                                            <input
                                                type="checkbox"
                                                name={expense?.title}
                                                id={index.toString()}
                                                checked={selected[index] || false} 
                                                onChange={e => handleCheckBox(e, index)}
                                            />
                                            <DeleteExpense
                                                expenseSet={expense}
                                                selected={selected[index]}
                                                onDelete={handleDelete}
                                            />

                                            <Link
                                                to={`/expenses/modal/${expense.id}/?startDate=${dateRange.startDate}&endDate=${dateRange.endDate}`}
                                                state={{ background: location, data: { expense } }}
                                                className={selected[index] ? styles.editIcon : styles.hideIcon}
                                                onClick={() => { selected[index] = false }}
                                            >
                                                <FaEdit />
                                            </Link>
                                        </td>
                                        <td>{expense.date}</td>
                                        <td>{expense.title}</td>
                                        <td>{expense.category}</td>
                                        <td>$ {expense.cost.toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Pagination
                            currentPage={currentPage}
                            totalCount={expenses.length}
                            pageSize={expensesPerPage}
                            onPageChange={page=>setCurrentPage(page)}
                        />
                    </section>
                    <section className={styles.calendarSection}>
                        <SharedCalendar onChange={handleDateChange} value={dateRange} />
                    </section>
                </div>
            )}
        </>
    );
}
