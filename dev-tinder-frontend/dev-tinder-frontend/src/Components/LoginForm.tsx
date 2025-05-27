"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { setIsLogIn, userLogin } from "../redux/slices/authSlice";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "../hooks/reduxHook";
import { Inputs } from "../types/authTypes";
import Link from "next/link";
const LoginForm = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  const onHandleSubmit = async (data: Inputs) => {
    try {
      await dispatch(userLogin(data));
      dispatch(setIsLogIn(true));
      router.push("/");
      // console.log(res, "res");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="flex items-center justify-center h-[70vh] w-screen">
        <div className="card bg-neutral text-neutral-content w-96">
          <form onSubmit={handleSubmit(onHandleSubmit)}>
            <div className="card-body items-center text-center">
              <h2 className="card-title">Login </h2>
              <label className="input validator input-border">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </g>
                </svg>
                <input
                  type="email"
                  placeholder="mail@site.com"
                  {...register("emailId", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid email address",
                    },
                  })}
                />
              </label>
              {errors.emailId && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.emailId.message}
                </p>
              )}
              {/* <div className="validator-hint hidden">
                Enter valid email address
              </div> */}
              <label className="input input-border">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                    <circle
                      cx="16.5"
                      cy="7.5"
                      r=".5"
                      fill="currentColor"
                    ></circle>
                  </g>
                </svg>
                <input
                  type="password"
                  placeholder="••••••••"
                  // className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("password", {
                    required: "Password is required",
                    pattern: {
                      value:
                        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/,
                      message:
                        "Password must have at least 1 uppercase, 1 number, 1 symbol, and be 6+ characters long",
                    },
                  })}
                />
              </label>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
              <div className="card-actions justify-center w-80">
                <button
                  className="btn btn-primary btn-md"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Login
                </button>
              </div>
              <span>Donot have an account </span>
              
              <span><Link href={"/auth/signup"}>Click Here</Link></span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
