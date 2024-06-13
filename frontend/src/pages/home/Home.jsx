import React, { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import { MessageContainer } from "../../components/messages/MessageContainer";
import axios from "axios";
import { useAuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [loading, setloading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const nav = useNavigate();
  const logout = async () => {
    setloading(true);
    try {
      axios.post("http://localhost:8000/api/auth/logout");
      localStorage.removeItem("chat-user");
      setAuthUser(null);
      nav("/login");
    } catch (error) {
      toast.error(error);
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      <Sidebar />
      <MessageContainer />
    </div>
  );
};

export default Home;
