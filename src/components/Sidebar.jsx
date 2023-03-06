import React, { useContext, useEffect } from "react";
import { Container, ListGroup, Col, Row, Stack } from "react-bootstrap";
import { AppContext } from "../context/appContext";
import { useDispatch, useSelector } from "react-redux";
import { addNotifications, resetNotifactions } from "../features/userSlice";
// import axios from 'axios'

const Sidebar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
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

  useEffect(() => {
    setCurrentRoom("general");
    getRooms();
    socket.emit("join-room", "general");
    socket.emit("new-user");
  }, []);

  socket.off("new-user").on("new-user", (payload) => {
    setMembers(payload);
  });

  function getRooms() {
    fetch("http://localhost:5001/rooms")
      .then((res) => res.json())
      .then((data) => setRooms(data));
  }

  // room is click
  const joinRoom = async (room, isPublic = true) => {
    await socket.emit("join-room", room, currentRoom);
    setCurrentRoom(room);

    if (isPublic) {
      setPrivateMemberMsg(null);
    }

    // dispatch for notifications
    dispatch(resetNotifactions(room));

    socket.off("notifications").on("notifications", (room) => {
      if (currentRoom != room) {
        dispatch(addNotifications(room));
      }
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

  console.log(user.newMessages);

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
                justifyContent: "space-between",
              }}
              active={room == currentRoom}
            >
              {room}
              {room !== currentRoom && (
                <span className="badge rounded-pill bg-primary">
                  {user.newMessages[room]}
                </span>
              )}
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
              <Stack
                direction="horizontal"
                gap={3}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div>
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
                  {member.status == "online" ? (
                    <i
                      class="fa-solid fa-circle"
                      style={{
                        color: "green",
                        position: "absolute",
                        bottom: "10px",
                        left: "45px",
                      }}
                    ></i>
                  ) : (
                    <i
                      class="fa-solid fa-circle"
                      style={{
                        color: "#e1ad01",
                        position: "absolute",
                        bottom: "10px",
                        left: "45px",
                      }}
                    ></i>
                  )}
                </div>
                {member.username}
                {member._id === user?._id && " (You) "}
                {member.status == "offline" && " (Offline) "}
                <span className="badge rounded-pill bg-primary">
                  {user.newMessages[orderIds(member._id, user._id)]}
                </span>
              </Stack>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
    </>
  );
};

export default Sidebar;
