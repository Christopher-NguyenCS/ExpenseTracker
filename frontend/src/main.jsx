import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Root from './routes/Root.jsx'

import{
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from './error-page.jsx';
import HomePage from './routes/HomePage.jsx';

import Expenses from './routes/Expenses.jsx';
import ListExpenses from './routes/ListExpenses.jsx';
import Dashboard from './routes/Dashboard.jsx';


const router = createBrowserRouter([
  {
    path:"/",
    element: <Root/>,
    errorElement: <ErrorPage/>,
    children:[
      {
        path:"/",
        element:<Dashboard/>
      },
      {
        path:"expenses",
        element:<Expenses/>,
        children:[
          {
            path:":id",
            element:<ListExpenses/>
          }
        ],
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
