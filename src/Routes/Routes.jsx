import {
    createBrowserRouter,
  } from "react-router-dom";
import { Main } from "../Layout/Main";
import { Home } from "../Pages/Home/Home/Home";
import { Order } from "../Pages/Order/Order";

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path: "/",
            element: <Home></Home>
        },
        {
          path: "order",
          element: <Order></Order>
        }
      ]
    },
  ]);