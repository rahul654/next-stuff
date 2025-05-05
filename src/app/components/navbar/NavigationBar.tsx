import { useRouteTo } from "@/nihon/app/utilities";
import React, { useMemo, useState } from "react";
import "./index.css"

export const Navbar = () => {
  const route = useRouteTo();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const routeTo = (path: string) => {
    route(path);
    setIsDrawerOpen(false);
  }

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 w-screen flex bg-gray-800 z-10 p-[10px] no-select">
        <button
          className="text-white px-4 py-2"
          onClick={toggleDrawer}
        >
          Menu
        </button>
        <div className="flex-1 flex justify-center items-center text-white text-center my-auto">
          <div className="cursor-pointer" onClick={() => {route("/")}}>
            Home
          </div>
        </div>
      </nav>

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white z-20 transform ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
        style={{ width: "250px" }}
      >
        <button
          className="absolute top-4 right-4 text-white"
          onClick={toggleDrawer}
        >
          Close
        </button>
        <ul className="mt-16 space-y-4 p-4">
          <li className="hover:bg-gray-700 p-2 rounded" onClick={() => {routeTo("/")}}>Home</li>
          <li className="hover:bg-gray-700 p-2 rounded" onClick={() => {routeTo("/parent-child-checkbox")}}>parent-child-checkbox</li>
        </ul>
      </div>

      {/* Overlay */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={toggleDrawer}
        ></div>
      )}
    </>
  );

};