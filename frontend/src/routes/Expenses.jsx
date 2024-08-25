import styles from "../styles/expenses.module.css" ;
import { Outlet } from "react-router-dom"

export default function Expenses(){
    return(
        <>
            <div>
                <h1>Expenses Page</h1>
                <Outlet/>
            </div>
        </>
    )
}