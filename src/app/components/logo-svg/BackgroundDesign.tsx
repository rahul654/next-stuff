import React from "react";

interface BackgroundDesignProps {
  style?: React.CSSProperties; // Optional style object
  className?: string; // Optional style object
}

const BackgroundDesign: React.FC<BackgroundDesignProps> = (props) => (
  <svg
    style={{
      display: "block", // Ensures it occupies the parent container
      width: "100%",
      height: "100%",
      ...props.style, // Allow overriding styles via props
    }}
    className={props?.className}
    viewBox="0 0 360 400"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none" // Ensures the SVG scales to fit the container
  >
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g>
        <polygon
          fill="#E7E6FF"
          points="360 272 315 293.439123 360 315"
        />
        <path
          d="M0,0 C0,0 0,359.998269 0,360 L78.1715503,397.705836 L80.3131776,398.725657 C82.371635,399.54463 84.6137593,400 86.9633116,400 C89.3856376,400 91.6936049,399.518658 93.8023108,398.652936 L95.6424468,397.771631 L360,272 L360,0 L0,0 Z"
          fill="#F9A51A"
        />
      </g>
    </g>
  </svg>
);

export default BackgroundDesign;
