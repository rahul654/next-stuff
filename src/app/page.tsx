"use client";
import React from "react";
import { ProjectCards } from "@/nihon/app/components/projectcard/ProjectCard";
import { allRoutes } from "@/nihon/app/constants/index";

export default function Home() {
  return (
    <div>
      <div className="flex flex-wrap justify-center mx-[10px]">
        {allRoutes.map(val => {
          return (
          <div key={val.title} className="w-full sm:w-full md:w-[calc(50%-40px)] lg:w-[calc(30%-40px)] m-[20px]">
            <ProjectCards
              title={val.title}
              description={val.description}
              routeTo={val.routeTo}
            />
          </div>
          );
        })}
      </div>
    </div>
  );
}
