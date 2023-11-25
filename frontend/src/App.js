import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Editor, Login, DrawingPanel } from "./components";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<Editor />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
