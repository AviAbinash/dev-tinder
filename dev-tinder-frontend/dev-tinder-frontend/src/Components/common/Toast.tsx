"use client";
import React from "react";
import { useAppSelector } from "@/hooks/reduxHook";
type ToastProps = {
  message: string;
};

const Toast = ({ message }: ToastProps) => {
  const { showTaost } = useAppSelector((state) => state.utils);
  return (
    <>
      {showTaost ? (
        <div className="toast toast-top">
          <div className="alert alert-success">
            <span>{message}</span>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Toast;
