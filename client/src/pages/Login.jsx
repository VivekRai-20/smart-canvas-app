import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3001/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (data.token) {
  localStorage.setItem("token", data.token);
  navigate("/dashboard");
} else {
  alert(data.msg || "Login failed");
}
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">✏️</div>
        <h1 className="auth-title">Smart Canvas</h1>
        <p className="auth-subtitle">Draw. Detect. Perfect.</p>

        <form onSubmit={handleSubmit}>
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

          <button type="submit" className="btn btn-primary">Login</button>
        </form>

        <p className="auth-link" onClick={() => navigate("/register")}>
          New user? <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Register</span>
        </p>
      </div>
    </div>
  );
};

export default Login;