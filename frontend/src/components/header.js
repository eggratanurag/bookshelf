import React from "react";
import { NavLink } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import MenuIcon from "@mui/icons-material/Menu";
import "./header.css";
import { UserState } from "../context/userProvider";

export default function Header() {

  const { user, setUser } = UserState();
  const primaryNav = React.useRef();
  const navToggle = React.useRef();

// user && console.log(user)

 

    function faltu () {
    
      const visibility = primaryNav.current.getAttribute('data-visible')
   
       if(visibility === "false") {
          navToggle.current.setAttribute('aria-expanded', true)
          primaryNav.current.setAttribute('data-visible',true)

       }else {
         primaryNav.current.setAttribute('data-visible', false)
         navToggle.current.setAttribute('aria-expanded', false)
       }

      
     }
 

 

  return (
    <nav>
      <div className="mainDivForHeader">
        <div className="leftDiv">
      <button
      onClick={() => faltu()}
        className="mobile-nav-toggle navlinks"
        aria-controls="primary-navigation"
        aria-expanded="false"
        ref={navToggle}

      >
     
          <MenuIcon style={{fontSize: "3rem"}} />
       
      </button>
          <ul data-visible="false" id="primary-navigation" ref={primaryNav} className="primary-navigation">
            <li>
              <span aria-hidden="true">
                <NavLink onClick={() => faltu()} className="navlinks" to={"/"}>
                  Home
                </NavLink>
              </span>
            </li>
            <li>
              <span aria-hidden="true">
                <NavLink onClick={() => faltu()} className="navlinks" to={"/books"}>
                  buy books
                </NavLink>
              </span>
            </li>
            <li>
              <span aria-hidden="true">
                <NavLink onClick={() => faltu()} className="navlinks" to={'/products'}>
                  sell
                </NavLink>
              </span>
            </li>
            <li>
              <span aria-hidden="true">
                <NavLink onClick={() => faltu()} className="navlinks" to={"/wishlist"}>
                  <FavoriteIcon />
                </NavLink>
              </span>
            </li>
            <li>
              <span aria-hidden="true">
                <NavLink onClick={() => faltu()} className="navlinks" to={"/orders"}>
                  <LocalMallIcon />
                </NavLink>
              </span>
            </li>
          </ul>
        </div>
        <div className="rightDiv">
          
          {user ? (
            <NavLink to={"/profile/" + user._id} className="navlinks">
              <img style={{width:"35px", height:"35px",objectFit: "cover", borderRadius:"50%",border:"2px solid #ff735d"}} src={user && user.pic} alt=""/>
            </NavLink>
          ) : (
            <NavLink  className="navlinks" to={"/user/login"}>
              Login
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}
