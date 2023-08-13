"use client"
import errorHandler from "@/helpers/errorHandler";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react"
export const SessionContext = createContext({} as any);

export const useSession = ()=>{
    const context = useContext(SessionContext)
    if(!context) throw new Error('not inside any context provider')

    return context
}

export const SessionProvider = ({children}: {children: any})=>{
    const [session, setSession] = useState({})
    const removeSession = ()=>{
        setSession({})
    }
    const createSession = async()=>{
        try {
            const {data} = await axios.get('/api/users/verifyToken')
            if(data) setSession({...data})   

        } catch (error: any) {
            await errorHandler(error)
        }
            
        }
    useEffect(()=>{
        createSession()
    },[])

    return <SessionContext.Provider value={{session, removeSession, createSession}}>
        {children}
    </SessionContext.Provider>
}