import React, { useState } from "react";
import {
  Container,
  Col,
  Row,
  Stack,
  Form,
  Button,
  InputGroup,
} from "react-bootstrap/esm";
import mail from "../../assets/mail.png";
import messages from "../../assets/messages.png";
import telephone from "../../assets/telephone.png";
import { LinkContainer } from "react-router-bootstrap";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
  };

  return (
    <Container fluid>
      <Row className="main-container">
        <Col xs={7}>
          <Stack gap={3} className="col-md-8 mx-auto sign-in-container">
            <h1 className="signin-title">Sign in to Swipe</h1>
            <Stack
              direction="horizontal"
              gap={3}
              className="mx-auto sign-in-icons"
            >
              <img src={mail} style={{ width: "60px" }} />
              <img src={messages} style={{ width: "60px" }} />
              <img src={telephone} style={{ width: "60px" }} />
            </Stack>
            <p className="p1">or use you email account</p>
            {/* <i className=" fa-sharp fa-solid fa-envelope fa-lg"></i> */}
            <Form onSubmit={handleLogin}>
              <InputGroup className="mb-3" style={{ height: "56px" }}>
                <InputGroup.Text
                  id="basic-addon1"
                  className="textfield-icon"
                  style={{
                    backgroundColor: "#f5f5f5",
                    border: "none",
                    width: "50px",
                  }}
                >
                  <i className=" fa-sharp fa-solid fa-envelope fa-lg"></i>
                </InputGroup.Text>
                <Form.Control
                  style={{ backgroundColor: "#f5f5f5", border: "none" }}
                  placeholder="Email"
                  aria-label="Email"
                  aria-describedby="basic-addon1"
                  type="email"
                  required
                  onChange={e => setEmail(e.target.value)}
                />
              </InputGroup>

              <InputGroup className="mb-3" style={{ height: "56px" }}>
                <InputGroup.Text
                  id="basic-addon1"
                  className="textfield-icon"
                  style={{
                    backgroundColor: "#f5f5f5",
                    border: "none",
                    width: "50px",
                  }}
                >
                  <i className="fa-solid fa-lock"></i>
                </InputGroup.Text>
                <Form.Control
                  style={{ backgroundColor: "#f5f5f5", border: "none" }}
                  placeholder="Password"
                  aria-label="Password"
                  aria-describedby="basic-addon1"
                  type="password"
                  required
                  onChange={e => setPassword(e.target.value)}
                />
              </InputGroup>
              <Button variant="primary" type="submit" className="sign-in-btn">
                Sign in
              </Button>
              <p className="p2">
                Don't have account?{" "}
                <span>
                  <LinkContainer to="/signup">
                    <a>Create Account</a>
                  </LinkContainer>
                </span>
              </p>
            </Form>
          </Stack>
        </Col>
        <Col xs={5} className="sign-up-container">
          <Stack gap={3} className="" style={{ alignSelf: "center" }}>
            <h1 className="hello-1" style={{ fontWeight: "700" }}>
              Hello, Friend!
            </h1>
            <p className="p3">
              Enter your personal details and start your journey with Swipe
              today.
            </p>
            <LinkContainer to="/signup">
              <a className="sign-up-btn">Sign up</a>
            </LinkContainer>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
