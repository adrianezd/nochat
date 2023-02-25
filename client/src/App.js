import './App.css';
import io from 'socket.io-client';
import { useState,useContext } from 'react';
import Chat from './Chat';
import { UserContext } from './Context';

const socket = io.connect('http://localhost:3001');


function App() {
  const [username,setUsername]  = useState("User" + Math.floor(Math.random() * 1000));
  const [room,setRoom] = useState("");
  const roomActive = false

  const joinRoom = () => {
    socket.emit('join', {username,room});
    roomActive = true;
    
  }

  return (
    
    <div className="App">
    <UserContext.Provider room={roomActive}>
      <div>
        <h1>Socket.io Client</h1>
        <input type="text" placeholder="Username" required value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="text" placeholder="Room" required value={room} onChange={(e) => setRoom(e.target.value)} />
        <button onClick={() => joinRoom()}>Join</button>
        <Chat socket={socket} username={username} room={room} />
      </div>
      </UserContext.Provider>
    </div>
  );
}

export default App;
 