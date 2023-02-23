import './App.css';
import io from 'socket.io-client';
import { useState } from 'react';

const socket = io.connect('http://localhost:3001');


function App() {
  const [username,setUsername]  = useState("User" + Math.floor(Math.random() * 1000));
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [room,setRoom] = useState("");

  const joinRoom = () => {
    socket.emit('join', {username,room});
  }

  return (
    <div className="App">
      <div>
        <h1>Socket.io Client</h1>
        <input type="text" placeholder="Username" required value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="text" placeholder="Room" required value={room} onChange={(e) => setRoom(e.target.value)} />
        <button onClick={() => joinRoom()}>Join</button>
        {/* <button onClick={() => socket.emit('message', 'Hello World!')}>Send Message</button> */}
      </div>
    </div>
  );
}

export default App;
 