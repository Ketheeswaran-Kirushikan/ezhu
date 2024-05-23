import React from "react";
import Messages from "./Messages";
import Avatar from "@mui/material/Avatar";
import ChatMessageInput from "../chatMessage/ChatMessageInput";

const MessageContainer = () => {
  const noChatSelected = true;

  return (
    <div>
      {noChatSelected ? (
        <NoChatSelected />
      ) : (
        <>
          <div className="chat-section mb-0 chat-section-color d-flex align-items-center">
            <Avatar
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
              className="me-2"
            />
            <h5 className="mb-0">Joy</h5>
          </div>
          <Messages />
          <ChatMessageInput />
        </>
      )}
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = () => {
  return (
    <div className="text-center mt-5">
      <h4>No chat selected</h4>
    </div>
  );
};

export { NoChatSelected };
