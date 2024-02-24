import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../shared/baseUrl";

const Register = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const registerUser = async (e) => {
    e.preventDefault();

    const { name, email, password, cpassword } = user;

    const res = await fetch(baseUrl + "/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, cpassword }),
    });
    const data = await res.json();
    if (!data || res.status === 422) {
      window.alert(data.error);
    } else {
      window.alert(data.message);
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen px-4 pt-16 mb-2 sm:px-20">
      <div className="flex justify-center ">
        <div className="w-full p-10 mt-10 border border-gray-800 rounded-md shadow-lg xl:w-2/3 bg-zinc-300 shadow-gray-800">
          <div>
            <h1 className="text-5xl font-semibold text-black-200 ">Signup</h1>
            <div className="grid gap-10 mt-12 text-gray-900 md:grid-cols-2 ">
              <div className="grid ">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder=" Enter your full name"
                  className="text-gray-800 border-b-2 border-black bg-inherit"
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                />
              </div>
              <div className="grid ">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder=" Enter your email"
                  className="text-gray-800 border-b-2 border-black bg-inherit"
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
              </div>
              <div className="grid ">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder=" Create password"
                  className="text-gray-800 border-b-2 border-black bg-inherit"
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                />
              </div>
              <div className="grid ">
                <label htmlFor="cpassword">Confirm password</label>
                <input
                  type="password"
                  name="cpassword"
                  id="cpassword"
                  placeholder=" Confirm your password"
                  className="text-gray-800 border-b-2 border-black bg-inherit"
                  onChange={(e) =>
                    setUser({ ...user, cpassword: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="text-sm text-center mt-7 text-slate-900">
              <p>
                Already have an account{" "}
                <span
                  className="text-base text-blue-500 cursor-pointer "
                  onClick={() => navigate("/login")}
                >
                  Login
                </span>
              </p>
            </div>
            <div className="flex justify-end mt-8 ">
              <button
                className="px-10 py-2 font-semibold bg-blue-500 rounded-md "
                onClick={registerUser}
              >
                Signup
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
