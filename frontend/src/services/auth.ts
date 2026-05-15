"use client";

export const login = async (formData: FormData)=> {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const response = await fetch(`${process.env.API_BASE_URL}/auth/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    const accessType = "public"
    if (response.ok) {
      localStorage.setItem("access_token", data.access);
      return {status:200, success: true};
    }
    if(response.status == 404){
      return{
        message:"credentials not found",
        success: false,
        status:404
    }
    }return{
      status: response.status,
      success: false,
      message: data.message || "Invalid credentials",
    }
  } catch {
    return { status: 500,success: false, message: "Can not connect to the server" };
  }
};

export const logout = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("access_token");
};

export const getToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("access_token");
};


export const publicRegister = async (
  full_name: string,
  email: string,
  phone: string,
  type_entite: string,
  nif: string,
  password: string,

): Promise<RegisterResult> => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/create/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        { full_name,
          email,
          phone,
          type_entite,
          nif,
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
else if (result.phone) {
  errorMessage = result.phone[0];
}
else if (result.full_name) {
  errorMessage = result.full_name[0];
}
else if (result.type_entite) {
  errorMessage = result.type_entite[0];
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
export const isUCPDomain = (email: string): boolean => {
  if (!email || !email.includes('@')) return false;
  const domain = email.split('@')[1].toLowerCase();

  return domain === "ucp.mg";
};