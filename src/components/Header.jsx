import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { MdMenu, MdMenuOpen, MdLogin } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { baseUrl } from "../shared/baseUrl";

const Header = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);
  const Name = localStorage.getItem("Name");
  const token = localStorage.getItem("token");
  const [toggel, setToggel] = useState(false);
  const logout = async () => {
    const res = await fetch(baseUrl + "/logout", {
      method: "GET",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();
    if (res.status === 200) {
      dispatch({ type: "USER", payload: false });
      localStorage.removeItem("Name");
      localStorage.removeItem("token");
      alert(data.message);
      navigate("/home");
    } else {
      alert("something went wrong");
    }
  };
  return (
    <div className="z-50 w-full px-4 py-5 font-semibold text-white bg-black border-b-2 hover:border-b-4 border-red sm:px-20">
      <div className="flex justify-between">
        <div>
          <h1 className="text-3xl text-red font-anton hover:text-4xl">
            FirstReview
          </h1>
        </div>
        <div className="sm:hidden">
          <button onClick={() => setToggel(!toggel)}>
            {toggel ? <MdMenuOpen size={30} /> : <MdMenu size={30} />}
          </button>
        </div>
        <div className="hidden font-mono gap-x-3 sm:flex">
          {/* <NavLink to="/home">Home</NavLink> */}

          {state && (
            <NavLink
              to={!token ? "/login" : "/add"}
              className={({ isActive }) =>
                `p-1  hover:text-2xl hover:text-red ${
                  isActive
                    ? " text-yellow-400 border-b-2 border-white"
                    : "text-nav-link"
                }`
              }
            >
              AddMovie
            </NavLink>
          )}
          <NavLink
            to="/movies"
            className={({ isActive }) =>
              `p-1  hover:text-2xl hover:text-red ${
                isActive
                  ? " text-yellow-400 border-b-2 border-white"
                  : "text-nav-link"
              }`
            }
          >
            Movies
          </NavLink>
          <NavLink
            to="/home"
            className={({ isActive }) =>
              `p-1 hover:text-2xl hover:text-red ${
                isActive
                  ? " text-yellow-400 border-b-2 border-white"
                  : "text-nav-link"
              }`
            }
          >
            Home
          </NavLink>
          {state === true || Name ? (
            <>
              <div className="flex hover:text-yellow-500 gap-x-1">
                <button onClick={logout}>logout</button>
                {Name && (
                  <p className="w-8 h-8 font-mono text-lg font-bold text-center bg-gray-700 rounded-full py-auto ">
                    {Name[0]}
                  </p>
                )}
              </div>
            </>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `p-1 flex hover:text-2xl hover:text-red ${
                  isActive
                    ? " text-yellow-400 border-b-2 border-white"
                    : "text-nav-link"
                }`
              }
            >
              <span>
                <MdLogin size={25} />
              </span>{" "}
              Login
            </NavLink>
          )}
        </div>
      </div>
      {toggel && (
        <>
          <div className="gap-5 p-3 font-mono text-xl font-semibold bg-yellow-500 bg-opacity-10 sm:hidden ">
            {/* <NavLink to="/home">Home</NavLink> */}
            {state && (
              <NavLink
                to={!token ? "/login" : "/add"}
                className={({ isActive }) =>
                  `p-1  hover:text-2xl hover:text-red ${
                    isActive
                      ? " text-yellow-400 border-r-2 border-white"
                      : "text-nav-link"
                  }`
                }
              >
                AddMovie
              </NavLink>
            )}

            <NavLink
              to="/movies"
              className={({ isActive }) =>
                ` p-3 block hover:text-2xl hover:text-red ${
                  isActive
                    ? " text-yellow-400 border-r-2 border-white"
                    : "text-nav-link"
                }`
              }
            >
              Movies
            </NavLink>
            <NavLink
              to="/home"
              className={({ isActive }) =>
                `p-3 block hover:text-2xl hover:text-red ${
                  isActive
                    ? " text-yellow-400 border-r-2 border-white"
                    : "text-nav-link"
                }`
              }
            >
              Home
            </NavLink>
            {state === true || Name ? (
              <>
                <div className="flex justify-end p-3 hover:text-yellow-500 gap-x-1">
                  <button onClick={logout}>logout </button>
                  {Name && (
                    <p className="w-8 h-8 font-mono text-lg font-bold text-center bg-gray-700 rounded-full py-auto ">
                      {Name[0]}
                    </p>
                  )}
                </div>
              </>
            ) : (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `p-3  flex hover:text-2xl hover:text-red ${
                    isActive
                      ? " text-yellow-400 border-r-2 border-white"
                      : "text-nav-link"
                  }`
                }
              >
                <span>
                  <MdLogin size={25} />
                </span>{" "}
                Login
              </NavLink>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Header;
