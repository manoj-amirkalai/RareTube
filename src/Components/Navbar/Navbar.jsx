import "./Navbar.css";
import menuicon from "../../assets/menu.png";
import logo from "../../assets/logo.png";
import search from "../../assets/search.png";
import upload from "../../assets/upload.png";
import rare from "../../assets/user_profile.jpg";
import notification from "../../assets/notification.png";
import more from "../../assets/more.png";
import { Link } from "react-router-dom";
const Navbar = ({ setSidebar }) => {
  return (
    <nav className="flex-div">
      <div className="nav-left flex-div">
        <img
          className="menu-icon"
          onClick={() => {
            setSidebar((pre) => (pre === false ? true : false));
          }}
          src={menuicon}
          alt="menu"
        />
        <Link to="/">
          <img className="logo" src={logo} alt="" />
        </Link>
      </div>
      <div className="nav-middle flex-div">
        <div className="search-box flex-div">
          <input type="text" placeholder="search" />
          <img src={search} alt="" />
        </div>{" "}
      </div>
      <div className="nav-right flex-div">
        <img src={upload} alt="" />
        <img src={more} alt="" />
        <img src={notification} alt="" />
        <img src={rare} className="user-icon" alt="" />
      </div>
    </nav>
  );
};

export default Navbar;
