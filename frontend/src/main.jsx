import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Root from './routes/Root.jsx'

import{
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import ErrorPage from './error-page.jsx';
import Expenses, {loader as expenseLoader} from './routes/Expenses.jsx';
import ExpenseModal, {action as modalAction} from './routes/ExpenseModal.jsx';
import Dashboard from './routes/Dashboard.jsx';
import { CalendarProvider } from './routes/CalendarProvider.jsx';



const router = createBrowserRouter([
  {
    path:"/",
    element: <Root/>,
    errorElement: <ErrorPage/>,
    loader:expenseLoader,
    children:[
      {
        path:"/",
        element:<Dashboard/>
        
      },
      {
        path:"expenses",
        element:<Expenses/>,
        loader: expenseLoader,
        action:modalAction,
        children:[
          {
            path:"modal",
            element:<ExpenseModal/>,
            action:modalAction,
          },
          {
            path:"modal/:id",
            element:<ExpenseModal/>,
            action:modalAction,
            loader:expenseLoader,
          }
        ],
      },

    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CalendarProvider>
      <RouterProvider router={router}/>
    </CalendarProvider>
  </StrictMode>,
)
