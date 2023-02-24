import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import logo from "../assets/messenger.png";
import { useLogoutUserMutation } from "../services/appApi";

const Navigation = () => {
  const user = useSelector((state) => state.user);
  const [logoutUser] = useLogoutUserMutation();

  const handleLogout = async (e) => {
    e.preventDefault();

    await logoutUser(user);

    window.location.replace("/");
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
            <img src={logo} style={{ width: "2.5rem" }} />
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center justify-content-center">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>

            {!user ? (
              <>
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/signup">
                  <Nav.Link>Signup</Nav.Link>
                </LinkContainer>
              </>
            ) : (
              <LinkContainer to="/chat">
                <Nav.Link>Chat</Nav.Link>
              </LinkContainer>
            )}
            {user && (
              <NavDropdown
                title={
                  <>
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
                  </>
                }
                id="basic-nav-dropdown"
              >
                <LinkContainer
                  to="/chat"
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    margin: 0,
                  }}
                >
                  <NavDropdown.Item href="#action/3.1">
                    {"Hello, " +
                      user.username.charAt(0).toUpperCase() +
                      user.username.slice(1)}
                  </NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item href="#action/3.4" onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
