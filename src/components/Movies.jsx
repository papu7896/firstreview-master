import React from "react";
import { IoSearchCircle } from "react-icons/io5";
import Home from "../Reviews/Home";

const Movies = () => {
  return (
    <>
      <div className="px-4 pb-5 overflow-y-scroll sm:px-20 scrollbar">
        <div className="h-full text-center ">
          <div>
            <div>
              <div className="mt-3 text-3xl font-semibold text-white">
                Get Latest Review
              </div>
              <div className="flex justify-center">
                <div className="flex mt-3 bg-black-200 ">
                  <input
                    type="text"
                    placeholder="search movie..."
                    name="search"
                    className="h-full p-2 text-white bg-transparent sm:w-80"
                  />
                  <button className="ml-1 text-5xl bg-red">
                    <span>
                      <IoSearchCircle />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" -mt-7">
        <Home />
      </div>
    </>
  );
};

export default Movies;
