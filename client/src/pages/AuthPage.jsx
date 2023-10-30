import { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { setCredentials } from "../slices/authSlice";
import { useDispatch } from "react-redux";
import { authInputFields } from "../constants";
import useAxiosFunction from "../hooks/useAxiosFunction";

const AuthPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const location = useLocation();
  const mode = location.pathname.split("/auth/")[1];

  const [authAxiosFetch, authResponse, loading] = useAxiosFunction();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await authAxiosFetch({
      method: "POST",
      url: `/auth/${mode}`,
      requestConfig: user,
    });
  };

  useEffect(() => {
    if (!Array.isArray(authResponse)) {
      dispatch(setCredentials(authResponse));
      navigate("/");
    }
  }, [authResponse]);

  return (
    <div className="w-[400px] mx-auto my-[50px] text-center p-[30px] flex flex-col gap-10">
      <h2 className="capitalize text-4xl font-semibold">{mode}</h2>
      <div className="flex flex-col gap-5">
        {authInputFields.map((input, index) => {
          if (
            mode === "login" &&
            (input.name === "name" || input.name === "confirmPassword")
          )
            return null;
          return (
            <div key={index} className="flex flex-col items-start gap-2">
              <label
                className="text-textLight font-semibold"
                htmlFor={input.name}
              >
                {input.label}
              </label>
              <input
                onChange={handleChange}
                className="border-2 w-[100%] px-4 py-3 rounded-lg "
                id={input.name}
                name={input.name}
                placeholder={input.placeholder}
              />
            </div>
          );
        })}
      </div>
      <button
        disabled={loading}
        onClick={handleSubmit}
        className="capitalize bg-primary text-white w-[100%] py-2 rounded-md font-semibold text-lg disabled:bg-blue-900 disabled:cursor-not-allowed"
      >
        {loading ? "Loading..." : mode}
      </button>
      {mode === "register" ? (
        <p className="flex gap-2 justify-center">
          You have an account?{" "}
          <Link to="/auth/login">
            <span className="text-primary">Login now</span>
          </Link>
        </p>
      ) : (
        <p className="flex gap-2 justify-center">
          Don't have an account yet?{" "}
          <Link to="/auth/register">
            <span className="text-primary">Register now</span>
          </Link>
        </p>
      )}
    </div>
  );
};

export default AuthPage;
