import React from "react";
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
import "./signup.css";

const Signup = () => {
  return (
    <Container>
      <Row>
        <Col xs={7}>
          <Stack gap={3}>
            <h1 className="signup-title">Sign in to Swipe</h1>
            <Stack direction="horizontal" gap={3}>
              <img src={mail} style={{ width: "60px" }} />
              <img src={messages} style={{ width: "60px" }} />
              <img src={telephone} style={{ width: "60px" }} />
            </Stack>
            <p className="p1">or use you email account</p>
            {/* <i className=" fa-sharp fa-solid fa-envelope fa-lg"></i> */}
            <Form>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">
                  <i className=" fa-sharp fa-solid fa-envelope fa-lg"></i>
                </InputGroup.Text>
                <Form.Control
                  placeholder="Username"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </InputGroup>

              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">
                  <i class="fa-solid fa-lock"></i>
                </InputGroup.Text>
                <Form.Control
                  placeholder="Password"
                  aria-label="Password"
                  aria-describedby="basic-addon1"
                />
              </InputGroup>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Stack>
        </Col>
        <Col xs={5}>2 of 2</Col>
      </Row>
    </Container>
  );
};

export default Signup;
