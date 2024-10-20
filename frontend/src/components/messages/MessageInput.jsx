import { useState } from "react";
import { BsSend, BsPaperclip } from "react-icons/bs"; // Import the icon for file attachment
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null); // New state for handling file upload
  const { loading, sendMessage } = useSendMessage();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message && !file) return; // Ensure either a message or a file is sent
    await sendMessage({ message, file });
    setMessage("");
    setFile(null); // Reset file input after sending
  };

  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <input
          type="text"
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
          placeholder="Send a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        {/* File input for selecting files */}
        <input
          type="file"
          accept="audio/*,image/*,video/*,.pdf/*,mpeg/"
          id="file-upload"
          className="hidden"
          onChange={handleFileChange}
        />
        <label htmlFor="file-upload" className="absolute inset-y-0 end-12 flex items-center pe-3 cursor-pointer">
          <BsPaperclip size={18} /> {/* Icon for file attachment */}
        </label>

        <button type="submit" className="absolute inset-y-0 end-0 flex items-center pe-3">
          {loading ? <div className="loading loading-spinner"></div> : <BsSend />}
        </button>
      </div>

      {/* Display file name if a file is selected */}
      {file && <div className="mt-2 text-sm text-zinc-900 font-bold">{file.name}</div>}
    </form>
  );
};

export default MessageInput;
