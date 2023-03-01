import React from "react";
import Header from "./Header";
import Picker from 'emoji-picker-react';
import CounterDelete from "./components/CounterDelete/CounterDelete";

function Chat({ socket, username, room, exitChat }) {
  const [message, setMessage] = React.useState('');
  const [messages, setMessages] = React.useState([]);
  const [optionChat, setOptionChat] = React.useState("no-remove");
  const [hasSelectedOption, setHasSelectedOption] = React.useState(true);
  const [selectedOption, setSelectedOption] = React.useState("no-remove");
  const [showPicker, setShowPicker] = React.useState(false);

  const sendMessage = async () => {
    if (message === "") return;
    const time =
      new Date(Date.now()).getHours() +
      ":" +
      (new Date(Date.now()).getMinutes() < 10
        ? "0" + new Date(Date.now()).getMinutes()
        : new Date(Date.now()).getMinutes());

    const newMessage = {
      user: username,
      message: message,
      room: room,
      time: time,
      id: messages.length,
    };

    const selectOption = document.getElementById("message-input");
    selectOption.value = "";
    setMessage("");
    await socket.emit("new_message", newMessage);
    setMessages((messages) => [...messages, newMessage]);
  };

  React.useEffect(() => {
    const receiveMessage = (data) => {
      setMessages((messages) => [...messages, data]);
    };

    socket.on("receive_message", receiveMessage);

    socket.on("update_chat_mode", (chatMode) => {
      setSelectedOption(chatMode);
      setOptionChat(chatMode);
    });

    socket.on("update_selected_option", (selectedOption) => {
      setSelectedOption(selectedOption);
      setOptionChat(selectedOption);
    });

    return () => {
      socket.off("receive_message", receiveMessage);
      socket.off("update_chat_mode");
      socket.off("update_selected_option");
    };
  }, [socket]);

  const changeChatMode = async (event) => {
    const chatMode = event.target.value;
    setOptionChat(chatMode);
    setSelectedOption(chatMode);
    setHasSelectedOption(true);
    await socket.emit("change_chat_mode", { room: room, chatMode: chatMode });
    await socket.emit("update_selected_option", chatMode);
  };

  React.useEffect(() => {
    if (hasSelectedOption) {
      const selectOption = document.getElementById("option-selected");
      selectOption.value = optionChat;

      if (optionChat === "20-seconds") {
        setTimeout(() => {
          setMessages([]);
        }, 20000);
      }

      if (optionChat === "10-messages") {
        if (messages.length > 10) {
          setMessages(messages.slice(1));
        }
      }

      if (optionChat === "no-remove") {
        setMessages(messages);
      }
    }
  }, [hasSelectedOption, optionChat]);

  React.useEffect(() => {
    if (hasSelectedOption) {
      const selectOption = document.getElementById("option-selected");
      selectOption.value = optionChat;
      if (optionChat === "10-messages") {
        if (messages.length > 10) {
          setMessages(messages.slice(1));
        }
      }
      if (optionChat === "no-remove") {
        setMessages(messages);
      }
      if (optionChat === "20-seconds") {
        setMessages(messages);
      }
    }
  }, [selectedOption]);

  const disconnectChat = () => {
    socket.emit("exit_chat", { username: username, room: room });
    exitChat();
  };


  const onEmojiClick = (event, emojiObject) => {
    setMessage(message => message + emojiObject.emoji);
    setShowPicker(false);
  };

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
         <div className="picker-container">
        <input
          className="input-style"
          value={message}
        onChange={(event) => setMessage(event.target.value)}
        placeholder="Message"
        id="message-input"
        />
        <img
          className="emoji-icon"
          src="https://icons.getbootstrap.com/assets/icons/emoji-smile.svg"
          onClick={() => setShowPicker(val => !val)} />
        {showPicker && <Picker
          onEmojiClick={onEmojiClick} />}
          <button onClick={() => sendMessage()}>Send</button>
      </div>
    </div>

    <div className="chat-counter-delete">
        <CounterDelete optionChat={optionChat} changeChatMode={changeChatMode} />
      </div>

      <div className="exit-chat">
        <button onClick={disconnectChat}>Exit</button>
      </div>
    </div>
  );
}

export default Chat;
