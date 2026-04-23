import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:3001/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    alert("Registered successfully");
    navigate("/");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">🎨</div>
        <h1 className="auth-title">Create Account</h1>
        <p className="auth-subtitle">Join Smart Canvas today</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              className="form-input"
              placeholder="Username"
              onChange={(e) =>
                setForm({ ...form, username: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <input
              className="form-input"
              placeholder="Email"
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <input
              className="form-input"
              type="password"
              placeholder="Password"
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
          </div>

          <button type="submit" className="btn btn-primary">Register</button>
        </form>

        <p className="auth-link" onClick={() => navigate("/")}>
          Already have an account? <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Login</span>
        </p>
      </div>
    </div>
  );
};

export default Register;