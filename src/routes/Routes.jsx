import { createBrowserRouter } from "react-router";
import Root from "../layouts/Root";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import PublicRoute from "./PublicRoute";

const router = createBrowserRouter([

    {
        path: "/",
        element: <Root></Root>,
        children: [
            {
                index: true,
                element: <Home></Home>
            },
            {
                path: "/register",
                element: <PublicRoute><Register></Register></PublicRoute>
            },
            {
                path: "/login",
                element: <PublicRoute><Login></Login></PublicRoute>
            }
        ]
    }

])

export default router;