import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { baseUrl } from "../shared/baseUrl";
import { useNavigate } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import Loader from "../components/Loader";

const Review = ({ id }) => {
  console.log("idddd :", id);
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const getMovie = async () => {
    if (id) {
      const response = await fetch(baseUrl + `/getmovie/${id}`);
      setData(await response.json());
    }
  };

  useEffect(() => {
    getMovie();
  }, []);

  const back = () => {
    navigate(-1);
  };

  return (
    <div
      className="pt-16 pb-5 sm:px-20 bg-gradient-to-tl from-black-100 via-black-200 to-black"
      style={{
        backgroundImage: `url(
      ${data.image}
    )`,
        backgroundSize: "cover",
      }}
    >
      <div>
        <button
          onClick={back}
          className="flex px-3 py-1 mb-3 font-semibold text-yellow-600 rounded-sm -mt-7 gap-x-1 bg-neutral-800"
        >
          <span>
            <MdArrowBack size={25} />
          </span>{" "}
          Back
        </button>
      </div>

      {data?._id ? (
        <div className="bg-black rounded xl:rounded-lg lg:flex lg:flex-row lg:gap-x-5 border-black-200">
          <div className="p-4 xl:w-1/4 lg:w-2/5 md:flex md:gap-x-10 lg:block font-anton">
            <div className="bg-gray-400">
              <img
                src={data.image}
                alt={data.name}
                className="w-full h-96 md:w-auto lg:w-full"
              />
            </div>
            <div className="pt-4 ">
              <div className="flex justify-between">
                <p className="text-lg font-semibold uppercase text-red ">
                  {data.name}
                </p>
                <div className="flex">
                  <div className="w-4 h-4 mt-1 mr-2 bg-yellow-400 rating"></div>
                  {data.rating}
                </div>
              </div>

              <div className="mt-1">
                <p>Cast and crew</p>
                <div className="flex mt-1 overflow-x-scroll font-mono gap-x-5 lg:justify-between scrollbar">
                  {data.casts?.map((cast, index) => {
                    return <p key={index}>{cast}</p>;
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 xl:w-3/4 lg:w-3/5">
            <h3 className="py-5 text-lg font-medium text-yellow-400 font-anton">
              <span className="capitalize ">{data.name} </span>Movie Review :{" "}
              {data.headline}
            </h3>
            <hr className="mb-2 bg-yellow-500 border-2 border-yellow-500 " />
            <div className="flex gap-x-1 font-anton">
              <p>Rating</p>
              <p className="ml-2 text-yellow-400">{data.rating}</p>{" "}
              <div className="w-4 h-4 mt-[5px] bg-yellow-400 rating"></div>
            </div>
            <div className="pt-5">
              <div>
                <h4>Movie synopsis</h4>
                {data.shortdes}{" "}
              </div>
              <div className="py-4 ">
                <h4>Movie Review</h4>
                <p className="p-3 overflow-y-scroll border-2 border-solid rounded scrollbar h-72 border-black-200 bg-black-300">
                  {data.review}{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className=" h-[70vh]">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Review;
