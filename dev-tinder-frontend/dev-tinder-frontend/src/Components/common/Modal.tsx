"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { Inputs } from "../../types/authTypes";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const {
    // register,
    handleSubmit,
    // formState: { errors, isSubmitting },
  } = useForm<Inputs>();
  if (!isOpen) return null;

  const onHandleSubmit = async () => {};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-base-300 rounded-xl shadow-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-blue-800 cursor-pointer"
        >
          ✕
        </button>
        <div className="parent-form">
          <div className="text-2xl font-bold">Edit Personal Info</div>
          <form onSubmit={handleSubmit(onHandleSubmit)}>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">First Name</legend>
              <input
                type="text"
                className="input drop-down"
                placeholder="Type here"
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">First Name</legend>
              <input
                type="text"
                className="input drop-down"
                placeholder="Type here"
              />
            </fieldset>
            <fieldset className="fieldset drop-down">
              <legend className="fieldset-legend drop-down">Age</legend>
              <input
                type="number"
                className="input drop-down"
                placeholder="Type here"
              />
            </fieldset>

            <div className="dropdown dropdown-center drop-down">
              <div tabIndex={0} role="button" className="btn m-1 drop-down bg-base-400g">
                gender ⬇️
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
              >
                <li>
                  <a>Male</a>
                </li>
                <li>
                  <a>Female 2</a>
                </li>
                <li>
                  <a>Others</a>
                </li>
              </ul>
            </div>
            <fieldset className="fieldset drop-down">
              <legend className="fieldset-legend drop-down">About</legend>
              <textarea
                className="textarea drop-down"
                placeholder="Bio"
              ></textarea>
            </fieldset>
            <fieldset className="fieldset drop-down">
              <legend className="fieldset-legend drop-down">skills</legend>
              <input
                type="text"
                className="input drop-down"
                placeholder="Type here"
              />
            </fieldset>
          </form>
        </div>

        {/* {children} */}
      </div>
    </div>
  );
};

export default Modal;
