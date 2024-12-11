import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import logo from "../../../app/logo.svg";
import eye from "../../../app/eye.svg";
import eyeClose from "../../../app/eyeClose.svg";
import {
  resetPasswordAsync,
  selectError,
  selectPasswordReset,
} from "../AuthSlice";

export default function ResetPassword() {
  const dispatch = useDispatch();
  const query = new URLSearchParams(window.location.search);
  const email = query.get("email");
  const token = query.get("token");
  const passwordReset = useSelector(selectPasswordReset);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const error = useSelector(selectError);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <>
      {/* {user && <Navigate to={"/"} replace={true}></Navigate>} */}
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
            Reset Password
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            noValidate
            onSubmit={handleSubmit((data) => {
              // console.log(data);
              dispatch(
                resetPasswordAsync({ email, token, password: data.password })
              );
            })}
            className="space-y-6"
          >
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  New Password
                </label>
              </div>
              <div className="mt-2 relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "password is required",
                    pattern: {
                      value:
                        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                      message: `- at least 8 characters\n
                - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number\n
                - Can contain special characters`,
                    },
                  })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <img
                  onClick={() => setShowPassword(!showPassword)}
                  src={showPassword ? eyeClose : eye}
                  className="absolute h-6 z-10 top-[14%] right-2 cursor-pointer"
                />
                {errors && (
                  <p className="text-red-400">{errors?.password?.message}</p>
                )}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm Password
                </label>
              </div>
              <div className="mt-2 relative">
                <input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword", {
                    required: "confirm password",
                    validate: (value, formValues) =>
                      value == formValues.password || "password does not match",
                  })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <img
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  src={showConfirmPassword ? eyeClose : eye}
                  className="absolute h-6 z-10 top-[14%] right-2 cursor-pointer"
                />
                {errors && (
                  <p className="text-red-400">
                    {errors?.confirmPassword?.message}
                    {errors.length > 0 ? errors : ""}
                  </p>
                )}
                {error && <p className="text-red-400">{error}</p>}
              </div>
            </div>
            {passwordReset && (
              <p className="text-green-400">Password Reset successfull</p>
            )}

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
            Take me back to?{" "}
            <Link
              to={"/login"}
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Login?
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}