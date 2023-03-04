import React, { useContext, useEffect } from "react";
import { Container, ListGroup } from "react-bootstrap";
import { AppContext } from "../context/appContext";
import { useDispatch, useSelector } from "react-redux";
import { addNotifications, resetNotifactions } from "../features/userSlice";
// import axios from 'axios'

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
    messages,
  } = useContext(AppContext);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

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

  // room is click
  const joinRoom = async (room, isPublic = true) => {
    await socket.emit("join-room", room);
    setCurrentRoom(room);

    if (isPublic) {
      setPrivateMemberMsg(null);
    }

    // dispatch for notifications
    dispatch(resetNotifactions(room));

    socket.off("notifications").on("notifications", (room) => {
      dispatch(addNotifications(room));
    });
  };

  const orderIds = (id1, id2) => {
    if (id1 > id2) {
      return id1 + "-" + id2;
    } else {
      return id2 + "-" + id1;
    }
  };

  // private member is click
  const handlePrivateMemberMgs = (member) => {
    setPrivateMemberMsg(member);
    const roomId = orderIds(user._id, member._id);
    joinRoom(roomId, false);
  };

  return (
    <>
      <Container>
        <h2>Available rooms</h2>
        <ListGroup>
          {rooms.map((room, idx) => (
            <ListGroup.Item
              key={idx}
              onClick={() => joinRoom(room)}
              style={{
                cursor: "pointer",
                display: "flex",
              }}
              active={room == currentRoom}
            >
              {room} 
              {/* {room !== currentRoom && <span className="badge rounded-pill bg-primary">{user.newMessages[room]}</span>} */}
            </ListGroup.Item>
          ))}
        </ListGroup>
        <h2>Members</h2>
        <ListGroup>
          {members.map((member, id) => (
            <ListGroup.Item
              key={id}
              style={{
                cursor: "pointer",
                display: "flex",
              }}
              active={privateMemberMsg?._id === member?._id}
              onClick={() => handlePrivateMemberMgs(member)}
              disabled={member._id === user.__id}
            >
              {member.username}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
    </>
  );
};

export default Sidebar;
