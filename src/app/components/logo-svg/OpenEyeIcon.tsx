import React from 'react'

interface BackgroundDesignProps {
  style?: React.CSSProperties; // Optional style object
  className?: string; // Optional style object
}

const OpenEyeIcon: React.FC<BackgroundDesignProps> = (props) => {
  return (
    <svg
      style={{
        display: "block", // Ensures it occupies the parent container
        width: "100%",
        height: "100%",
        ...props.style, // Allow overriding styles via props
      }}
      className={props?.className}
      // viewBox="0 0 360 400"
      xmlns="http://www.w3.org/2000/svg"
    // fill={props.color}
    viewBox="0 0 932.15 932.15"
    // style="enable-background:new 0 0 932.15 932.15;"
    >
      <g>
        <path
          d="M466.075,161.525c-205.6,0-382.8,121.2-464.2,296.1c-2.5,5.3-2.5,11.5,0,16.9c81.4,174.899,258.601,296.1,464.2,296.1
		s382.8-121.2,464.2-296.1c2.5-5.3,2.5-11.5,0-16.9C848.875,282.725,671.675,161.525,466.075,161.525z M466.075,676.226
		c-116.1,0-210.1-94.101-210.1-210.101c0-116.1,94.1-210.1,210.1-210.1c116.1,0,210.1,94.1,210.1,210.1
		S582.075,676.226,466.075,676.226z"
        />
        <circle cx="466.075" cy="466.025" r="134.5" />
      </g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
    </svg>
  )
}

export default OpenEyeIcon;