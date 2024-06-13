import React, { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const useLogout = () => {
  const [loading, setloading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const nav = useNavigate();
  const logout = async () => {
    setloading(true);
    try {
      await axios.post("/api/auth/logout");
      localStorage.removeItem("chat-user");
      setAuthUser(null);
      nav("/login");
    } catch (error) {
      toast.error(error.messege);
    } finally {
      setloading(false);
    }
  };
  return { loading, logout };
};

export default useLogout;
