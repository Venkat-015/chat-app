import Conversations from "./Conversations.jsx";
import LogoutButton from "./LogoutButton.jsx";
import SearchInput from "./SearchInput.jsx";

const Sidebar = () => {
  return (
    <div className="border-r border-green-600 p-4 flex flex-col">
        <SearchInput/>
        <div className="divider px-3 h-0.5 bg-gray-200"></div>
        <Conversations/>
        <LogoutButton/>
    </div>
  )
}

export default Sidebar;