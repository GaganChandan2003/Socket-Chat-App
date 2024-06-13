import axios from "axios";
import React, { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

const Login = () => {
  const [userName, setuserName] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userName || !password) {
      toast.error("Make sure to fill in all required fields.");
      return;
    }
    setloading(true);
    try {
      await axios
        .post("/api/auth/login", { userName, password })
        .then((res) => {
          localStorage.setItem("chat-user", JSON.stringify(res.data));
          setAuthUser(res.data);
          toast.success("Logged in successfully");
        });
    } catch (error) {
      toast.error(error?.response?.data?.error);
    } finally {
      setloading(false);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-10/12 p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Login
          <br />
          <span className="text-blue-500 text-2xl">ChatApp</span>
        </h1>
        <form action="" onSubmit={handleSubmit}>
          <div className="mt-3">
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              class="input input-bordered w-full max-w-xl h-10"
              value={userName}
              onChange={(e) => setuserName(e.target.value)}
            />
          </div>
          <div className="mt-3">
            <label className="label p-2">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Type here"
              class="input input-bordered w-full max-w-xl h-10"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>
          <a
            href="/signup"
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
          >
            Don't have an account?
          </a>
          <div>
            <button
              type="submit"
              className="btn btn-block btn-sm mt-5 h-10"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-bars"></span>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
