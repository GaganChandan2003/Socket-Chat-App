import React from "react";
import useConversation from "../../zustand/useConversation";
import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";

export const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser._id;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePicture = fromMe
    ? authUser.profilePicture
    : selectedConversation.profilePicture;
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";
  const shakeClass = message.shouldShake ? "shake" : "";
  return (
    <>
      <div className={`chat ${chatClassName}`}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src={profilePicture}
            />
          </div>
        </div>
        <div className="chat-header">
          <time className="text-xs opacity-50 ml-4 text-white">
            {extractTime(message.createdAt)}
          </time>
        </div>
        <div
          className={`chat-bubble rounded-lg min-h-2 max-w-80 ${bubbleBgColor} ${shakeClass}`}
        >
          {message.message}
        </div>
        {/* <div className="chat-footer opacity-50">Delivered</div> */}
      </div>
    </>
  );
};
