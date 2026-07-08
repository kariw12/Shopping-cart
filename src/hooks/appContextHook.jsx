
import { useContext } from "react";

import { AppContext } from "../context/appContext"

export function useAppContext(){
    const context = useContext(AppContext);
    
    return context
}