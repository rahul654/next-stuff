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
        <div className="w-full sm:w-full md:w-[calc(50%-40px)] lg:flex-1 m-[20px]">
          <ProjectCards
            title="otp-input"
            description="OTP Input Component: A multi-box input component for entering One-Time Passwords (OTP), 
            supporting smooth navigation between boxes, auto-focus on input, and smart paste support to fill 
            all boxes at once when pasting the full OTP."
            routeTo="/otp-input"
          />
        </div>
        <div className="w-full sm:w-full md:w-[calc(50%-40px)] lg:flex-1 m-[20px]">
          <ProjectCards
            title="rest-components"
            description="A collection of modular components demonstrating reusability and clean design:
            <br/>Searchable Dropdown: Dynamic dropdown with real-time filtering and keyboard navigation.
            <br/>Collapsible Object Viewer: Expand/collapse structured data (like JSON) for better readability.
            <br/>Reusable Textbox: Customizable text input with props for label, validation, and placeholder handling."
            routeTo="/rest-components"
          />
        </div>
      </div>
    </div>
  );
}
