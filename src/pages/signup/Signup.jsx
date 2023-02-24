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
import { useSignupUserMutation } from "../../services/appApi";
import mail from "../../assets/mail.png";
import messages from "../../assets/messages.png";
import telephone from "../../assets/telephone.png";
import { LinkContainer } from "react-router-bootstrap";
import "./signup.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupUser, { isLoading, error }] = useSignupUserMutation();

  const handleSignup = async (e) => {
    e.preventDefault();

    await signupUser({ username, email, password }).then(({ data }) => {
      if (data) {
        console.log(data);
      }
    });
  };

  return (
    <Container fluid>
      <Row className="main-container">
        <Col xs={5} className="sign-up-container">
          <Stack gap={3} className="" style={{ alignSelf: "center" }}>
            <h1 className="hello-1" style={{ fontWeight: "700" }}>
              Welcome Back!
            </h1>
            <p className="p3">
              To keep connected with your friends please login with your
              personal info.
            </p>
            <LinkContainer to="/login">
              <a className="sign-up-btn">Sign In</a>
            </LinkContainer>
          </Stack>
        </Col>
        <Col xs={7}>
          <Stack gap={3} className="col-md-8 mx-auto sign-in-container">
            <h1 className="signin-title">Create Account</h1>
            <Stack
              direction="horizontal"
              gap={3}
              className="mx-auto sign-in-icons"
            >
              <img src={mail} style={{ width: "60px" }} />
              <img src={messages} style={{ width: "60px" }} />
              <img src={telephone} style={{ width: "60px" }} />
            </Stack>
            <p className="p1">or use you email account for registration</p>
            {/* <i className=" fa-sharp fa-solid fa-envelope fa-lg"></i> */}
            <Form onSubmit={handleSignup}>
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
                  <i className="fa-solid fa-user fa-lg"></i>
                </InputGroup.Text>
                <Form.Control
                  style={{ backgroundColor: "#f5f5f5", border: "none" }}
                  placeholder="Username"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  type="text"
                  required
                  onChange={(e) => setUsername(e.target.value)}
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
                  <i className=" fa-sharp fa-solid fa-envelope fa-lg"></i>
                </InputGroup.Text>
                <Form.Control
                  style={{ backgroundColor: "#f5f5f5", border: "none" }}
                  placeholder="Email"
                  aria-label="Email"
                  aria-describedby="basic-addon1"
                  type="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
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
                  onChange={(e) => setPassword(e.target.value)}
                />
              </InputGroup>
              <Button variant="primary" type="submit" className="sign-in-btn">
                Sign in
              </Button>
              <p className="p2">
                Already have account?{" "}
                <span>
                  <LinkContainer to="/login">
                    <a>Sign In</a>
                  </LinkContainer>
                </span>
              </p>
            </Form>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
