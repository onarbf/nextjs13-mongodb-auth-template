import { Axios, AxiosError, AxiosResponse } from "axios";
import toast from "react-hot-toast";


interface ErrorResponse {
    error?: string;
    // Otros campos que esperas en la respuesta
}

export default async function errorHandler(error: AxiosError  ){
    if(error.response?.status === 400 || error.response?.status === 500){
        const responseData = error.response.data as ErrorResponse
            if(responseData.error){
                toast.error(responseData.error)        
            }else{
                console.error(error)            
            }
    }else{
        console.error(error)
    }
    
}