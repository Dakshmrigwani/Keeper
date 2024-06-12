// App.js
import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Note from "./Pages/Notes/Note";
import Trash from "./Pages/Trasher/Trash";
import Reminder from "./Pages/Remind/Reminder";
import Archieve from "./Pages/Archiever/Archieve";
import LabelDetail from "./Pages/LabelDetail";
import Error from "./Pages/Error";
import Login from "./Pages/Login";
import { ThemeContext } from "./Context/ThemeContext";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`App ${theme}`}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/Note"
            element={
              <ProtectedRoute>
                <Note />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Trash"
            element={
              <ProtectedRoute>
                <Trash />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Reminder"
            element={
              <ProtectedRoute>
                <Reminder />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Archieve"
            element={
              <ProtectedRoute>
                <Archieve />
              </ProtectedRoute>
            }
          />
          <Route
            path="/AllLabel/:productId"
            element={
              <ProtectedRoute>
                <LabelDetail />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
