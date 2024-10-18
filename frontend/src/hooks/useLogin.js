import { useState } from "react";
import toast from "react-hot-toast";
import {useAuthContext} from "../context/AuthContext";
import useConversation from "../zustand/useConversation";
const useLogin = () => {
    const[loading,setLoading]=useState(false);
    const { setSelectedConversation } = useConversation();
    const {setAuthUser}=useAuthContext();
    const login=async(username,password)=>{
        const success= handleInputErrorss({username,password})
    if(!success)return;
        setLoading(true);
        try{
            const res=await fetch("/api/auth/login",{
                method:'POST',
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({username,password})
            })
            const data=await res.json();
            if(data.error){
                throw new Error(data.error)
            }
            localStorage.setItem("chat-user",JSON.stringify(data));
            setAuthUser(data);
            setSelectedConversation(null);
        }
        catch(error){
            toast.error(error.message);
        }
        finally{
            setLoading(false);
        };
    };
    return{loading,login};
};

export default useLogin;

function handleInputErrorss({username,password}){
    if(!username || !password){
        toast.error('Please fill all the fields');
        return false;
    }
    return true;
}