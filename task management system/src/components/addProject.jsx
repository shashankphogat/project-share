import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProject } from "../slices/projectSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchNotifications } from "../slices/notificationSlice";

function Addproject() {
  const [newProjectVals, setnewProjectVals] = useState({});
  const authListenerData = useSelector((state) => state.authListener);
  const userName =
    authListenerData?.user?.firstName + " " + authListenerData?.user?.lastName;
  const nav = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { id, value } = e.target;
    setnewProjectVals({
      ...newProjectVals,
      [id]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addProject({ ...newProjectVals, author: userName })).then(() =>
      dispatch(fetchNotifications()),
    );
    nav("/");
  };

  return (
    <div className="container row">
      <div className="card">
        <form action="#" className="col s8 form" onSubmit={handleSubmit}>
          <div className="card-content">
            <div className="card-title">New Project</div>

            <div className="input-field">
              <input
                type="text"
                id="title"
                className="validate"
                required
                onChange={(e) => {
                  handleChange(e);
                }}
              ></input>
              <label for="title">Title</label>
            </div>
            <div className="input-field">
              <textarea
                id="content"
                className="materialize-textarea"
                required
                onChange={(e) => {
                  handleChange(e);
                }}
              ></textarea>
              <label for="content">Description</label>
            </div>
            <button type="submit" className="btn">
              Add project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Addproject;
