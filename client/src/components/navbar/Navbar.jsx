import { ArrowDropDown, Notifications, Search } from "@material-ui/icons";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../../App";
// import "./navbar.scss";
import "../../styles/navbar.css"

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const {state,dispatch} = useContext(userContext);


  const LogOut =()=>{
    localStorage.clear();
    dispatch({type:"LOGOUT"})
  }

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  return (
    <div className={isScrolled ? "navbar2 scrolled" : "navbar2"}>
      <div className="nav-container2">
        <div className="left">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
          <span> <Link className="link" to={'/'} >Homepage </Link> </span>
          <span><Link className="link" to={'/series'}>Series</Link> </span>
          <span> <Link className="link" to={'/movies'} >Movies</Link> </span>
          <span>New and Popular</span>
          <span>My List</span>
        </div>
        <div className="right">
          <Search className="icon" />
          <span>KID</span>
          <Notifications className="icon" />
          <img
            src={state?.pic}
            alt=""
          />
          <div className="profile">
            <ArrowDropDown className="icon" />
            <div className="options">
              <span> <Link className="link" to={'/profile'} >  Settings</Link> </span>
              <span onClick={LogOut} >Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
