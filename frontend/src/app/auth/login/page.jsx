"use client";
import { useState } from "react";
import { login } from "@/lib/api/auth";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
        const result = await login(new FormData(e.currentTarget));
        if (result.success) {
          window.location.href = "/";
        } else {
          setError(result.message || "something went wrong");
        }

    } catch (err) {
      setError("Can not connect to the server");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <label>
        Email:
        <input name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>
      <label>
        Password:
        <input name="password" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="button" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? "Hide" : "Show"} Password
        </button>
      </label>
      <div>
        
      </div>
      <div>
        <button type="submit">Login</button>
        <button type="button" onClick={() => window.location.href = "/auth/register"}>Register</button>
      </div>
    </form>
  );
}
