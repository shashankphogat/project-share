import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchProjects } from "../slices/projectSlice";
import Notifications from "./notifications";
import moment from "moment";
import { useMemo } from "react";


function Projectlist() {
  const dispatch = useDispatch();
  const projectList = useSelector((state) => state.project.projects);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  let slicedProjects=useMemo(()=>[...projectList].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0,5),[projectList])

  function mapProjectsToComponent() {
    return slicedProjects
      .map((project) => {
        return (
          <Link to={`/AboutProject/${project.id}`} key={project.id}>
            <div className="card">
              <div className="card-content grey-text text-darken-3">
                <p className="card-title ">{project.title}</p>
                <p>Posted by {project.author}</p>
                <p className="grey-text">
                  {moment(project.createdAt).calendar()}
                </p>
              </div>
            </div>
          </Link>
        );
      });
  }
  return (
    <div className="container row section">
      <div className="col s6">{mapProjectsToComponent()}</div>
      <div className="col s6">
        <Notifications />
      </div>
    </div>
  );
}

export default Projectlist;
