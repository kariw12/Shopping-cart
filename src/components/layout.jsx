
import { Outlet, Navigate } from "react-router-dom";

import Navbar from "./navigationMenu";


function Layout(){

    

    return(
        <>
            <Navbar />
            <Outlet />
        </>
    )
}

export default Layout