import { IoIosSearch } from "react-icons/io";
const SearchInput = () => {
  return (
    <form className="flex items-center gap-2"> 
        <input type="text" placeholder="Search..." className="input input-bordered rounded-full border-green-400"/>
        <button type="submit" className="btn btn-circle bg-sky-500 text-white border-yellow-400">
        <IoIosSearch className="w-6 h-5 outline-none"/>
        </button>
    </form>
  );
};

export default SearchInput;