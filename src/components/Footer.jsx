import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const token = localStorage.getItem("token");
  return (
    <div className="px-4 py-8 mt-3 bg-black border-t-2 hover:border-t-4 border-red h-60 sm:px-20 font-anton">
      <div>
        <div className="grid grid-cols-1 font-medium">
          <Link to="/home">Home</Link>
          <Link to="/movies">Movies</Link>
          <Link to={!token ? "/login" : "/add"}>Admin panel</Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
