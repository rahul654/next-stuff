import { useRouteTo } from "@/nihon/app/utilities";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import "./index.css";

export const ProjectCards = (props: any) => {
  const router = useRouteTo();

  const routeTo = (path: string) => {
    router(path);
  };
  return (
    <div className="rounded-lg shadow-lg overflow-hidden">
      <div className="p-4">
        <h2 className="text-xl font-bold text-black">{props.title}</h2>
        <p className="text-gray-400 mt-2" dangerouslySetInnerHTML={{ __html: props.description }}></p>
        <div className="mt-4 flex space-x-4">
          <div
            className="cursor-pointer bg-purple-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-purple-600"
            onClick={() => {
              routeTo(props.routeTo);
            }}
          >
            View
          </div>
        </div>
      </div>
    </div>
  );
};
