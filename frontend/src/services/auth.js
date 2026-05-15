"use client";
import { customFetch } from "@/lib/api-client";
export const login = async (formData)=> {
  try {
    const email = formData.get("email");
    const password = formData.get("password");
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("access_token", data.access_token);
      return {status:200, success: true};
    }
    return{
      status: response.status,
      success: false,
      message: data.message || "Invalid credentials",
    }
  } catch {
    return { status: 500,success: false, message: "Can not connect to the server" };
  }
};

export const logout = async() => {
  try {
    const response = await customFetch("/auth/logout", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      "Authorization": `Bearer ${getToken()}`,
    });
    const data = await response.json();
    if (response.ok) {      
      localStorage.removeItem("access_token");
      return {status:204, success: true};
    }
    return{
      status: response.status,
      success: false,
      message: data.message || "something went wrong",
    }
  } catch {
    return { status: 500,success: false, message: "Can not connect to the server" };
  }
};

export const getToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("access_token");
};


export const register = async (
  full_name,
  email,
  password,

)=> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        { full_name,
          email,
         password }
        ),
    });
    const result = await response.json();
    if (response.ok) {
      return {status:201, success: true , message: "Profil enregistré"};
    }
    let errorMessage = '';

if (result.message) {
  errorMessage = result.message;
} 
else if (result.non_field_errors) {
  const err = result.non_field_errors[0];

  if (typeof err === "string") {
    errorMessage = err;
  } else if (err.message) {
    errorMessage = err.message;
  }
} 
else if (result.email) {
  errorMessage = result.email[0];
}
else if (result.password) {
  errorMessage = result.password[0];
}
else if (result.full_name) {
  errorMessage = result.full_name[0];
}
    else{
      return {
      status:400,
      success: false,
      message: "Une erreur est survenue",
    };
    }
    return {
      status:response.status,
      success: false,
      message: errorMessage,
    };
  } catch {
    return {status:500, success: false, message: "Erreur de connexion au serveur" };
  }
};