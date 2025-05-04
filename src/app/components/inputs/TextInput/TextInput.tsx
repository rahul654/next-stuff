'use client';
import React, { HTMLAttributes, useState } from "react";
import OpenEyeIcon from "@/customcomponents/logo-svg/OpenEyeIcon";
import ClosedEyeIcon from "@/customcomponents/logo-svg/ClosedEyeIcon";
import "./index.css"
import { useExistingClasses } from "@/nihon/app/utilities";

export interface ITextInputStyles {
  input?: React.CSSProperties;
  labelStyle?: React.CSSProperties;
  inputRow?: React.CSSProperties;
  showPassword?: React.CSSProperties;
}

export interface ITextInputProps
  extends React.HTMLAttributes<HTMLInputElement> {
  // export interface ITextInputProps {
  testID?: string;
  label?: string;
  value: string;
  textFieldType?: "password" | "text";
  errorText?: string;
  placeHolder?: string;
  onChangeText: (text: string) => void;
  overriddenStyles?: {
    textContainerStyle?: React.CSSProperties;
    labelStyle?: React.CSSProperties;
    labelStyleStar?: React.CSSProperties;
    inputContainer?: React.CSSProperties;
    input?: React.CSSProperties;
    passwordContainer?: React.CSSProperties;
    closedEyeIcon?: React.CSSProperties;
    openEyeIcon?: React.CSSProperties;
    errorTextDiv?: React.CSSProperties;
  };
  overriddenStylesClassNames?: {
    textContainerStyle?: string;
    labelStyle?: string;
    labelStyleStar?: string;
    inputContainer?: string;
    input?: string;
    passwordContainer?: string;
    closedEyeIcon?: string;
    openEyeIcon?: string;
    errorTextDiv?: string;
  };
  required?: boolean;
  isDisabled?: boolean;
}

export const TextInput: React.FC<ITextInputProps> = ({
  overriddenStyles,
  overriddenStylesClassNames,
  value,
  testID,
  textFieldType,
  onChangeText,
  errorText,
  placeHolder,
  label,
  required = false,
  isDisabled = false
}) => {
  // Initialize a boolean state
  const [passwordShown, setPasswordShown] = useState(false);
  const [error, setError] = useState(errorText);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <div
      style={{
        ...overriddenStyles?.textContainerStyle,
      }}
      className={useExistingClasses({ existingClasses: "flex flex-col", newClasses: overriddenStylesClassNames?.textContainerStyle })}
    >
      {label && (
        <span
          style={{
            ...overriddenStyles?.labelStyle,
          }}
          className={useExistingClasses({ existingClasses: "text-[12px] mb-[2px]", newClasses: overriddenStylesClassNames?.labelStyle })}
        >
          {label}
          {required && (
            <span
              style={{
                ...{ color: "rgb(165, 7, 7)" },
                ...overriddenStyles?.labelStyleStar,
              }}
              className={useExistingClasses({ existingClasses: "", newClasses: overriddenStylesClassNames?.labelStyleStar })}
            >
              {"*"}
            </span>
          )}
        </span>
      )}
      <div
        style={{
          ...overriddenStyles?.inputContainer,
        }}
        className={useExistingClasses({ existingClasses: `${"px-[13px] flex flex-row custom-input-box-shadow rounded-[3px] h-[40px]"} ${isDisabled ? " common-disabled-style disabled" : ""}`, newClasses: overriddenStylesClassNames?.inputContainer })}
      >
        <input
          disabled={isDisabled}
          value={value}
          type={passwordShown ? "text" : textFieldType}
          onChange={(e) => {
            onChangeText(e.target.value);
          }}
          style={{

            ...overriddenStyles?.input,
          }}
          placeholder={placeHolder}
          className={useExistingClasses({ existingClasses: "grow input-outline-none self-center h-[15px] text-[13px] common-disabled-style", newClasses: overriddenStylesClassNames?.input })}
        />
        {textFieldType === "password" && (
          <div
            onClick={togglePassword}
            style={{
              ...overriddenStyles?.passwordContainer,
            }}
            className={useExistingClasses({ existingClasses: "self-center flex-none", newClasses: overriddenStylesClassNames?.passwordContainer })}
          >
            {passwordShown ? (
              <ClosedEyeIcon 
              className={useExistingClasses({ existingClasses: "", newClasses: overriddenStylesClassNames?.closedEyeIcon })}
              style={{
                width: '15px', height: '15px', alignSelf: 'center', cursor: 'pointer',
                ...overriddenStyles?.closedEyeIcon,
              }} />
            ) : (
              <OpenEyeIcon 
              className={useExistingClasses({ existingClasses: "", newClasses: overriddenStylesClassNames?.openEyeIcon })} style={{
                width: '15px', height: '15px', alignSelf: 'center', cursor: 'pointer',
                ...overriddenStyles?.openEyeIcon,
              }} />
            )}
          </div>
        )}
      </div>
      {error && <div
        style={{
          ...overriddenStyles?.errorTextDiv,
        }}
        className={useExistingClasses({ existingClasses: "text-red-500 text-[10px] mt-[1px]", newClasses: overriddenStylesClassNames?.errorTextDiv })}
      >
        {error}
      </div>}
    </div>
  );
};