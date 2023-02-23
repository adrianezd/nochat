import React from 'react'
import Header from './Header'

function Chat({socket, username, room}) {
  return (
    <div>
        <div className='chat-header'>
            <Header username={username} room={room} />
        </div>

        <div className='chat-title'>
            <h1>No chat in this room...</h1>
        </div>

        <div className='chat-messages'>
            <div className='message'>
            </div>
        </div>

        <div className='chat-send'>
            <input type="text" placeholder="Message" />
            <button>Send</button>
        </div>
    </div>
  )
}

export default Chat