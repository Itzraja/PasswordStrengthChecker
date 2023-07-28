import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import "./App.css";

const containerStyle = {
  background: "#f8f9fa",
  padding: "20px",
  borderRadius: "5px",
  maxWidth: "800px",
  margin: "0 auto",
  marginTop: "50px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
};

const buttonStyle = {
  margin: "16px",
};

function PasswordStrengthCalculator() {
  const [password, setPassword] = useState("");
  const [minSteps, setMinSteps] = useState(null);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const body = { password };
    try {
      const response = await axios.post(
        "http://localhost:5000/api/password-strength",
        body
      );
      const data = response.data;
      console.log(response.data)
      setMinSteps(data.data);
    } catch (error) {
      console.error("Error calculating password strength:", error);
    }
  };

  return (
    <Container className="App" style={containerStyle}>
      <Row>
        <Col>
          <h1 className="text-center">Password Strength Calculator</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type=""
                value={password}
                onChange={handlePasswordChange}
              />
            </Form.Group>
            <div className="d-flex justify-content-center">
              <Button className="btn" type="submit" style={buttonStyle}>
                Calculate
              </Button>
            </div>
          </Form>
          {minSteps !== null && (
            <div className="text-center mt-3">
              <p>Password strength: {minSteps === 0 ? "Strong" : "Weak"}</p>
              <p>
                Minimum steps required to make the password strong: {minSteps}
              </p>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default PasswordStrengthCalculator;
