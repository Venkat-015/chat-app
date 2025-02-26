import{BiLogOut} from "react-icons/bi";
import useLogout from "../../hooks/useLogout";
const LogoutButton = () => {
  const{loading,logout}=useLogout();
  return (
    <div className="mt-auto">
     {!loading?(<BiLogOut className="w-6 h-8 text-gray-100 cursor-pointer"
     onClick={logout}
     />):(
<span className="loading loading-spinner"/>
     )}
    </div>
  )
};

export default LogoutButton;