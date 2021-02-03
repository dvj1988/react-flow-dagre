import React from "react";
import elements from "./elements.json";

const DomChart = () => {
  console.log(elements);
  return (
    <div style={{ display: "flex", height: "600px", margin: "10px" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            height: "10px",
            width: "10px",
            background: "red",
            borderRadius: "50%",
            margin: "2px",
          }}
        ></div>
        <div
          style={{
            height: "10px",
            width: "10px",
            background: "red",
            borderRadius: "50%",
            margin: "2px",
          }}
        ></div>
      </div>
    </div>
  );
};

export default DomChart;
