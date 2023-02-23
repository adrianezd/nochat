import React from "react";

function Header({username, room}) {
  return (
    <div>
      <h3>{username}</h3>
      <h4>{room}</h4>
    </div>
  );
}

export default Header;
