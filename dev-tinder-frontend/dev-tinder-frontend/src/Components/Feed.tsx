"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { getFeedData } from "@/redux/slices/feedSlice";
import React, { useEffect } from "react";
import FeedCard from "./common/FeedCard";

const Feed = () => {
  const { feedata } = useAppSelector((state) => state.feed);
  console.log(feedata?.length, "feedata?.length <= 0");
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (feedata?.length <= 0 || feedata?.length == undefined) {
      dispatch(getFeedData("user/feed"));
    }
  }, []);
  return (
    <div className="flex items-center justify-center h-[76vh]">
      {feedata && feedata?.length > 0 && <FeedCard />}
    </div>
  );
};

export default Feed;
