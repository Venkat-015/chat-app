import { useRef } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";
import { MdClose } from "react-icons/md";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser._id;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
  const bubbleBgColor = fromMe ? "bg-amber-50 text-black" : "bg-black text-white";
  const formattedTime = extractTime(message.createdAt);
  const shakeClass = message.shouldShake ? "shake" : "";

  const isFileAttached = message.fileUrl && message.fileType;
  const fileType = message.fileType?.split("/")[0];

  const modalRef = useRef(null);

  const openModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  const renderFileContent = () => {
    switch (fileType) {
      case "image":
        return (
          <div className="relative max-w-[250px] rounded-lg overflow-hidden">
            <img
              src={message.fileUrl}
              alt="Sent Image"
              className="w-full h-auto rounded-lg cursor-pointer"
              onClick={openModal}
            />

            <dialog ref={modalRef} className="modal w-full h-full flex items-center justify-center">
              <div className="modal-box p-0 max-w-full max-h-full flex flex-col items-center">
              <div className="relative">
                  <button className="absolute top-2 right-2  bg-red-600 p-1 bg-opacity-80 rounded-btn shadow-lg" onClick={() => modalRef.current.close()}>
                    <MdClose size={28} color="black"  />
                  </button>
                <img
                  src={message.fileUrl}
                  alt="Sent Image"
                  className="w-full h-full rounded-lg object-contain"
                />
                
                </div>
              </div>
            </dialog>
          </div>
        );

      case "video":
        return (
          <video controls playsInline className="max-w-[250px] rounded-lg">
            <source src={message.fileUrl} type={message.fileType} />
            Your browser does not support the video tag.
          </video>
        );

      case "audio":
        return (
          <div className="relative w-full flex items-center gap-2">
            <audio controls src={message.fileUrl} className="w-full audio-animation bg-opacity-90" />
          </div>
        );

      
        case "application":
          if (message.fileType === 'application/pdf' || message.fileType === 'application/x-pdf'||
            message.fileType === 'application/msword' || 
            message.fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || 
            message.fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
          const fileUrl = message.fileUrl.includes("cloudinary") 
            ? `${message.fileUrl}?fl_attachment=false` 
            : message.fileUrl;

          return (
            <div className="flex flex-col items-center">
              <iframe src={`https://docs.google.com/gview?url=${fileUrl}&embedded=true`} 
                className="w-full h-full border rounded-lg"></iframe>
              <div className="flex gap-2 mt-2">
                <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-primary bg-black">
                  Download
                </a>
              </div>
            </div>
          );
        }
        return (
          <a href={message.fileUrl} download={message.fileName || "File"} 
            className="text-blue-700 underline">
            Download {message.fileName || "File"}
          </a>
        );
      default:
        return <p>Unsupported File Type</p>;
    }
  };

  return (
    <div className={`chat ${chatClassName} mb-2 gap-2`}>
      <div className="chat-image avatar">
        <div className="w-8 h-8 rounded-full overflow-hidden">
          <img src={profilePic} alt="User Profile" className="w-full h-full object-cover" />
        </div>
      </div>
      <div className={`chat-bubble ${bubbleBgColor} ${shakeClass} relative max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg p-2 bg-opacity-70`}>        
        {message.message && <p>{message.message}</p>}
        {isFileAttached && <div className="mt-2 flex flex-wrap gap-2">{renderFileContent()}</div>}
      </div>
      <div className="chat-footer opacity-90 text-xs flex gap-1 items-center text-cyan-50">
        {formattedTime}
      </div>
    </div>
  );
};

export default Message;

