"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { getFeedData } from "@/redux/slices/feedSlice";
import React, { useEffect } from "react";
import FeedCard from "./common/FeedCard";

const Feed = () => {
  const { feedata } = useAppSelector((state) => state.feed);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getFeedData("user/feed"));
  }, [dispatch]);
  return (
    <> {feedata && feedata?.length > 0 && <FeedCard />}</>
    // <div className="flex items-center justify-center h-[76vh]">

    // </div>
  );
};

export default Feed;
