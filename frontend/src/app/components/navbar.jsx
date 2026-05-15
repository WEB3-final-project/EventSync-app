"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { logout } from "@/services/auth";
export default function Navbar() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await logout();
      if (response.success) {
        router.push("/auth/login");
        router.refresh();
      }
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <nav style={navStyle}>
      <Link href="/"><h1>EventSync</h1></Link>
      <div>
        <Link href="/profile" style={{ marginRight: "15px" }}>Profile</Link>
        <button onClick={handleLogout} style={logoutBtnStyle}>
          Logout
        </button>
      </div>
    </nav>
  );
}

const navStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "1rem 2rem",
  backgroundColor: "#333",
  color: "white",
};

const logoutBtnStyle = {
  backgroundColor: "#ff4d4d",
  color: "white",
  border: "none",
  padding: "8px 15px",
  borderRadius: "5px",
  cursor: "pointer",
};