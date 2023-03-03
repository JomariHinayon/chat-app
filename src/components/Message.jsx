import React, { useContext, useState } from "react";
import { Form, Row, Col, InputGroup, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { AppContext, socket } from "../context/appContext";
import "./style.css";

const Message = () => {
  const [message, setMessage] = useState("");
  const { currentRoom, setMessages, messages, privateMemberMsg } =
    useContext(AppContext);
  const user = useSelector((state) => state.user);

  // format the date of message
  const getFormattedDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    let month = (1 + date.getMonth()).toString();

    month = month.length > 1 ? month : "0" + month;
    let day = date.getDate().toString();

    day = day.length > 1 ? day : "0" + day;

    return month + "/" + day + "/" + year;
  };

  const todayDate = getFormattedDate();

  socket.off("room-messages").on("room-messages", (roomMessages) => {
    console.log(roomMessages)
    setMessages(roomMessages)
  })

  // Send Message Click
  const handleSendMessage = (e) => {
    e.preventDefault();

    if (!message) return;

    const today = new Date();
    const minutes =
      today.getMinutes() < 10 ? "0" + today.getMinutes : today.getMinutes();
    const time = today.getHours + ":" + minutes;
    const roomId = currentRoom;
    socket.emit("message-room", roomId, message, user, time, todayDate);

    setMessage("");
  };

  return (
    <Form onClick={handleSendMessage}>
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <InputGroup className="mb-3">
              <InputGroup.Text
                style={{
                  backgroundColor: "transparent",
                }}
              >
                <i
                  className="fa-solid fa-face-grin fa-xl"
                  style={{
                    color: "grey",
                  }}
                ></i>
              </InputGroup.Text>
              <Form.Control
                aria-label="Amount (to the nearest dollar)"
                style={{
                  borderStyle: "solid hidden ",
                }}
                className="message-input"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <InputGroup.Text
                style={{
                  backgroundColor: "transparent",
                }}
              >
                <Button
                  className="send-icon"
                  type="submit"
                  style={{
                    padding: "0",
                    margin: "0",
                    width: "50px",
                    height: "40px",
                    border: "none",
                  }}
                >
                  <i
                    className="fa-solid fa-paper-plane fa-lg"
                    style={{ width: "50px" }}
                  ></i>
                </Button>
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
};

export default Message;
