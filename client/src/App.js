import './App.css';
import io from 'socket.io-client';
import { useState } from 'react';
import Chat from './Chat';

const socket = io.connect('http://localhost:3001');


function App() {
  const [username,setUsername]  = useState("");
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
        <Chat socket={socket} username={username} room={room} />
      </div>
    </div>
  );
}

export default App;
 