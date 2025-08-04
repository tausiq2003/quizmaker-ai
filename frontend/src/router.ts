import { createBrowserRouter } from "react-router";
import App from "./App";
import Login from "./components/login";
import Register from "./components/register";
const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
    },
    {
        path: "/login",
        Component: Login,
    },
    {
        path: "/register",
        Component: Register,
    },
]);
export default router;
