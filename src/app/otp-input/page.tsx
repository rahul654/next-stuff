'use client';
import OtpInput from "./OtpInput";

export default function Home(){
  const handleOtpChange = (otp: string) => {
    console.log("OTP Changed:", otp);
  };

  const handleOtpComplete = (otp: string) => {
    console.log("OTP Complete:", otp);
  };
  return (
    <div className="flex flex-col items-center mt-[calc(50vh-120px)]">
      <h1 className="text-2xl font-bold mb-4">Enter OTP</h1>
      <OtpInput
        digits={6}
        secureTextEntry={false}
        onChange={handleOtpChange}
        onComplete={handleOtpComplete}
      />
      <h1 className="text-2xl mt-5 font-bold mb-4">Secure Text</h1>
      <OtpInput
        digits={6}
        secureTextEntry={true}
        onChange={handleOtpChange}
        onComplete={handleOtpComplete}
      />
    </div>
  );
};