import React, { useState, useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Note from "./Pages/Notes/Note";
import Trash from "./Pages/Trasher/Trash";
import Reminder from "./Pages/Remind/Reminder";
import Archieve from "./Pages/Archiever/Archieve";
import LabelDetail from "./Pages/LabelDetail";
import { IoIosArrowRoundBack, IoIosArrowRoundUp } from "react-icons/io";
import { HiDotsVertical } from "react-icons/hi";
import Dropdown from "react-bootstrap/Dropdown";
import Nav from "react-bootstrap/Nav";
import Tab from "react-bootstrap/Tab";
import { FiLink } from "react-icons/fi";
import { FaRegClone } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { ThemeContext } from "./Context/ThemeContext";
import axios from "axios";
import Error from "./Pages/Error";
import Login from "./Pages/Login";

function App() {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`App ${theme}`}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Note" element={<Note />} />
          <Route path="/Trash" element={<Trash />} />
          <Route path="/Reminder" element={<Reminder />} />
          <Route path="/Archieve" element={<Archieve />} />
          <Route path="*" element={<Error />} />
          <Route path="/AllLabel/:productId" element={<LabelDetail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
