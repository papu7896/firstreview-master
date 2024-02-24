import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import { createContext, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./Reviews/Home";
import Movies from "./components/Movies";

import Review from "./Reviews/Review";
import Admin from "./Admin/Admin";
import Login from "./Admin/Login";
import Register from "./components/Register";
import { useReducer } from "react";
import { initialState, reducer } from "./reducer/UseReducer";
import Loader from "./components/Loader";

export const UserContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [data, setData] = useState([]);

  // const getMovies = async () => {
  //   const response = await fetch("/getmovie");
  //   setData(await response.json());
  //   console.log("data :", data);
  // };

  // useEffect(() => {
  //   getMovies();
  // }, []);

  const MovieReview = () => {
    const { _id } = useParams();
    // console.log(_id);
    return <Review id={_id} />;
  };
  return (
    <div className="text-white ">
      <UserContext.Provider value={{ state, dispatch }}>
        <Router>
          <Header />
          <Routes>
            <Route path="/loader" element={<Loader />} />
            <Route path="/home" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/:_id" element={<MovieReview />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Register />} />
            <Route path="/add" element={<Admin />} />
            <Route path="/" element={<Navigate replace to="/home" />} />
          </Routes>
          <Footer />
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
