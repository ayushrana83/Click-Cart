import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { loginUserAsync, selectError, selectIfUser, selectLoggedInUser } from "../AuthSlice";
import { useAlert } from "react-alert";
import logo from "../../../app/logo.svg";
import eye from "../../../app/eye.svg";
import eyeClose from "../../../app/eyeClose.svg";

export default function Login() {
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const user = useSelector(selectLoggedInUser);
  const [showPassword, setShowPassword] = useState(false);

  const alert = useAlert();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // console.log(user);
  return (
    <>
      {user && <Navigate to={"/"} replace={true}></Navigate>}

      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Link to={"/"}>
            <img
              alt="Your Company"
              src={logo}
              className="mx-auto h-16 w-auto"
            />
          </Link>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Login to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            noValidate
            onSubmit={handleSubmit((data) => {
              dispatch(
                loginUserAsync({ email: data.email, password: data.password })
              );
              // console.log("selectloggedinuser",selectIfUser);
              if(selectIfUser != null)
              {
                alert.success("Login Succesfull");
              }
              else
              {
                alert.error("Login failed");
              }

              // console.log(data);
            })}
            className="space-y-6"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  {...register("email", { required: "email required" })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <p className="text-red-500">{errors?.email?.message}</p>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <Link
                    to={"/forgot-password"}
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2 relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password", { required: "password required" })}
                  className=" w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <img
                  onClick={() => setShowPassword(!showPassword)}
                  src={showPassword ? eyeClose : eye}
                  className="absolute h-6 z-10 top-[14%] right-2 cursor-pointer"
                />
                {!error && (
                  <p className="text-red-400">
                    {errors?.password?.message || error}
                  </p>
                )}
                <p className="text-red-400">{error?.message}</p>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <Link
              to={"/signup"}
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Create an Account?
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
