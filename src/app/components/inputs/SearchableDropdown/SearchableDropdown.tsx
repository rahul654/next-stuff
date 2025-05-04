'use client';
import React, { useState, useImperativeHandle, forwardRef, useRef } from "react";
import { useExistingClasses } from "@/nihon/app/utilities";
import "./index.css";

export interface ISearchableDropdownProps {
  options: string[];
  value: string;
  onSelect: (value: string) => void;
  placeHolder?: string;
  label?: string;
  required?: boolean;
  overriddenStyles?: {
    containerStyle?: React.CSSProperties;
    labelStyle?: React.CSSProperties;
    dropdownStyle?: React.CSSProperties;
    inputStyle?: React.CSSProperties;
    optionStyle?: React.CSSProperties;
  };
  overriddenStylesClassNames?: {
    containerStyle?: string;
    labelStyle?: string;
    dropdownStyle?: string;
    inputStyle?: string;
    optionStyle?: string;
  };
}

// Forwarding ref to the component
export const SearchableDropdown = forwardRef(
  (
    {
      options,
      value,
      onSelect,
      placeHolder = "Select an option",
      label,
      required = false,
      overriddenStyles,
      overriddenStylesClassNames,
    }: ISearchableDropdownProps,
    ref
  ) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    // Ref for the input element
    const inputRef = useRef<HTMLInputElement | null>(null);

    // Expose to parent via the ref
    useImperativeHandle(ref, () => ({
      setIsOpen,
      isOpen,
      getInputCoordinates: () => {
        if (inputRef.current) {
          return inputRef.current.getBoundingClientRect();
        }
        return null;
      },
    }));

    const filteredOptions = options.filter((option) =>
      option.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelect = (option: string) => {
      onSelect(option);
      setIsOpen(false);
    };

    return (
      <div
        style={{
          ...overriddenStyles?.containerStyle,
        }}
        className={useExistingClasses({
          existingClasses: "relative flex flex-col",
          newClasses: overriddenStylesClassNames?.containerStyle,
        })}
      >
        {label && (
          <span
            style={{
              ...overriddenStyles?.labelStyle,
            }}
            className={useExistingClasses({
              existingClasses: "text-[12px] mb-[2px]",
              newClasses: overriddenStylesClassNames?.labelStyle,
            })}
          >
            {label}
            {required && (
              <span
                style={{ color: "rgb(165, 7, 7)" }}
                className={useExistingClasses({
                  existingClasses: "",
                  newClasses: "",
                })}
              >
                *
              </span>
            )}
          </span>
        )}

        <div
          style={{
            ...overriddenStyles?.dropdownStyle,
          }}
          className={useExistingClasses({
            existingClasses:
              "relative px-[13px] flex flex-row items-center rounded-[3px] h-[40px] bg-white cursor-pointer border",
            newClasses: overriddenStylesClassNames?.dropdownStyle,
          })}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <span className="grow text-[13px]">{value || placeHolder}</span>
          <span className="text-[10px]">{isOpen ? "▲" : "▼"}</span>
        </div>

        {isOpen && (
          <div
            className={useExistingClasses({
              existingClasses:
                "custom-scrollbar flex flex-col absolute z-10 mt-[5px] w-full bg-white border rounded-md max-h-[200px] overflow-y-auto",
              newClasses: overriddenStylesClassNames?.dropdownStyle,
            })}
            style={{
              ...overriddenStyles?.dropdownStyle,
            }}
          >
            <input
              ref={inputRef} // Attach the ref to the input element
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              style={{
                ...overriddenStyles?.inputStyle,
              }}
              className={useExistingClasses({
                existingClasses: "input-outline-none px-[10px] py-[5px] text-[13px]",
                newClasses: overriddenStylesClassNames?.inputStyle,
              })}
            />
            {filteredOptions.map((option, index) => (
              <div
                key={index}
                onClick={() => handleSelect(option)}
                style={{
                  ...overriddenStyles?.optionStyle,
                }}
                className={useExistingClasses({
                  existingClasses:
                    "px-[10px] py-[5px] text-[13px] hover:bg-gray-200 cursor-pointer",
                  newClasses: overriddenStylesClassNames?.optionStyle,
                })}
              >
                {option}
              </div>
            ))}
            {filteredOptions.length === 0 && (
              <div className="px-[10px] py-[5px] text-[13px] text-gray-500">
                No options found
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
);