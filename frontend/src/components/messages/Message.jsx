import { useRef } from "react";
import {useAuthContext} from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";
const Message = ({message}) => {
  const {authUser}= useAuthContext();
  const{selectedConversation}=useConversation();
  const fromMe=message.senderId===authUser._id;
  const chatClassName=fromMe?'chat-end':'chat-start';
  const profilePic=fromMe?authUser.profilePic:selectedConversation?.profilePic;
  const bubbleBgColor=fromMe?'bg-blue-700':" bg-zinc-950";
  const formattedTime=extractTime(message.createdAt);
  const shakeClass=message.shouldShake?"shake":"";

 // Check if a file is attached
 const isFileAttached = message.fileUrl && message.fileType;

 // Function to render media based on file type
 const renderFileContent = () => {
   const fileType = message.fileType.split('/')[0]; // e.g., "image", "video", "application"

   switch (fileType) {
     case 'image':
      const modalRef = useRef(null);

      const openModal = () => {
        if (modalRef.current) {
          modalRef.current.showModal();
        }
      };
      return (
        <div className="relative max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
          <img src={message.fileUrl} alt={message.fileName} className="max-w-full h-auto rounded-lg cursor-pointer" onClick={openModal}/>
          
          <dialog ref={modalRef} className="modal">
            <form method="dialog" className="modal-box p-0">
              <img src={message.fileUrl} alt={message.fileName} className="max-w-full max-h-full rounded-lg" />
              <div className="modal-action">
                <button className="btn">Close</button>
              </div>
            </form>
          </dialog>
        </div>
      );
     case 'video':
       return (
         <video controls className="max-w-full h-auto rounded-lg">
           <source src={message.fileUrl} type={message.fileType} />
           Your browser does not support the video tag.
         </video>
       );
     case 'audio':
       return <audio controls src={message.fileUrl} className="w-full" />;
       case 'application':
        // Handle different application types
        if (message.fileType === 'application/pdf' || message.fileType === 'application/x-pdf'||
            message.fileType === 'application/msword' || 
            message.fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || 
            message.fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
          return (
            <a href={message.fileUrl} download={message.fileName || "document.pdf"} className="text-blue-400 underline">
              Download {message.fileName || "File"}
            </a>
          );
        }
        // Add additional file type checks if needed
     /*   return (
          <a href={message.fileUrl} download className="text-blue-400 underline">
            Download {message.fileName || "File"}
          </a>
        );*/
    default:
      return <p>Unsupported File Type</p>;
  }
};

  return (
    <div className={`chat ${chatClassName}`}>
     <div className="chat-image avatar ">
        <div className="w-10 rounded-full">
            <img src={profilePic}
            alt="Tailwind CSS chat bubble component"/>
        </div>

     </div>
     <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>
     {message.message && <p>{message.message}</p>}
      {isFileAttached && <div className="mt-2">{renderFileContent()}</div>}
      
     </div>
     <div className="chat-footer opacity-90 text-xs flex-gap-1 items-center text-cyan-50">{formattedTime}</div>
    </div>
  )
};

export default Message;