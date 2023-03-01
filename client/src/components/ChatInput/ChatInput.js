import React from 'react';
import Picker from 'emoji-picker-react';

function ChatInput(props) {
  const [message, setMessage] = React.useState('');
  const [messages, setMessages] = React.useState([]);
  const [optionChat, setOptionChat] = React.useState("no-remove");
  const [hasSelectedOption, setHasSelectedOption] = React.useState(true);
  const [selectedOption, setSelectedOption] = React.useState("no-remove");
  const [showPicker, setShowPicker] = React.useState(false);

  const onEmojiClick = (event, emojiObject) => {
    setMessage(message => message + emojiObject.emoji);
    setShowPicker(false);
  };

  const sendMessage = () => {
    const newMessages = messages.concat(message);
    setMessages(newMessages);
    setMessage('');
  }


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

  return (
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
          onClick={() => setShowPicker(val => !val)}
        />
        {showPicker && <Picker onEmojiClick={onEmojiClick} />}
        <button onClick={() => sendMessage()}>Send</button>
      </div>
    </div>
  );
}

export default ChatInput;