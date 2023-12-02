import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Editor,
  Login,
  MainPage,
  UserPage,
  UpdateEditor,
  PostDetails,
} from "./components";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<Editor />} />
      <Route path="/login" element={<Login />} />
      <Route path="/feed" element={<MainPage />} />
      <Route path="/user/:user" element={<UserPage />} />
      <Route path="/edit/:id" element={<UpdateEditor />} />
      <Route path="/post/:id" element={<PostDetails />} />
    </Routes>
  );
}

export default App;
