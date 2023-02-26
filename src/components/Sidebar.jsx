import React, { useContext, useEffect } from "react";
import { Container, ListGroup } from "react-bootstrap";
import { AppContext } from "../context/appContext";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const default_rooms = ["first room", "second room", "third room"];

  const {
    socket,
    members,
    setMembers,
    setCurrentRoom,
    setRooms,
    privateMemberMsg,
    rooms,
    setPrivateMemberMsg,
    currentRoom,
  } = useContext(AppContext);

  useEffect(() => {
    setCurrentRoom("general");
    getRooms();
    socket.emit("join-room", "general");
    socket.emit("new-user");
  }, []);

  socket.off("new-user").on("new-user", (payload) => {
    setMembers([...payload]);
  });

  function getRooms() {
    fetch("http://localhost:5001/rooms")
      .then((res) => res.json())
      .then((data) => setRooms(data));
  }

  return (
    <>
      <Container>
        <h2>Available rooms</h2>
        <ListGroup>
          {rooms.map((room, idx) => (
            <ListGroup.Item key={idx}>{room}</ListGroup.Item>
          ))}
        </ListGroup>
        <h2>Members</h2>
        <ListGroup>
          {members.map((member, id) => (
            <ListGroup.Item key={id} style={{ cursor: "pointer" }}>
              {member.username}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
    </>
  );
};

export default Sidebar;
