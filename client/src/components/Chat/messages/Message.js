import React from "react";
import "./Message.css"; // Import the CSS file
import Avatar from "@mui/material/Avatar";

const Message = () => {
  // Function to format the timestamp
  const getFormattedTime = () => {
    const date = new Date();
    const hours = date.getHours().toString().padStart(2, "0"); // Add leading zero
    const minutes = date.getMinutes().toString().padStart(2, "0"); // Add leading zero
    return `${hours}:${minutes}`;
  };

  return (
    <div className="chat-container">
      <div className="chat-bubble">Hello, how can I help you?</div>
      {getFormattedTime()}
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
    </div>
  );
};

export default Message;
