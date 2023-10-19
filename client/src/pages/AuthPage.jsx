import React from "react";
import { useParams, Link } from "react-router-dom";

const AuthPage = () => {
  const { mode } = useParams();
  const inputFields = [
    {
      label: "Name",
      name: "name",
      placeholder: "Enter name",
    },
    {
      label: "Email address",
      name: "email",
      placeholder: "Enter email",
    },
    {
      label: "Password",
      name: "password",
      placeholder: "Enter password",
    },
    {
      label: "Confirm password",
      name: "confirmPassword",
      placeholder: "Confirm password",
    },
  ];
  return (
    <div className="w-[400px] mx-auto my-[50px] text-center p-[30px] flex flex-col gap-10">
      <h2 className="capitalize text-4xl font-semibold">{mode}</h2>
      <div className="flex flex-col gap-5">
        {inputFields.map((input) => {
          if (
            mode === "login" &&
            (input.name === "name" || input.name === "confirmPassword")
          )
            return null;
          return (
            <div className="flex flex-col items-start gap-2">
              <label
                className="text-textLight font-semibold"
                htmlFor={input.name}
              >
                {input.label}
              </label>
              <input
                className="border-2 w-[100%] px-4 py-3 rounded-lg "
                id={input.name}
                name={input.name}
                placeholder={input.placeholder}
              />
            </div>
          );
        })}
      </div>
      <button className="capitalize bg-primary text-white w-[100%] py-2 rounded-md font-semibold text-lg">
        {mode}
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
