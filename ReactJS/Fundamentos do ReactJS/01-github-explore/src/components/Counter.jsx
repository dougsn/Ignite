import { useState } from "react";

// Componente feito para visualizar a mudança de estado.

export function Counter() {
  const [counter, setCounter] = useState(0);

  function increment() {
    // Mudando o estado.
    setCounter(counter + 1);
  }

  return (
    <div>
      <h2>{counter}</h2>
      <button type="button" onClick={increment}>
        Increment
      </button>
    </div>
  );
}
