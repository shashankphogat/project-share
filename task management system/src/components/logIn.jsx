import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../slices/authSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";


export default function LogIn() {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const location = useLocation();
  const [authError,setAuthError]=useState(null)

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const authData = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(logIn(data)).unwrap();
      if (result.uid) {
        nav("/");
      }
    } catch (error) {
      if(authData?.error){
      setAuthError(authData.error)
      }
      return error;
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setData((prev) => {
      return { ...prev, [id]: value };
    });
  };

  useEffect(() => {
    setAuthError(null);
  }, [location.pathname]);

  return (
    <div className="container row">
      <div className="card">
        <form action="#" className="col s8 form" onSubmit={handleSubmit}>
          <div className="card-content">
            <div className="card-title">Log In</div>

            <div className="input-field">
              <input
                type="email"
                id="email"
                className="validate"
                value={data.email}
                onChange={handleChange}
                required
              ></input>
              <label htmlFor="email">Email</label>
            </div>
            <div className="input-field">
              <input
                type="password"
                id="password"
                required
                value={data.password}
                onChange={handleChange}
              ></input>
              <label htmlFor="password">Password</label>
            </div>
            <button type="submit" className="btn">
              Log In
            </button>
          </div>
        </form>
      </div>
      {authError && (
        <div className="col s12">
          <p className="error">{authError}</p>
        </div>
      )}
    </div>
  );
}
