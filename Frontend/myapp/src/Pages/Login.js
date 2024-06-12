// Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "../Slice/authSlice";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.auth);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    dispatch(register({ email, password }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(login({ email, password })).then((response) => {
      console.log("Login response:", response);
      if (response.meta.requestStatus === "fulfilled") {
        navigate("/Note"); // Adjust this path based on your route configuration
      }
    });
  };

  return (
    <div className="d-flex justify-content-center align-items-center h-100 flex-column">
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Nav variant="pills" className="flex-row justify-content-center">
          <Nav.Item>
            <Nav.Link eventKey="first">Login</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="second">Register</Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content>
          <Tab.Pane eventKey="first">
            <Form className="mt-3" onSubmit={handleLogin}>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="name@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <button className="btn btn-primary w-100" type="submit">
                Submit
              </button>
              {error && <p className="text-danger mt-2">{error}</p>}
            </Form>
          </Tab.Pane>
          <Tab.Pane eventKey="second">
            <Form className="mt-3" onSubmit={handleRegister}>
              <Form.Group className="mb-3" controlId="registerEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="name@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="registerPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="registerConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Group>
              <button className="btn btn-primary w-100" type="submit">
                Register
              </button>
              {error && <p className="text-danger mt-2">{error}</p>}
            </Form>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
}
