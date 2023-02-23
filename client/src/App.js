import './App.css';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

function App() {
  return (
    <div className="App">
      <div>
        <h1>Socket.io Client</h1>
        <button onClick={() => socket.emit('message', 'Hello World!')}>Send Message</button>
      </div>
    </div>
  );
}

export default App;
