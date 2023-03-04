import React, { useContext } from "react";
import { Stack } from "react-bootstrap";
import { AppContext } from "../context/appContext";

const MessageContainer = () => {
  const { messages } = useContext(AppContext);
  
  return (
    <Stack
      gap={3}
      style={{
        height: "75vh",
      }}
    >
      {messages.map(({_id: date, messagesByDate}, idx) => (
        <div key={idx}>
          <p className="alert  alert-info text-center message-date-indication">{date}</p>
          {messagesByDate?.map(({content, time, from: send}, msgIdx) => (
              <div className="message" key={msgIdx}>
                <p>{content}</p>
              </div>
          ))}
        </div>
      ))}
    </Stack>
  );
};

export default MessageContainer;
