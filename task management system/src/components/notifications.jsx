import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import moment from "moment";
import { fetchNotifications } from "../slices/notificationSlice";

export default function Notifications() {
  const { items, status } = useSelector((state) => state.notifications);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchNotifications());
    }
  }, [status, dispatch]);

  if (status === "loading") return <p>Loading notifications...</p>;
  if (!items.length) return <p>No notifications</p>;

  return (
    <>
      <div className="container">
        <div className="card">
          <div className="card-content grey-text text-darken-3">
            <div className="card-title">Notifications</div>
            {[...items]
              .sort((a, b) => b.createdAt - a.createdAt)
              .slice(0, 4)
              .map((notification) => (
                <p key={notification.id}>
                  <strong>{notification.user}:</strong> {notification.content}
                  <br />
                  <small className="grey-text">
                    {moment(notification.createdAt).calendar()}
                  </small>
                </p>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
