import "./App.css";

import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Company from "./Components/Company";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/company" element={<Company itemsPerPage={5} />} />
      </Routes>
    </>
  );
}

export default App;