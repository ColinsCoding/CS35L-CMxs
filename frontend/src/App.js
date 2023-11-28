import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Editor, Login, DrawingPanel } from "./components";
import MainPage from './components/MainPage';
import UserPage from "./components/UserPage";


function App() {
  return (
    <Routes>
      <Route path="/*" element={<Editor />} />
      <Route path="/login" element={<Login />} />
      <Route path="/feed" element={<MainPage />} />
      <Route path="/user/:user" element={<UserPage />} />
    </Routes>
  );
}

export default App;