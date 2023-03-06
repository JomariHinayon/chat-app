import React, { useContext, useEffect, useRef } from "react";
import { Stack } from "react-bootstrap";
import { AppContext } from "../context/appContext";
import { useSelector } from "react-redux";

const MessageContainer = () => {
  const { messages } = useContext(AppContext);
  const user = useSelector((state) => state.user);
  const messageEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  function scrollToBottom() {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <Stack
      gap={3}
      style={{
        height: "75vh",
        overflowY: "auto",
      }}
    >
      {messages.map(({ _id: date, messagesByDate }, idx) => (
        <div key={idx}>
          <p className="alert  alert-info text-center message-date-indication">
            {date}
          </p>
          {messagesByDate?.map(({ content, time, from: sender }, msgIdx) => (
            <div className="message" key={msgIdx} >
              <Stack
                direction="vertical"
                className={sender._id === user._id && "ms-auto"}
                gap={1}
                style={{
                  padding: "10px",
                  backgroundColor: sender._id === user._id ? "skyblue" : "pink",
                  margin: "15px 0",
                  borderRadius: "10px",
                  justifyContent: "flex-end",
                  width: "fit-content",
                  display: "block",
                  minWidth: "200px"
                }}
              >
                <Stack
                  direction="horizontal"
                  gap={3}
                  style={{
                    marginBottom: "10px",
                  }}
                >
                  <i
                    className="fa-solid fa-user fa-lg"
                    style={{
                      padding: "20px 12px",
                      backgroundColor: "#545454",
                      margin: "0",
                      borderRadius: "50%",
                      color: "#e4e4e4",
                    }}
                  ></i>
                  <p style={{ paddingTop: "10px", fontWeight: "bold" }}>
                    {sender._id === user._id ? "You" : sender.username}
                  </p>
                </Stack>
                <p style={{marginLeft: "5px"}}>{content}</p>
                <p>{time}</p>
              </Stack>
            </div>
          ))}
        </div>
      ))}
      <div ref={messageEndRef} />
    </Stack>
  );
};

export default MessageContainer;
