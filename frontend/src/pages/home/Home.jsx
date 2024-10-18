import MessageContainer from "../../components/messages/MessageContainer.jsx";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import { useState, useEffect } from "react";
import useConversation from "../../zustand/useConversation";

const Home = () => {
  const { selectedConversation } = useConversation();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust this breakpoint as needed
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check for screen size

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={`flex h-full w-full ${isMobile ? "flex-col" : "flex-row"} overflow-hidden`}>
      {/* Mobile View - Show either Sidebar or MessageContainer */}
      {isMobile ? (
        selectedConversation ? (
          <MessageContainer />
        ) : (
          <Sidebar />
        )
      ) : (
        // Desktop View - Side by Side
        <>
          <Sidebar />
          <MessageContainer />
        </>
      )}
    </div>
  );
};

export default Home;
