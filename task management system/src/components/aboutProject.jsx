import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";

export default function AboutProject() {
  const { projectId } = useParams();
  const projects = useSelector((state) => state.project.projects);
  const project = projects.filter((project) => {
    return project.id === projectId;
  })[0];
  if (project) {
    return (
      <div className="container">
        <div className="section">
          <div className="card">
            <div className="card-content">
              <div className="card-title">
                <p>{project.title}</p>
              </div>
              <p id="project-content">{project.content}</p>
              <div className="card-action grey-text">
                <p id="project-author">Posted by {project.author}</p>
                <p>{moment(project.createdAt).calendar()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container">
        <div className="section">
          <p>...Loading</p>
        </div>
      </div>
    );
  }
}
