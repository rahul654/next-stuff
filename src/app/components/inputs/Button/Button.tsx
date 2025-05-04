import { useExistingClasses } from "@/nihon/app/utilities";
import React, { useMemo } from "react";

/**
 * @CommonUI Button Component, can be used as button, circular button, and icon button
 * @param onClick function to handle click
 * @param testID - testID for toggle Switch,
 * @param overriddenStyles - customs styles that can be passed as props,
 * @param text - text to be displayed on button. text is only available for normal button. default text on button is Create,
 * @param disabled - disable click on button,
 * @param buttonIcon - Icon to be displayed on button,
 */
export interface IButtonProps {
  label?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
  overriddenStyles?: {
    buttonStyle?: React.CSSProperties;
  };
  overriddenStylesClassNames?: {
    buttonStyle?: string;
  };
}

export const Button: React.FC<IButtonProps> = ({
  label = "Button",
  onClick,
  disabled = false,
  overriddenStyles,
  overriddenStylesClassNames,
}) => {
  return (
    <button disabled={disabled} style={{...overriddenStyles?.buttonStyle}} onClick={onClick} className={useExistingClasses({existingClasses: `${'w-[100%] m-auto bg-gray-200 mt-3 rounded-[5px] h-9 no-select'} ${disabled ? " common-disabled-style" : ""}`, newClasses: overriddenStylesClassNames?.buttonStyle})}>{label}</button>
  );
};