import React from "react";

const CircularImage = ({ src, alt }) => {
  return (
    <div
      style={{
        borderRadius: "60%",
        overflow: "hidden",
        width: "30px",
        height: "30px",
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>
  );
};

export default CircularImage;
