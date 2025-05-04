"use client";
import React, { useRef, useState } from "react";
import BackgroundDesign from "@/nihon/app/components/logo-svg/BackgroundDesign";
import "./index.css";
import { TextInput } from "@/nihon/app/components/inputs/TextInput/TextInput";
import { SearchableDropdown } from "@/nihon/app/components/inputs/SearchableDropdown/SearchableDropdown";
import CollapsibleObjectViewer from "../components/inputs/CollapsibleObjectViewer/CollapsibleObjectViewer";

const page = () => {
  const [inptext, setInptext] = useState("");
  const [dd, setdd] = useState("");
  console.log("dd::: ", dd);

  const dropdownRef = useRef<{
    setIsOpen: (isOpen: boolean) => void;
    isOpen: boolean;
    getInputCoordinates: () => DOMRect;
  } | null>(null);
  const handleToggleDropdown = (e: React.MouseEvent<HTMLDivElement>) => {
    const isClickIntersectingRect = (
      rect: DOMRect,
      clientX: number,
      clientY: number
    ): boolean => {
      const withinXBounds = clientX >= rect.left && clientX <= rect.right;
      const withinYBounds = clientY >= rect.top && clientY <= rect.bottom;

      return withinXBounds && withinYBounds;
    };
    const { clientX, clientY } = e;

    if (
      dropdownRef.current &&
      dropdownRef?.current?.isOpen &&
      !isClickIntersectingRect(
        dropdownRef?.current?.getInputCoordinates(),
        clientX,
        clientY
      )
    ) {
      dropdownRef?.current?.setIsOpen(false); // Close the dropdown
    }
  };

  return (
    <>
      <div
        onClick={handleToggleDropdown}
        className="no-select relative flex flex-col min-[340px]:w-96 m-auto"
      >
        <BackgroundDesign/>
        <div className="absolute mt-10 w-full">
          <div className="bg-white w-10/12 flex flex-col m-auto rounded-2xl py-3 box-shadow">
            <div className={"mx-5"}>
              <div className="text-center font-semibold text-2xl my-[7px]">
                Welcome !
              </div>

              <div className="my-[7px]">
                TextInput
              </div>
              <TextInput
                textFieldType="password"
                placeHolder={"Placeholder"}
                value={inptext}
                onChangeText={(val) => {
                  setInptext(val);
                }}
                errorText={""}
              />
              <div className="my-[7px]">
                Searchable Dropdown
              </div>
              <SearchableDropdown
                options={[
                  "Option 1",
                  "Option 2",
                  "Option 3",
                  "Option 4",
                  "Option 5",
                  "Option 6",
                  "Option 7",
                  "Option 8",
                  "Option 9",
                  "Option 10",
                  "Another Option",
                ]}
                value={dd}
                onSelect={(value) => {
                  setdd(value);
                }}
                placeHolder="Select a value"
                // label="Searchable Dropdown"
                required={true}
                ref={dropdownRef}
              />

              <div className="my-[7px]">
                Collapsible Object Viewer
              </div>
              <CollapsibleObjectViewer
                isCollapsedInitially={true}
                data={{
                  name: "John Doe",
                  age: 30,
                  address: {
                    street: "123 Main St",
                    city: "Anytown",
                    postalCode: {
                      primary: 12345,
                      secondary: null,
                    },
                  },
                  hobbies: ["Reading", "Traveling", "Cooking"],
                  metadata: null,
                  history: [
                    {
                      year: 2021,
                      events: ["Started new job", "Moved to a new city"],
                    },
                    {
                      year: 2022,
                      events: ["Traveled to Japan", "Adopted a cat"],
                    },
                  ],
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
