import GenderCheckbox from "./GenderCheckbox.jsx";

const SignUp = () => {
  return <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
    <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      <h1 className="text-3xl font-semibold text-center text-gray-300">
        Sign Up 
        <span className="text-red-400"> SocketSync</span>
      </h1>
      <form>
        <div>
          <label className="label p-2">
            <span className="text-base label-text text-yellow-200">Full Name</span>
          </label>
          <input type="text" placeholder="Enter Full Name" className="w-full input input-bordered h-10"/>
        </div>
        <div>
          <label className="label p-2">
            <span className="text-base label-text text-yellow-200">Username</span>
          </label>
          <input type="text" placeholder="Enter Username" className="w-full input input-bordered h-10"/>
        </div>
        <div>
        <label className="label p-2">
            <span className="text-base label-text text-yellow-200">Password</span>
          </label>
          <input type="password" placeholder="Password" className="w-full input input-bordered h-10"/>
        </div>
        <div>
        <label className="label p-2">
            <span className="text-base label-text text-yellow-200">Confirm Password</span>
          </label>
          <input type="password" placeholder="Confirm Password" className="w-full input input-bordered h-10"/>
        </div>
        <GenderCheckbox/>
        <a className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block" href="#">
          Already have an  account?
          </a>
        <div>
          <button className="btn btn-block btn-sm mt-2 border border-green-300">Sign Up</button>
        </div>
      </form>
    </div>

  </div>
};

export default SignUp;