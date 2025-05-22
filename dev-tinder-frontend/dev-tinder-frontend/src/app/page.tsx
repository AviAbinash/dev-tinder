"use client";

import { getData } from "@/service/http";
import { useEffect } from "react";

// import Image from "next/image";

export default function Home() {
  useEffect(() => {
    // if()
    getData("getUser/view");
  }, []);
  return (
    <>
      <h3>hello world</h3>
    </>
  );
}
