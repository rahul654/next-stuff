"use client";
import React from "react";
import { ProjectCards } from "@/nihon/app/components/projectcard/ProjectCard";

export default function Home() {
  return (
    <div>
      <div className="flex flex-wrap justify-center mx-[10px]">
        <div className="w-full sm:w-full md:w-[calc(50%-40px)] lg:flex-1 m-[20px]">
          <ProjectCards
            title="parent-child-checkbox"
            description="Checkbox Tree Selector: A hierarchical checkbox component 
            where selecting the parent auto-selects all children, and deselecting any child auto-unchecks the parent. 
            Uses a recursive approach to check/uncheck all child nodes efficiently."
            routeTo="/parent-child-checkbox"
          />
        </div>
      </div>
    </div>
  );
}
