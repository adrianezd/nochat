import React, { useState } from "react";

function CounterDelete(props) {
  const [count, setCount] = useState(0);

  function handleIncrement() {
    setCount(count + 1);
  }

  function handleDelete() {
    props.onDelete();
    setCount(0);
  }

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default CounterDelete;