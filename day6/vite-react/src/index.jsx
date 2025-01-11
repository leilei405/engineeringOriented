import React from "react";
import { createRoot } from "react-dom/client";

function App() {
  return (
    <div>
      <h1>Hello Vite React</h1>
      <ul>
        {[1, 2, 3, 4, 5].map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

const container = document.getElementById('root');
createRoot(container).render(<App />);
