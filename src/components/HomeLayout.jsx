import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

function HomeLayout({}) {
  return (
    <div className="w-full h-full">
      <Header />
      <Outlet />
    </div>
  );
}

export default HomeLayout;
