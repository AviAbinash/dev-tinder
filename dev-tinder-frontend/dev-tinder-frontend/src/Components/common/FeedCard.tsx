"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import {
  getUserFeed,
  postSendConnections,
  setRemovefeedById,
} from "@/redux/slices/profileSlice";
import { feedData } from "@/types/profile";

const FeedCard = () => {
  const dispatch = useAppDispatch();
  const { userFeedData } = useAppSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getUserFeed("user/feed"));
  }, [dispatch]);

  const handleSendConnection = (id: string, status: string) => {
    dispatch(postSendConnections({ requestId: id, status }));
    dispatch(setRemovefeedById(id));
  };

  return (
    <div className="relative w-[400px] h-[500px] mx-auto overflow-hidden">
      {userFeedData && userFeedData.length > 0 ? (
        userFeedData.map((ele: feedData, index: number) => {
          return (
            <div
              key={ele._id}
              className="absolute w-full h-full transition-all duration-300 rounded-xl shadow-lg card bg-base-300"
              style={{
                zIndex: userFeedData.length - index,
                display: index === 0 ? "block" : "none", // hide all except first
              }}
            >
              {ele?.photoUrl && (
                <figure className="w-full h-72 overflow-hidden rounded-t-xl">
                  <Image
                    src={ele.photoUrl}
                    alt="User Photo"
                    width={400}
                    height={300}
                    className="object-cover w-full h-full"
                  />
                </figure>
              )}
              <div className="card-body p-4 text-center">
                <h2 className="card-title justify-center">
                  {ele.firstName} {ele.lastName}
                </h2>
                <p>{ele.about}</p>
                <div className="card-actions justify-center mt-6">
                  <button
                    className="btn btn-primary"
                    onClick={() => handleSendConnection(ele._id, "ignored")}
                  >
                    Ignore
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleSendConnection(ele._id, "intrested")}
                  >
                    Interested
                  </button>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="text-center mt-8">No feed data found. Try again later.</div>
      )}
    </div>
  );
};

export default FeedCard;
