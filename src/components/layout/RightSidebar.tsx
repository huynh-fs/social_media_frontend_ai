import React from "react";
import { useRightSidebarStore } from "../../stores/rightSidebarStore";
import DefaultWidgetsPanel from "../../components/layout/DefaultWidgetsPanel";
import ExplorePanel from "../../features/explore/components/ExplorePanel";
import NotificationsPanel from "../../features/notifications/components/NotificationsPanel";
import MessagesPanel from "@/features/messages/components/MessagesPanel";
import ProfilePanel from "@/features/profile/components/ProfilePanel";

const RightSidebar: React.FC = () => {
  const activePanel = useRightSidebarStore((s) => s.activePanel);

  let content;
  switch (activePanel) {
    case "EXPLORE":
      content = (
        <>
          <img
            src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExcW5sajl0NHR0b2F3d2loN3JtOHB5bTh5ejRwMml2YXpwbTlyYXE2bCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/nYL2SVGoXD3qM/giphy.gif"
            alt=""
            className="w-full h-32 object-cover"
          />
          <ExplorePanel />;
        </>
      );
      break;
    case "NOTIFICATIONS":
      content = (
        <>
          <img
            src="https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3bmQzaTJxZTV4MTRoZHM1dzkzYnlwajJhcTV4dmx5YnVxdjYxd3FqMyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/1XgIXQEzBu6ZWappVu/giphy.gif"
            alt=""
            className="w-full h-32 object-top"
          />
          <NotificationsPanel />;
        </>
      );
      break;
    case "MESSAGES":
      // Nếu có panel messages, có thể thêm ở đây
      content = (
        <>
          <img
            src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaDNqZXNhZGFzejlmaWlhbWtsM2U4cWFvNHdyNnoyc2l6d3M1aWd4eSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/EHXEIyTNEXiLPNcmcU/giphy.gif"
            alt=""
            className="w-full h-32 object-top"
          />
          <MessagesPanel />;
        </>
      );
      break;
    case "PROFILE":
      content = (
        <>
          <img
            src="https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3eXZha2xxZTB4cmxvempoZ3k3aWRpeWJ2NzE2andid3lvZDM5NGVteiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/1zlnr5qxalUJ0AdKOp/giphy.gif"
            alt=""
            className="w-full h-32 object-fill"
          />
          <ProfilePanel />;
        </>
      );
      break;
    case "DEFAULT":
    default:
      content = (
        <>
          <img
            src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExcHA5Njl5MnhsemxuYWxyZ293a3J0ZDJtcGNvc2dmaTJrcnk1eGZhayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/tJDz8mPYyUJZ1Pg9fA/giphy.gif"
            alt=""
            className="w-full h-32 object-cover rounded-lg shadow-md"
          />
          <DefaultWidgetsPanel />
        </>
      );
  }

  return <div className="flex flex-col space-y-4 py-2">{content}</div>;
};

export default RightSidebar;
