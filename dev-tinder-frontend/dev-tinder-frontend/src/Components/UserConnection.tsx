"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { getUserConnections } from "@/redux/slices/profileSlice";
import { connections } from "@/types/profile";
import  Link  from "next/link";

const UserConnection = () => {
  const dispatch = useAppDispatch();

  const { connectionData } = useAppSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getUserConnections("user/connections"));
  }, [dispatch]);

  return (
    <div className="space-y-6 flex flex-col items-center justify-center bg-base-100 p-10">
      {connectionData && connectionData.length > 0 ? (
        connectionData.map((connection: connections) => (
          // Parent container: full screen, flex center, funky gradient + paper-like bg

          <div
            className="bg-base-300 bg-opacity-80 backdrop-blur-md rounded-xl shadow-2xl p-8 max-w-md w-full"
            key={connection?._id}
          >
            <div
              key={connection._id}
              className="p-4 bg-base-300 rounded-lg shadow-md max-w-sm mx-auto"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={connection.photoUrl}
                  alt={`${connection.firstName} ${connection.lastName}'s profile picture`}
                  width={80}
                  height={80}
                  className="rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <h2 className="text-lg font-semibold">
                    {connection.firstName} {connection.lastName}
                  </h2>
                  <p className="text-xs italic text-white-700">
                    {connection.about || "No bio available"}
                  </p>
                  <p className="text-sm text-white-800">
                    Age: {connection.age}
                  </p>
                  <p className="text-sm text-white-800">
                    Gender: {connection.gender}
                  </p>
                </div>
              </div>

              <div className="mt-4 text-center">
                <h3 className="font-medium text-sm mb-2 text-white-900">
                  Skills:
                </h3>
                <ul className="flex flex-wrap justify-center gap-2 text-xs text-white-700">
                  {connection.skills.length > 0 ? (
                    connection.skills.map((skill, idx) => (
                      <li
                        key={idx}
                        className=" px-2 py-1 rounded shadow-sm border border--300"
                      >
                        {skill}
                      </li>
                    ))
                  ) : (
                    <li className="text-white-800">No skills listed</li>
                  )}
                </ul>
                 <Link href={`/chatpage/${connection?._id}`}>Message</Link>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-white-600">No connections found.</div>
      )}
    </div>
  );
};

export default UserConnection;
