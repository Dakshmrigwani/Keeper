import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import Form from "react-bootstrap/Form";
import { userapi } from "../api";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { FaGoogle } from "react-icons/fa";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registrationMessage, setRegistrationMessage] = useState("");

  const { loginWithRedirect, logout } = useAuth0();

  const Navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await axios.post(`${userapi}/register`, {
        email,
        password,
        confirmPassword,
      });
      setRegistrationMessage(response.data.message);
      console.log(registrationMessage);
    } catch (error) {
      // Handle error
      console.error("Registration failed:", error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${userapi}/login`, {
        email,
        password,
      });
      console.log(response);
      if (response.status === 200) {
        // Extract tokens from the response data
        const { accessToken, refreshToken } = response.data.data;
        
        // Store tokens in localStorage or any state management solution
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
  
        // Redirect to the desired page
        Navigate("/Note");
      }
      setRegistrationMessage(response.data.message);
      console.log(registrationMessage);
    } catch (error) {
      // Handle error
      console.error("Login failed:", error);
    }
  };
  
  return (
    <>
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
              <Form
                className="mt-3"
                onSubmit={(e) => {
                  e.preventDefault(); // Prevent default form submission
                  handleLogin(); // Call the handleLogin function
                }}
              >
                
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
                <button
                  className="btn btn-primary w-100"
                  type="submit"
                 
                >
                  Submit
                </button>
                <div className="mt-3 d-flex flex-column  justify-content-center align-items-center">
                  <p>or</p>
                  <span onClick={(e) => loginWithRedirect()}>
                    <FaGoogle size={"24px"} />{" "}
                  </span>
                </div>
              </Form>
            </Tab.Pane>
            <Tab.Pane eventKey="second">
              <Form className="mt-3">
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
                <Form.Group
                  className="mb-3"
                  controlId="registerConfirmPassword"
                >
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Form.Group>
                <button
                  className="btn btn-primary w-100"
                  onClick={handleRegister}
                >
                  Register
                </button>
              </Form>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </div>
    </>
  );
}
