'use client';
import React, { useState, useRef } from "react";

interface OtpInputProps {
  digits?: number;
  onChange?: (otp: string) => void;
  onComplete?: (otp: string) => void;
  secureTextEntry?: boolean;
}

const OtpInput: React.FC<OtpInputProps> = ({
  digits = 4,
  onChange,
  onComplete,
  secureTextEntry = false,
}) => {
  const [otp, setOtp] = useState<string[]>(Array(digits).fill(""));
  const inputsRef = useRef<HTMLInputElement[]>([]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return; // Allow only numeric input

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Trigger onChange callback
    onChange && onChange(newOtp.join(""));

    // Move to the next input if a digit is entered
    if (value && index < digits - 1) {
      inputsRef.current[index + 1]?.focus();
    }

    // Trigger onComplete callback if all inputs are filled
    if (newOtp.join("").length === digits) {
      onComplete && onComplete(newOtp.join(""));
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      // Move to the previous input on Backspace if current input is empty
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, digits);
    if (!/^\d+$/.test(pasteData)) return; // Allow only numeric input

    const newOtp = pasteData.split("").concat(Array(digits - pasteData.length).fill(""));
    setOtp(newOtp);

    // Trigger onChange and onComplete callbacks
    onChange && onChange(newOtp.join(""));
    if (newOtp.join("").length === digits) {
      onComplete && onComplete(newOtp.join(""));
    }
  };

  return (
    <div className="flex gap-2">
      {otp.map((digit, index) => (
        <input
          key={index}
          // @ts-ignore
          ref={(el) => (inputsRef.current[index] = el!)}
          type={secureTextEntry ? "password" : "text"}
          value={digit}
          maxLength={1}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          className="w-12 h-12 text-center text-lg border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      ))}
    </div>
  );
};

export default OtpInput;