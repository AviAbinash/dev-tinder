"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { User } from "../../types/profile";
import { updateProfile } from "@/redux/slices/feedSlice";
import { useAppDispatch } from "@/hooks/reduxHook";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, user, setUser }) => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<User>({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      age: user.age,
      about: user.about,
      skills: user.skills,
    },
  });
  if (!isOpen) return null;

  console.log(user);

  const onHandleSubmit = async (data: User) => {
    console.log(data, "data");
    const cleanedSkills = (data.skills as string[])
      .map((skill: string) => skill.trim())
      .filter((skill: string) => skill !== "");
    setUser((prev) => ({
      ...prev,
      firstName: data?.firstName,
      lastName: data?.lastName,
      age: data?.age,
      gender: data?.gender,
      about: data?.about,
      skills: Array.from(new Set([...prev.skills, ...cleanedSkills])),
    }));
    const userdata = {
      firstName: data.firstName,
      lastName: data.lastName,
      age: data.age,
      gender: data.gender,
      about: data.about,
      skills: cleanedSkills,
    };
    await dispatch(updateProfile({ url: "getUser/update", data: userdata }));
  };

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
                {...register("firstName", {
                  required: {
                    value: true,
                    message: "firstname is required",
                  },
                  minLength: {
                    value: 4,
                    message: "firstname must be at least 4 characters",
                  },
                  maxLength: {
                    value: 20,
                    message: "firstname must be less than 20 characters",
                  },
                })}
                className="input drop-down"
                placeholder="Type here"
              />
            </fieldset>
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.firstName.message}
              </p>
            )}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">last Name</legend>
              <input
                {...register("lastName", {
                  required: {
                    value: true,
                    message: "firstname is required",
                  },
                })}
                type="text"
                className="input drop-down"
                placeholder="Type here"
              />
            </fieldset>
            <fieldset className="fieldset drop-down">
              <legend className="fieldset-legend drop-down">Age</legend>
              <input
                {...register("age", {
                  required: "Age is required",
                })}
                type="number"
                className="input drop-down"
                placeholder="Type here"
              />
            </fieldset>

            <fieldset className="fieldset drop-down">
              <legend className="fieldset-legend drop-down">About</legend>
              <textarea
                {...register("about", {
                  required: "About is required",
                  maxLength: {
                    value: 200,
                    message: "About must be less than 200 characters",
                  },
                })}
                className="textarea drop-down"
                placeholder="Bio"
              ></textarea>
            </fieldset>
            <fieldset className="fieldset drop-down">
              <legend className="fieldset-legend drop-down">skills</legend>
              <input
                {...register("skills", {
                  required: "skills is required",
                })}
                type="text"
                className="input drop-down"
                placeholder="Enter skills separated by commas (e.g. JavaScript, React)"
              />
            </fieldset>
            <div className="flex flex-row justify-center items-center mt-3">
              <button className="btn btn-secondary" disabled={isSubmitting}>
                Secondary
              </button>
            </div>
          </form>
        </div>

        {/* {children} */}
      </div>
    </div>
  );
};

export default Modal;
