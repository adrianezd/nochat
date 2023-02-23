import React from 'react'
import Header from './Header'

function Chat({socket, username, room}) {
  return (
    <div>
        <Header username={username} room={room} />
        <h1>Chat</h1>
    </div>
  )
}

export default Chat