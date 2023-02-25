import React from "react";
import Header from "./Header";

function Chat({ socket, username, room }) {
  const [message, setMessage] = React.useState();
  const [messages, setMessages] = React.useState([]);
  const [optionChat, setOptionChat] = React.useState("no-chat");
  const [hasSelectedOption, setHasSelectedOption] = React.useState(false);

  const sendMessage = async () => {
    if (message === "") return;
    const time =
      new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes();
    const newMessage = {
      user: username,
      message: message,
      room: room,
      time: time,
      id: messages.length,
    };

    await socket.emit("new_message", newMessage);
    setMessages((messages) => [...messages, newMessage]);
    setMessage("");
  };

  React.useEffect(() => {
    const receiveMessage = (data) => {
      setMessages((messages) => [...messages, data]);
    };

    socket.on("receive_message", receiveMessage);

    return () => {
      socket.off("receive_message", receiveMessage);
    };
  }, [socket]);

  const changeChatMode = () => {
    var selectBox = document.getElementById("option-selected");
    setOptionChat(selectBox.value);
    setHasSelectedOption(true);
  };

  React.useEffect(() => {
    if (hasSelectedOption) {
      alert("Chat mode changed to " + optionChat);
    }
  }, [hasSelectedOption, optionChat]);

  return (
    <div>
      {
        <div className="chat-header">
          <Header username={username} room={room} />
        </div>
      }
      <div className="chat-title">
        <h1>No chat in this room...</h1>
      </div>

      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index}>
            <h5>{message.time}</h5>
            <h3>{message.user}</h3>
            <p>{message.message}</p>
            <h6>-----------------</h6>
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

      <div className="chat-counter-delete">
        <div>
          <select id="option-selected" onChange={changeChatMode}>
            <option value="no-remove">Don't remove messages</option>
            <option value="20-seconds">20 seconds to remove</option>
            <option value="10-messages">10 messages to remove</option>
          </select>
        </div>
      </div>
    </div>
  );
}


export default Chat;
