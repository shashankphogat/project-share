import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signUp } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { fetchNotifications } from "../slices/notificationSlice";

export default function SignUp() {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [data, setData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(signUp(data)).then(() => {
        dispatch(fetchNotifications());
      });
      nav("/");
    } catch (error) {
      return error;
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setData((prev) => {
      return { ...prev, [id]: value };
    });
  };

  return (
    <div className="container row">
      <div className="card">
        <form action="#" class="col s8 form">
          <div className="card-content">
            <div className="card-title">Sign Up</div>
            <div class="input-field">
              <input
                type="text"
                id="firstName"
                class="validate"
                required
                onChange={handleChange}
                value={data.firstName}
              ></input>
              <label for="firstName">First Name</label>
            </div>
            <div class="input-field">
              <input
                type="text"
                id="lastName"
                class="validate"
                required
                onChange={handleChange}
                value={data.lastName}
              ></input>
              <label for="lastName">Last Name</label>
            </div>
            <div class="input-field">
              <input
                type="email"
                id="email"
                class="validate"
                required
                onChange={handleChange}
                value={data.email}
              ></input>
              <label for="email">Email</label>
            </div>
            <div class="input-field">
              <input
                type="password"
                id="password"
                class="validate"
                required
                onChange={handleChange}
                value={data.password}
              ></input>
              <label for="password">Password</label>
            </div>
            <button type="submit" class="btn" onClick={handleSubmit}>
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
