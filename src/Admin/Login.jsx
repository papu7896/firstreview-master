import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { baseUrl } from "../shared/baseUrl";

const Login = () => {
  const { state, dispatch } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const loginUser = async (e) => {
    e.preventDefault();

    const res = await fetch(baseUrl + "/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await res.json();
    // console.log(res);
    // console.log(res);
    if (res.status === 400 || !data) {
      window.alert(data.error);
    } else if (res.status === 200) {
      dispatch({ type: "USER", payload: true });
      window.alert(data.message);
      localStorage.setItem("token", data.jwtoken);
      localStorage.setItem("Name", data.user.name);
      navigate("/add");
    } else {
      window.alert("something went wrong");
    }
  };
  return (
    <div className="px-4 pt-16 sm:min-h-screen sm:px-20 login">
      <div className="flex justify-center ">
        <div className="flex w-full mx-auto my-20 border border-gray-800 rounded-md shadow-lg sm:w-auto bg-zinc-300 shadow-gray-800">
          <div className="hidden bg-gray-700 rounded-l-md w-72 md:grid">
            <img
              src={require("../assets/images/login.jpg")}
              alt="login"
              className=" h-[100%] w-[100%] rounded-l-md"
            />
          </div>
          <form method="POST" className="w-full p-10 mb-0 sm:w-auto ">
            <h1 className="text-5xl font-semibold text-black-200">Login</h1>
            <div className="grid mt-7 gap-y-10 ">
              <input
                required
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                className="w-full h-12 text-black border-b-2 border-black sm:w-96 bg-inherit"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                required
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                className="w-full h-12 text-black border-b-2 border-black bg-inherit sm:w-96 "
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mt-8 text-sm">
              <p className=" text-slate-900">
                {" "}
                don't have an account{" "}
                <span
                  className="text-base text-blue-500 cursor-pointer "
                  onClick={() => navigate("/registration")}
                >
                  signup
                </span>
              </p>
            </div>
            <div className="flex justify-end mt-10">
              <button
                className="px-10 py-2 font-semibold bg-blue-500 rounded-md "
                onClick={loginUser}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
