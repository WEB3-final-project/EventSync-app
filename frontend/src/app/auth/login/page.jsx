"use client";
import { useState } from "react";
import { login } from "@/services/auth";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

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
      <input name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Login</button>
    </form>
  );
}
