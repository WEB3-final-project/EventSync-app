"use client";
import { useState } from "react";
import { register } from "@/lib/api/auth";
export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [externalLinks, setExternalLinks] = useState("");
  const [role, setRole] = useState("PARTICIPANT");
  const [profilePicture, setProfilePicture] = useState(null);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);

    try {
        const result = await register(new FormData(e.currentTarget));
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
    <form onSubmit={handleRegister}>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <button type="button" onClick={() => window.location.href = "/auth/login"}>Login</button>
      </div>
      <div>
        <select name="role" value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="PARTICIPANT">Participant</option>
            <option value="SPEAKER">Speaker</option>
            <option value="ADMIN">Admin</option>
        </select>
      </div>
      {
        role?(
            <div>
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
                <label>
                    Full Name:
                    <input name="fullName" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} {...role === "SPEAKER" ? { required: true } : null} />
                </label>
                {
                    role === "SPEAKER" && (
                        <>
                            <label>
                                Bio:
                                <textarea name="bio" value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Bio (for speakers)" />
                            </label>
                            <label>
                                External Links:
                                <input name="externalLinks" type="text" value={externalLinks} onChange={(e) => setExternalLinks(e.target.value)} placeholder="External Links (for speakers)" />
                            </label>
                            <label>
                                Profile Picture:
                                <input name="profilePicture" type="file" accept=".png, .jpg, .jpeg, .jfif" onChange={(e) => setProfilePicture(e.target.files[0])} />
                            </label>
                        </>
                    )
                }
            </div>
        ):(
            <p>Please select a role to see the registration form.</p>
        )
      }
      <button type="submit">Register</button>
    </form>
  );
}
