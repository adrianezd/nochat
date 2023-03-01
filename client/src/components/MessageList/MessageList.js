import React from "react";

function MessageList(props) {
  return (
    <ul>
      {props.messages.map((message) => (
            <div>
              <h5>{message.time}</h5>
              <h3>{message.user}</h3>
              <p>{message.message}</p>
              <h6>-----------------</h6>
            </div>
      ))}
    </ul>
  );
}

export default MessageList;