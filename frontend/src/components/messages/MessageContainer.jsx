import MessageInput from "./MessageInput";
import useConversation from "../../zustand/useConversation";
import Messages from "./Messages";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { BsArrowLeft } from "react-icons/bs";
import useLogout from "../../hooks/useLogout";
const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { authUser } = useAuthContext();

  // Track mobile screen status
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Track if the user logged out (conversation should reset on logout)
  const [prevAuthUser, setPrevAuthUser] = useState(authUser);

  // Handle window resize to update mobile state
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Clear conversation when the user logs out or changes accounts
  useEffect(() => {
    if (authUser !== prevAuthUser) {
      setSelectedConversation(null);
      setPrevAuthUser(authUser);
    }
  }, [authUser, prevAuthUser, setSelectedConversation]);

  // Mobile back button handler
  const handleMobileBackClick = () => {
    setSelectedConversation(null); // Reset conversation for mobile back
  };
  
  const handleLogout = () => {
    // Clear all persistent states
    localStorage.clear();
    sessionStorage.clear();
    
    // Add any other cleanup logic
    setSelectedConversation(null);
  };
  


  return (
    <div key={authUser?.id}className={`flex flex-col h-full w-full ${isMobile ? "overflow-y-auto" : "md:min-w-[450px]"}`}>
      {selectedConversation ? (
        <>
          <div className="bg-slate-500 px-4 py-2 mb-2 flex justify-between items-center">
            {/* Left-aligned "To: {conversation name}" */}
            <div className="flex items-center">
              <span className="label-text text-slate-50 mr-2">To:</span>{" "}
              <span className="text-gray-900 font-bold">{selectedConversation.fullName}</span>
            </div>

            {/* Right-aligned Back button for mobile */}
            {isMobile && (
              <button 
                onClick={handleMobileBackClick}  // Mobile back navigation
                className="text-zinc-900"
              >
                <BsArrowLeft className="text-3xl" style={{ textShadow: "0 0 2px rgba(255, 255, 255, 0.8)" }} />
              </button>
            )}
          </div>
          <Messages />
          <MessageInput />
        </>
      ) : (
        <NoChatSelected />
      )}
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {authUser.fullName} 🙂‍↔️</p>
        <p>Select a chat to start messaging</p>
      </div>
    </div>
  );
};

