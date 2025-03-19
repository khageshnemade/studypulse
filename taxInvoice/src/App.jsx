import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Invoice from "./Invoice";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Invoice />
    </>
  );
}

export default App;
