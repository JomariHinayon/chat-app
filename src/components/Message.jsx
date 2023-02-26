import React from "react";
import { Form, Row, Col, InputGroup, Button } from "react-bootstrap";
import "./style.css";

const Message = () => {
  return (
    <Form>
      <Row>
        <Col>
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
            />
            <InputGroup.Text
              style={{
                backgroundColor: "transparent",
              }}
            >
              <Button
                className="send-icon"
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
                  style={{  width: "50px" }}
                ></i>
              </Button>
            </InputGroup.Text>
          </InputGroup>
        </Col>
      </Row>
    </Form>
  );
};

export default Message;
