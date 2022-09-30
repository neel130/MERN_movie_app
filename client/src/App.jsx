import "./app.scss"
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Watch from "./pages/watch/Watch";
import Login from "./pages/login/Login";
import { createContext, useReducer } from "react";
import { intialState, reducer } from "./Reducer/reducer";
import { useEffect, useContext } from "react";
import Profile from "./pages/profile/Profile";

export const userContext = createContext();



const Routing = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state, dispatch } = useContext(userContext);

  useEffect(() => {
    if (!state) {
      if (location.pathname.startsWith('/signup')) {
        navigate('/signup')
      } else {
        navigate('/login');
      }
    }
    if (state) {
      if (location.pathname.startsWith('/login') || location.pathname.startsWith('/signup')) {
        navigate('/')
      }
    }
  }, [state])


  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movies" element={<Home type="movie" />} />
      <Route path="/series" element={<Home type="series" />} />
      <Route path="/watch" element={<Watch />} />
      <Route path="/profile" element={<Profile/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register />} />
    </Routes>
  )
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, intialState)

  return (
    <BrowserRouter>
      <userContext.Provider value={{ state, dispatch }} >
        <Routing />
      </userContext.Provider>
    </BrowserRouter>
  );
};

export default App;