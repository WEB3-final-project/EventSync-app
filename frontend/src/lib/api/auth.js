"use client";
import { customFetch } from "@/lib/api-client";
export const login = async (formData)=> {
  let response; 
  try {
    const email = formData.get("email");
    const password = formData.get("password");
    response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("access_token", data.access_token);
      return {status:response.status, success: true};
    }
    return{
      status: response.status,
      success: false,
      message: data.message || "Invalid credentials",
    }
  } catch {
    return { status: response ? response.status : 500, success: false, message: "Can not connect to the server" };
  }
};

export const logout = async() => {
  let response; 
  try {
    response = await customFetch("/auth/logout", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      "Authorization": `Bearer ${getToken()}`,
    });
    const data = await response.json();
    if (response.ok) {      
      localStorage.removeItem("access_token");
      return {status:response.status, success: true};
    }
    return{
      status: response.status,
      success: false,
      message: data.message || "something went wrong",
    }
  } catch {
    return { status: response ? response.status : 500,success: false, message: "Can not connect to the server" };
  }
};

export const getToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("access_token");
};


export const register = async (formData)=> {
  let response; 
  try {
    const profilePicture = formData.get("profilePicture");
    const bio = formData.get("bio");
    const fullName = formData.get("fullName");
    const externalLinks = formData.get("externalLinks");
    const email = formData.get("email");
    const password = formData.get("password");
    const role = formData.get("role");
    let info = {};
    if (role === "SPEAKER") {
      info = { profilePicture, bio, fullName, externalLinks, email, password, role };
    } else if (role === "PARTICIPANT") {
      info = { fullName, email, password, role };
    } else if (role === "ADMIN") {
      info = { email, password, fullName, role };
    }
    response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/signup`, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    if (response.ok) {
      return {status: response.status, success: true , message: "Profile successfully created"};
    }
    return {
      status:response.status,
      success: false,
      message: data.message || "something went wrong",
    };
  } catch {
    return {status:response ? response.status : 500, success: false, message: "Can not connect to the server" };
  }
};