import React from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const Register_page = () => {
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
              <Link to={"/login"}
                type="button"
                className="w-1/2 py-1.5 text-center text-gray-600 rounded-[6px] cursor-pointer"
              >
                Sign In
              </Link>
              <button
                type="button"
                className="w-1/2 py-1.5 text-center bg-white text-black font-semibold rounded-[6px] shadow-sm cursor-pointer"
              >
                Sign Up
              </button>
            </div>
          </div>

          <div className="px-6">
            <h1 className="text-2xl font-semibold">Create Your Account</h1>
            <p className="text-gray-600">
              Start Creating Your Account By Filling Necessary Details
            </p>
          </div>
          <form className="flex flex-col gap-4" action="">
            <div className="form flex flex-col gap-3">
              <div className="name flex flex-col px-6 gap-1">
                <label>Full Name</label>
                <div className="relative">
                  <Icon
                    icon="line-md:account"
                    height="1.2em"
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-900"
                  />
                  <input
                    className="bg-[#FCECED] w-full py-2 pl-10 pr-3 rounded-[8px]"
                    type="text"
                    placeholder="John Doe"
                  />
                </div>
              </div>

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
                    placeholder="John@example.com"
                  />
                </div>
              </div>

              <div className="pass flex flex-col px-6 gap-1">
                <label>Create Password</label>
                <div className="relative">
                  <Icon
                    icon="line-md:security"
                    height="1.2em"
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-900"
                  />
                  <input
                    className="bg-[#FCECED] w-full py-2 pl-10 pr-3 rounded-[8px]"
                    type="password"
                    placeholder="*********"
                  />
                </div>
              </div>
            </div>
            <div className="tnc px-6 flex items-center gap-1">
              <input className="size-4" type="checkbox" name="tnc" id="tnc" />
              <label>
                I agree to the{" "}
                <span className="text-[#BA002A]">
                  <a href="https://merufintech.com/about" target="_blank">
                    Terms and Conditions
                  </a>
                </span>{" "}
                &{" "}
                <span className="text-[#BA002A]">
                  <a href="https://merufintech.com/about" target="_blank">
                    Privacy Policy
                  </a>
                </span>
              </label>
            </div>
            <div className="Create px-6">
              <button
                type="submit"
                className="w-full bg-[#BA002A] p-2 text-white rounded-[10px] font-bold flex items-center justify-center gap-2 cursor-pointer transition-transform duration-300 ease-out hover:scale-105 active:scale-95 active:duration-75"
              >
                <span>Create Account</span>
                <Icon icon="ph:arrow-right-bold" height="1.3em" />
              </button>
            </div>

            <div className="text-center">
              <p className="text-gray-600 text-sm">
                Already registered?{" "}
                <Link to={"/login"} className="text-[#BA002A] font-semibold cursor-pointer">
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register_page;
