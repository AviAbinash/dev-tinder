"use client"
import React,{useState} from "react";
import Image from "next/image";
import Modal from "./common/Modal";
const Profile = () => {
  const [isOpen ,setIsOpen] = useState(false)
  const handleEdit = ()=>{
    setIsOpen(!isOpen)
    console.log()
  }
  const onClose  = ()=>{
   setIsOpen(false)
  }
  return (
    <>
    <Modal isOpen={isOpen} onClose={onClose}/>
      <div className="text-lg p-4">My profile</div>
      <div className="bg-base-300 shadow-sm p-8 m-3">
        <div className="grid grid-cols-3 gap-4">
          <div className=" p-4 grid grid-cols-2 gap-4">
            <div className=" p-4 gap-6 profile-photo">
              <Image
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                alt="profile picture"
                width={100}
                height={100}
              />
            </div>
            <div className="p-4 gap-4">
              <div>name</div>
              <div>name</div>
              <div>name</div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-base-300 shadow-sm p-8 m-3">
        <div className="grid  gap-4">
          <div className="flex flex-row justify-between items-center">
            <div className="text-lg p-2">Personal Info</div>
            <div className="bg-blue-600 px-3 py-2 rounded-md cursor-pointer" onClick={handleEdit}>Edit</div>
          </div>
          <div className=" p-4 grid grid-cols-3 gap-4 items-center">
            <div className="text-lg">
              <div className="font-medium">First Name</div>
              <div>Abinash</div>
            </div>
            <div className="text-lg">
              <div className="font-medium">last Name</div>
              <div>Abinash</div>
            </div>
            <div className="text-lg">
              {" "}
              <div className="font-medium">Date of Birth</div>
              <div>Abinash</div>
            </div>
            <div className="text-lg">
              {" "}
              <div className="font-medium">Email Adress</div>
              <div>Abinash</div>
            </div>
            <div className="text-lg">
              <div className="font-medium"> Phone Number</div>
              <div>Abinash</div>
            </div>
            <div className="text-lg">
              {" "}
              <div className="font-medium">Gender</div>
              <div>Abinash</div>
            </div>
            <div className="text-lg">
              {" "}
              <div className="font-medium">Skills</div>
              <div>Abinash</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
