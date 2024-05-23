import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import "./chatinput.css";

const ChatMessageInput = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted message:", message);
    setMessage("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="d-flex align-items-center border-top mt-3 chatInput"
    >
      <input
        type="text"
        className="form-control flex-grow-1 py-3 px-4 chat-input-text"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        type="submit"
        className="btn btn-primary rounded-circle chatSendButton"
      >
        <FontAwesomeIcon icon={faPaperPlane} className="my-icon" />
      </button>
    </form>
  );
};

export default ChatMessageInput;
