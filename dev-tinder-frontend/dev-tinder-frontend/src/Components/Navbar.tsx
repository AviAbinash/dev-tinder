"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  userLogout,
  setLoginData,
  setIsLogIn,
} from "../redux/slices/authSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { useRouter } from "next/navigation";
import { setUserData } from "@/redux/slices/profileSlice";
// import Toast from "./common/Toast";
const Navbar = () => {
  const [token, setToken] = useState<string | null>(null);
  const userdata = useAppSelector((state) => state.auth.loginData);

  // const { isLoggedIn } = useAppSelector((state) => state.auth);
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, [userdata]);
 
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      dispatch(userLogout("logout"));
      setToken(null);
      dispatch(setLoginData({}));
      dispatch(setUserData(null));
      dispatch(setIsLogIn(false));
      router.push("/auth/login/");
    } catch (error) {
      console.log(error);
      setToken(null);
    }
  };
  return (
    <div className="navbar bg-base-300 shadow-sm fixed top-0 z-50">
      <div className="flex-1">
        {/* <Toast /> */}
        <Link href="/" className="btn btn-ghost text-xl">
          Dev Tinder
        </Link>
      </div>
      {token && (
        <div className="flex gap-2">
          <div className="dropdown dropdown-end mx-5">
            <div tabIndex={0} role="button" className="avatar">
              <div className="w-16 rounded-full">
                <Image
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  width={200}
                  height={200}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link href="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link href={"/connections"}>Connections</Link>
              </li>
              <li>
                <Link href={"/requests"}>Requests</Link>
              </li>
              <li>
                <div onClick={handleLogout}>Logout</div>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
