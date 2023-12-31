"use client";

import { useState } from "react";
import { API_URL } from "@/config/apiUrl";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export const useLogin = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loginData, setloginData] = useState({
    email: "",
    password: "",
  });

  // console.log(registerData);

  function handleChange(e) {
    const { name, value } = e.target;
    setloginData({ ...loginData, [name]: value });
  }

  async function handleSubmitLogin() {
    setLoading(true);
    const { email, password } = loginData;
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    console.log(data);

    Cookies.set("token", data.token);

    if (!data) {
      setLoading(false);
      toast.error("Error Login!");
      return;
    }
    setLoading(false);
    toast.success("Login succesfully, redirecting...");
    setTimeout(() => router.push("/dashboard"), 2000);
  }

  return { loading, handleChange, handleSubmitLogin };
};
