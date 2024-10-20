import { useState } from "react"
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
const useSendMessage = () => {
  const[loading,setLoading]=useState(false);
  const{messages,setMessages,selectedConversation} = useConversation();
  const sendMessage=async({message,file})=>{
    setLoading(true);
    try{
      const formData=new FormData();
     // formData.append("message",message);
     if (message) formData.append("message", message); // Append message
     // if (file) formData.append("file", file);
      if(file){
        formData.append("file",file);
      }
        const res=await fetch(`/api/messages/send/${selectedConversation._id}`,{
            method:'POST',
            body:formData,
          });
        const data=await res.json();
        if(data.error) throw new Error(data.error);
        setMessages([...messages,data]);
    }
    catch(error){
       toast.error(error.message);
    }
    finally{
        setLoading(false);
    };

  };
  return{sendMessage,loading}
};

export default useSendMessage;