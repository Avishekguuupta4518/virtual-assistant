import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import bg from "../assets/AI1.png";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { userDataContext } from "../context/userContext";
import axios from "axios";

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const { serverUrl,userData, setUserData } = useContext(userDataContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading,setLoading] = useState(false)
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true)

    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/signin`,
        { email, password },
        { withCredentials: true }
      );

      setUserData(result.data);
      // You can save token/user in context here if needed
      setLoading(false)
      navigate("/");
    } catch (error) {
      console.error(error.response?.data || error.message);
      setUserData(null)
      setLoading(false)
      setErr(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div
      className="w-full h-screen bg-cover bg-center flex justify-center items-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <form
        onSubmit={handleSignIn}
        className="w-[90%] max-w-[500px] h-[500px] bg-[#00000062] backdrop-blur-md
                   shadow-lg shadow-black flex flex-col items-center
                   justify-center gap-5 px-6"
      >
        <h1 className="text-white text-[30px] font-semibold">
          Sign In to <span className="text-blue-400">Virtual Assistant</span>
        </h1>

        {/* Email */}
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full h-[60px] outline-none border-2 border-white
                     bg-transparent text-white text-[18px]
                     placeholder-gray-300 px-5 rounded-full"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <div className="w-full h-[60px] border-2 border-white rounded-full
                        flex items-center px-5 relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="w-full h-full outline-none bg-transparent
                       text-white text-[18px]
                       placeholder-gray-300 pr-10"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {showPassword ? (
            <IoEyeOff
              className="absolute right-5 text-white text-xl cursor-pointer"
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <IoEye
              className="absolute right-5 text-white text-xl cursor-pointer"
              onClick={() => setShowPassword(true)}
            />
          )}
        </div>

        {/* Error Message */}
        {err && (
          <p className="text-red-500 text-[17px]">
            *{err}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="min-w-[150px] h-[60px] mt-6 bg-white rounded-full
                     text-[19px] font-semibold text-black
                     hover:bg-gray-200 transition-all"
                      disabled={loading}
        >
          {loading?"Loading...":"Sign In"}
        </button>

        {/* Redirect */}
        <p
          className="text-white text-[18px] cursor-pointer"
          onClick={() => navigate("/signup")}
        >
          Don't have an account?{" "}
          <span className="text-blue-400 font-semibold">Sign Up</span>
        </p>
      </form>
    </div>
  );
}

export default SignIn;
