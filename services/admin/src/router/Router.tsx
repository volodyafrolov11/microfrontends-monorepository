import {createBrowserRouter} from "react-router-dom";
import {App} from "@/App";
import {Suspense} from "react";
import {Admin} from "@/pages/Admin";

const routes = [
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: '/admin',
                element: <Suspense fallback={'Loading'}><Admin/></Suspense>
            }
        ]
    }
]

export const router = createBrowserRouter(routes);

export default routes;