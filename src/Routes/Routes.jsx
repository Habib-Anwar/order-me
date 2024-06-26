import {
    createBrowserRouter,
  } from "react-router-dom";
import { Main } from "../Layout/Main";
import { Home } from "../Pages/Home/Home/Home";
import { Order } from "../Pages/Order/Order";
import { InitialPage } from "../Pages/Home/Home/InitialPage";
import { AdminPage } from "../Pages/AdminPage/AdminPage";
import { ViewProductDetails } from "../Pages/ViewProductDetails/ViewProductDetails";




  export const router = createBrowserRouter([
    {
      path: "/",
      element: <InitialPage></InitialPage>

    },
    {
      path: "/viewDetails",
      element: <ViewProductDetails></ViewProductDetails>
    },

    {
     
      element: <Main></Main>,
      children: [
        {
            path: "/home",
            element: <Home></Home>
        },
        {
          path: "order",
          element: <Order></Order>
        },
        {
          path: "admin",
          element: <AdminPage></AdminPage>
        }
 
      ]
    },
  ]);