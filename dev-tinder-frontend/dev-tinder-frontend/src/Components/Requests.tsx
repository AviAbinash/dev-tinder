"use client";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import {
  getUserRequests,
  postReviewConnections,
} from "@/redux/slices/profileSlice";
import { requests } from "@/types/profile";
import Image from "next/image";

const RequestLists = () => {
  const dispatch = useAppDispatch();
  const { requestData } = useAppSelector((state) => state.profile);
  console.log(requestData, "requestData");
  useEffect(() => {
    dispatch(getUserRequests("user/request/received"));
  }, [dispatch]);

  const handleResponse = (id: string, status: string) => {
    dispatch(postReviewConnections({ requestId: id, status: status }));
  };

  return (
    <div className="space-y-6 flex flex-col items-center justify-center bg-base-100 p-10">
      {requestData && requestData.length > 0 ? (
        requestData.map((request: requests) => (
          // Parent container: full screen, flex center, funky gradient + paper-like bg

          <div
            className="bg-base-300 bg-opacity-80 backdrop-blur-md rounded-xl shadow-2xl p-8 max-w-md w-full"
            key={request?._id}
          >
            <div
              key={request._id}
              className="p-4 bg-base-300 rounded-lg shadow-md max-w-sm mx-auto"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={request?.fromUserId?.photoUrl}
                  alt={`${request?.fromUserId?.firstName} ${request?.fromUserId?.lastName}'s profile picture`}
                  width={80}
                  height={80}
                  className="rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <h2 className="text-lg font-semibold">
                    {request?.fromUserId?.firstName}{" "}
                    {request?.fromUserId?.lastName}
                  </h2>
                  <p className="text-xs italic text-white-700">
                    {request?.fromUserId?.about || "No bio available"}
                  </p>
                  <p className="text-sm text-white-800">
                    Age: {request?.fromUserId?.age}
                  </p>
                  <p className="text-sm text-white-800">
                    Gender: {request?.fromUserId?.gender}
                  </p>
                </div>
              </div>

              <div className="mt-4 text-center">
                <h3 className="font-medium text-sm mb-2 text-white-900">
                  Skills:
                </h3>
                <ul className="flex flex-wrap justify-center gap-2 text-xs text-white-700">
                  {request?.fromUserId?.skills.length > 0 ? (
                    request?.fromUserId?.skills.map((skill, idx) => (
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
              </div>
              <div className="card-actions justify-center mt-3">
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    handleResponse(request?.fromUserId?._id, "accepted")
                  }
                >
                  Accept
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() =>
                    handleResponse(request?.fromUserId?._id, "rejected")
                  }
                >
                  Reject
                </button>
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

export default RequestLists;
