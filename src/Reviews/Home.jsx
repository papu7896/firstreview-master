import React from "react";
import { useState, useEffect } from "react";
import { baseUrl } from "../shared/baseUrl";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log("data :", data);
  const getMovies = async () => {
    setLoading(true);
    const response = await fetch(baseUrl + "/getmovie");
    setData(await response.json());
    setLoading(false);
  };

  useEffect(() => {
    getMovies();
  }, []);
  if (loading) {
    return (
      <div className=" h-[60vh]">
        <Loader />
      </div>
    );
  }
  const value = [1, 2, 3, 4, 5, 6, 7, 8];
  const Card = ({ movie }) => {
    return (
      <div
        className="mt-0 border-2 border-gray-700 rounded-xl"
        style={{
          backgroundImage: `url(
          ${movie.image}
        )`,
          backgroundSize: "cover",
        }}
      >
        <div className="w-full h-80 sm:h-52 "></div>
        <div className="px-2 pt-3 pb-5 bg-black bg-opacity-80 rounded-b-xl">
          <div className="flex justify-between text-xl font-semibold">
            <p className="uppercase text-red">{movie.name}</p>
            <div className="flex text-base gap-x-1">
              <div className="w-4 h-4 bg-yellow-400 rating"></div>
              <p className="-mt-1">{movie.rating}</p>{" "}
            </div>
          </div>
          <div className="my-2 overflow-y-scroll sm:h-20 scrollbar">
            {movie.headline}
          </div>
          <Link to={`/movies/${movie._id}`}>
            <button className="w-full py-2 bg-red button hover:bg-yellow-500">
              Read Review
            </button>
          </Link>
        </div>
      </div>
    );
  };
  return (
    <div className="h-screen px-4 py-6 overflow-y-scroll mt-7 sm:px-20 pb-7 scrollbar scroll-smooth">
      {data && (
        <div className="grid gap-5 pb-60 h-fit sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 lg:gap-7">
          {data.map((data) => {
            console.log(data);
            if (!data._id) {
              return <Loader />;
            }
            return (
              <div
                key={data._id}
                className="h-full mt-0 card font-anton hover:scroll-smooth sm:hover:shadow-md sm:hover:shadow-yellow-500 sm:hover:scale-y-105 sm:hover:scale-x-110"
              >
                <Card movie={data} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Home;
