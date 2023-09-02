import React, { useContext, useEffect } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { useNavigate } from "react-router";
import Notification from "./Notification";
import { UserContext } from "../../../App";
import { NotificationSeen } from "../../../services/NotificationController";
function Notifications({ setDisplayed }) {
  const [notifications, setNotifications] =
    useContext(UserContext).notifications;
  const [socket, setSocket] = useContext(UserContext).socket;

  const [user, setUser] = useContext(UserContext).user;
  useEffect(() => {
    async function notificationsSeen() {
      let notificationIds = [];
      for (const notification of notifications) {
        notificationIds.push(notification.notificationId);
      }
      const User = await NotificationSeen(user.userId, notificationIds);
      setUser(User);
    }

    notificationsSeen();

    setDisplayed("notifications");
  }, []);
  const [isDark, setIsDark] = useContext(UserContext).isDark;

  const Navigate = useNavigate();
  return (
    <div
      style={{
        color: isDark ? "white" : "",
      }}
      className="section sm:ml-[90px]  sm:p-6 p-4 "
    >
      <div className="relative  text-xl h-[7%] px-2 flex items-center mb-8">
        <div className="  cursor-pointer" onClick={() => Navigate(-1)}>
          <AiOutlineLeft />
        </div>
        <div className="text-main font-medium mx-auto">Notifications</div>
      </div>
      <div className="flex flex-col gap-8 s">
        {notifications &&
          notifications
            .map((notification) => (
              <Notification
                status={notification?.status}
                createdAt={notification?.createdAt}
                message={notification?.message}
                postId={notification?.postId}
                userId={notification?.userId}
                post={notification?.post}
              />
            ))
            .sort((notA, notB) => notB.createdAt - notA.createdAt)}
      </div>
    </div>
  );
}

export default Notifications;
