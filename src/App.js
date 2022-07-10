import React from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import { BrowserRouter as Router , Routes, Route } from 'react-router-dom'
import CheckOut from "./components/CheckOut";
import Login from "./components/Login";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/check_out" element={<CheckOut />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
