import React from "react";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../slices/authSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Initials from "./initials";

export default function Navbar() {
  const sidemenu = useRef(null);

  const nav = useNavigate();

  const authId = useSelector((state) => state?.authListener?.user?.uid);

  const dispatch = useDispatch();

  useEffect(() => {
    let M = window.M;
    let sideWindow = sidemenu.current;
    M.Sidenav.init(sideWindow, {});
  }, []);

  const signOutUser = () => {
    dispatch(logOut());
    nav("/login");
  };

  return (
    <div>
      <nav className="nav-wrapper">
        <div className="container">
          <Link className="brand-logo" to="/">
            Project share
          </Link>
          <div className="hide-on-large-only">
            <i
              className="sidenav-trigger material-icons"
              data-target="mobile-links"
            >
              dehaze
            </i>
          </div>
          <ul className="right hide-on-med-and-down">
            {!authId ? (
              <>
                <li>
                  <Link to="/logIn">Login</Link>
                </li>
                <li>
                  <Link to="/signUp">Sign Up</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/addProject">Add project</Link>
                </li>
                <li onClick={signOutUser}>
                  <Link to="/">Logout</Link>
                </li>
                <li>
                  <Link to="/" className="btn btn-floating lighten-1">
                    {<Initials uid={authId} />}
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
      <div>
        <ul className="sidenav" id="mobile-links" ref={sidemenu}>
          {!authId ? (
            <>
              <li>
                <Link to="/logIn">Login</Link>
              </li>
              <li>
                <Link to="/signUp">Sign Up</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/addProject">Add project</Link>
              </li>
              <li onClick={signOutUser}>
                <Link to="/logIn">Logout</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
