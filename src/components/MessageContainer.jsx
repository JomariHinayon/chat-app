import React from "react";
import { Stack } from "react-bootstrap";

const MessageContainer = () => {
  return (
    <Stack gap={3} style={{
        height:'75vh'
    }}>
      <div className="bg-light border">First item</div>
      <div className="bg-light border">Second item</div>
      <div className="bg-light border">Third item</div>
    </Stack>
  );
};

export default MessageContainer;
