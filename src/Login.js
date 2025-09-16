import React from "react";
import "./Login.css";

const Login = () => {
  return (
    <div className="page">
      <h1>Login Page</h1>
      <Carousel />
    </div>
  );
};

const Carousel = () => {
  return (
    <div className="carousel">
      <div className="carousel-item">Slide 1: Welcome to Login</div>
      <div className="carousel-item">Slide 2: Secure and Fast</div>
      <div className="carousel-item">Slide 3: Manage Certificates</div>
    </div>
  );
};

export default Login;
