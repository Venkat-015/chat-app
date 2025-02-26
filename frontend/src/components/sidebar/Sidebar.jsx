import Conversations from "./Conversations.jsx";
import LogoutButton from "./LogoutButton.jsx";
import SearchInput from "./SearchInput.jsx";

const Sidebar = () => {
  return (
    <div className="border-r border-yellow-100 p-4 flex flex-col h-full w-full sm:w-[250px] md:w-[450px]">
      <SearchInput />
      <div className="divider px-3 h-0.5 bg-gray-200"></div>
      <Conversations />
      <LogoutButton />
    </div>
  );
};

export default Sidebar;
