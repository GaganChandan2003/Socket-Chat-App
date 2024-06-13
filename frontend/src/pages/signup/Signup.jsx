import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useAuthContext } from "../../context/AuthContext";

const Signup = () => {
  const [inputs, setinputs] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const [loading, setloading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let { firstName, lastName, userName, password, confirmPassword, gender } =
      inputs;
    if (
      !firstName ||
      !lastName ||
      !userName ||
      !password ||
      !confirmPassword ||
      !gender
    ) {
      toast.error("Make sure to fill in all required fields.");
      return;
    }
    setloading(true);
    try {
      await axios
        .post("/api/auth/signup", {
          fullName: firstName + " " + lastName,
          userName,
          password,
          confirmPassword,
          gender,
        })
        .then((res) => {
          localStorage.setItem("chat-user", JSON.stringify(res.data));
          setAuthUser(res.data);
          toast.success("Signedup successfully");
        });
    } catch (error) {
      console.log(error.response);
      toast.error(error?.response?.data?.error);
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <Toaster position="top-center" />
      <div className="w-9/12 p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Register
          {/* <br /> */}
          {/* <span className="text-blue-500 text-2xl">ChatApp</span> */}
        </h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="flex gap-4">
            <div className="mt-3">
              <label className="label p-2">
                <span className="text-base label-text">First name</span>
              </label>
              <input
                type="text"
                placeholder="Enter your first name"
                className="input input-bordered w-full max-w-xl h-10"
                value={inputs?.firstName}
                onChange={(e) =>
                  setinputs({ ...inputs, firstName: e.target.value })
                }
              />
            </div>
            <div className="mt-3">
              <label className="label p-2">
                <span className="text-base label-text">Last name</span>
              </label>
              <input
                type="text"
                placeholder="Enter your last name"
                className="input input-bordered w-full max-w-xl h-10"
                value={inputs?.lastName}
                onChange={(e) =>
                  setinputs({ ...inputs, lastName: e.target.value })
                }
              />
            </div>
          </div>
          <div className="mt-3">
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              className="input input-bordered w-full max-w-xl h-10"
              value={inputs?.userName}
              onChange={(e) =>
                setinputs({ ...inputs, userName: e.target.value })
              }
            />
          </div>
          <div className="mt-3">
            <label className="label p-2">
              <span className="text-base label-text">Gender</span>
            </label>
            <div className="flex justify-around">
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text mr-3">Male</span>
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    onChange={(e) =>
                      setinputs({ ...inputs, gender: e.target.value })
                    }
                    className="radio radio-primary"
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text mr-3">Female</span>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    onChange={(e) =>
                      setinputs({ ...inputs, gender: e.target.value })
                    }
                    className="radio radio-primary"
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="mt-3">
              <label className="label p-2">
                <span className="text-base label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="input input-bordered w-full max-w-xl h-10"
                value={inputs?.password}
                onChange={(e) =>
                  setinputs({ ...inputs, password: e.target.value })
                }
              />
            </div>
            <div className="mt-3">
              <label className="label p-2">
                <span className="text-base label-text">Confirm password</span>
              </label>
              <input
                type="password"
                placeholder="Confirm password"
                className="input input-bordered w-full max-w-xl h-10"
                value={inputs?.confirmPassword}
                onChange={(e) =>
                  setinputs({ ...inputs, confirmPassword: e.target.value })
                }
              />
            </div>
          </div>

          <a
            href="/login"
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
          >
            Already have an account?
          </a>
          <div>
            <button
              className="btn btn-block btn-sm mt-5 h-10"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-bars"></span>
              ) : (
                "Register"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
