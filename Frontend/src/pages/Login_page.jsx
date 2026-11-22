import React, { useState, useContext } from "react";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

const Login_page = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/login", {
        email,
        pass,
      });
      setUser(res.data.user);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="select-none">
      <div className="page flex flex-col items-center h-screen w-full bg-[#FCECED] justify-center gap-8">
        <div className="heading">
          <div className="header flex justify-center items-center">
            <Icon icon="withicons-bauhaus:hexagon" height="3em" />
            <h1 className="text-3xl font-semibold">LeadManager</h1>
          </div>

          <div className="para">
            <p>Manage Leads Your The Effecient Way</p>
          </div>
        </div>

        <div className="form bg-white flex flex-col gap-4 py-4 rounded-[12px]">
          <div className="px-6">
            <div className="flex bg-[#FCECED] p-1 rounded-[8px]">
              <button
                type="button"
                className="w-1/2 py-1.5 text-center bg-white text-black font-semibold rounded-[6px] shadow-sm cursor-pointer"
              >
                Sign In
              </button>
              <Link
                to={"/register"}
                type="button"
                className="w-1/2 py-1.5 text-center text-gray-600 rounded-[6px] cursor-pointer"
              >
                Sign Up
              </Link>
            </div>
          </div>

          <div className="px-6">
            <h1 className="text-2xl font-semibold">Welcome Back</h1>
            <p className="text-gray-600">Login To Manage Your Leads</p>
          </div>
          <form onSubmit={submitHandler} className="flex flex-col gap-4">
            
            <div className="form flex flex-col gap-3">
              <div className="email flex flex-col px-6 gap-1">
                <label>Work Email</label>
                <div className="relative">
                  <Icon
                    icon="line-md:email"
                    height="1.2em"
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-900"
                  />
                  <input
                    className="bg-[#FCECED] w-full py-2 pl-10 pr-3 rounded-[8px]"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="John@example.com"
                    required
                  />
                </div>
              </div>

              <div className="pass flex flex-col px-6 gap-1">
                <label>Password</label>
                <div className="relative">
                  <Icon
                    icon="line-md:security"
                    height="1.2em"
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 text-black"
                  />
                  <input
                    className="bg-[#FCECED] w-full py-2 pl-10 pr-3 rounded-[8px]"
                    type="password"
                    name="pass"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    placeholder="*********"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="remember px-6 flex  items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                className="size-4 cursor-pointer"
              />
              <label
                htmlFor="remember"
                className="text-gray-600 text-sm cursor-pointer"
              >
                Remember me
              </label>
              <div className="ml-auto">
                {error && <p className="text-red-600 text-sm px-6">{error}</p>}
              </div>
            </div>

            <hr className="w-[450px]" />
            <div className="Create px-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#BA002A] p-2 text-white rounded-[10px] font-bold flex items-center justify-center gap-2 cursor-pointer transition-transform duration-300 ease-out hover:scale-105 active:scale-95 active:duration-75"
              >
                <span>{loading ? "Signing In..." : "Sign In"}</span>
                <Icon icon="ph:arrow-right-bold" height="1.3em" />
              </button>
            </div>

            <div className="text-center">
              <p className="text-gray-600 text-sm">
                Don't have an account?{" "}
                <Link
                  to={"/register"}
                  className="text-[#BA002A] font-semibold cursor-pointer"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login_page;
