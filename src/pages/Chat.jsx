import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Message from "../components/Message";
import MessageContainer from "../components/MessageContainer";
import Sidebar from "../components/Sidebar";
import { useSelector } from "react-redux";

const Chat = () => {
  const user = useSelector((state) => state.user);

  return (
    <>
      {user && (
        <Container>
          <Row>
            <Col xs={4}>
              <Sidebar />
            </Col>
            <Col
              xs={8}
              style={{
                height: "85vh",
              }}
            >
              <MessageContainer />
              <Message />
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default Chat;
