"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Modal from "./common/Modal";
import { User } from "../types/profile";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { getUserdata } from "@/redux/slices/profileSlice";

const Profile = () => {
  const dispatch = useAppDispatch();
  const { userdata } = useAppSelector((state) => state.profile);
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User>({
    firstName: "",
    lastName: "",
    age: 0,
    gender: "",
    about: "",
    skills: [""],
  });
  const handleEdit = () => {
    setIsOpen(!isOpen);
  };
  const onClose = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    dispatch(getUserdata("getUser/view"));
  }, []);
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} user={user} setUser={setUser} />
      <div className="text-lg p-4">My profile</div>
      <div className="bg-base-300 shadow-sm p-8 m-3">
        <div className="grid grid-cols-3 gap-4">
          <div className=" p-4 grid grid-cols-2 gap-4">
            <div className=" p-4 gap-6 profile-photo">
              <Image
                src={
                  userdata?.photoUrl ||
                  "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                }
                alt="profile picture"
                width={100}
                height={100}
              />
            </div>
            {userdata ? (
              <div className="p-4 gap-4 flex flex-col items-baseline">
                <div className="w-100 text-lg">{`${userdata?.firstName} ${userdata?.lastName}`}</div>
                <div className="w-100 text-base">{userdata?.emailId}</div>
                <div className="w-100 text-base">{userdata?.about}</div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      {userdata ? (
        <div className="bg-base-300 shadow-sm p-8 m-3">
          <div className="grid  gap-4">
            <div className="flex flex-row justify-between items-center">
              <div className="text-lg p-2">Personal Info</div>
              <div
                className="bg-blue-600 px-3 py-2 rounded-md cursor-pointer"
                onClick={handleEdit}
              >
                Edit
              </div>
            </div>
            <div className=" p-4 grid grid-cols-3 gap-4 items-center">
              <div className="text-lg">
                <div className="font-medium">First Name</div>
                <div>{userdata?.firstName}</div>
              </div>
              <div className="text-lg">
                <div className="font-medium">last Name</div>
                <div>{userdata?.lastName}</div>
              </div>
              <div className="text-lg">
                {" "}
                <div className="font-medium">Date of Birth</div>
                <div>30/11/1998</div>
              </div>
              <div className="text-lg">
                {" "}
                <div className="font-medium">Email Adress</div>
                <div>{userdata?.emailId}</div>
              </div>
              <div className="text-lg">
                <div className="font-medium"> Phone Number</div>
                <div>+91 7008852343</div>
              </div>
              <div className="text-lg">
                {" "}
                <div className="font-medium">Gender</div>
                <div>{userdata?.gender}</div>
              </div>
              <div className="text-lg">
                {" "}
                <div className="font-medium">Skills</div>
                {userdata?.skills?.map((ele: string, index: number) => (
                  <span key={index}> {ele}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Profile;
