import React from "react";
import Header from "./Header";

function Chat({ socket, username, room }) {
  const [messages, setMessages] = React.useState([]);
  const [message, setMessage] = React.useState("");

  const sendMessage = () => {
    socket.emit("message", message);
    setMessages([...messages, { username, message }]);
  };

  return (
    <div>
      <div className="chat-header">
        <Header username={username} room={room} />
      </div>

      <div className="chat-title">
        <h1>No chat in this room...</h1>
      </div>

      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index}>
            <h3>{message.username}</h3>
            <p>{message.message}</p>
          </div>
        ))}
      </div>

      <div className="chat-send">
        <input
          type="text"
          placeholder="Message"
          onChange={(event) => setMessage(event.target.value)}
        />
        <button onClick={() => sendMessage()}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
