import './App.css';
import io from 'socket.io-client';
import { useState,useContext } from 'react';
import Chat from './Chat';

const socket = io.connect('http://localhost:3001');


function App() {
  const [username,setUsername]  = useState("User" + Math.floor(Math.random() * 1000));
  const [room,setRoom] = useState("");
  const [roomActive, setRoomActive] = useState(false)

  const joinRoom = () => {
    if(room === "") return;
    socket.emit('join', {username,room});
    setRoomActive(true);
  }

  const exitChat = () => {
    socket.emit("exit_chat", { username: username, room: room });
    setRoomActive(false);
  };

  return (
    
    <div className="App">
      <div>
        <h1>Socket.io Client</h1>
        <input type="text" placeholder="Username" required value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="text" placeholder="Room" required value={room} onChange={(e) => setRoom(e.target.value)} />
        <button onClick={() => joinRoom()}>Join</button>
        {
          roomActive ? <Chat exitChat={exitChat} socket={socket} username={username} room={room} /> : null
        }
      </div>
      
    </div>
  );
}

export default App;
 