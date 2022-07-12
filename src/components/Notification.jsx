import React from "react";
import { useStateValue } from "../AppState/AppState";
import NotificationItem from "./NotificationItem";

function Notification() {
  const [{ basket }, dispatch] = useStateValue();
  return (
    <div className="hidden lg:block duration-500">
      {basket &&
        basket.map((item, i) => <NotificationItem item={item} key={i} />)}
    </div>
  );
}

export default Notification;
