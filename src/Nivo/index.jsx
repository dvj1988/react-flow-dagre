import React from "react";
import { ResponsiveNetwork } from "@nivo/network";
import data from "./data.json";

const Nivo = () => {
  return (
    <div
      style={{
        height: "600px",
        width: "1000px",
      }}
    >
      <ResponsiveNetwork
        nodes={data.nodes}
        links={data.links}
        width={1000}
        height={600}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        nodeColor={function (e) {
          return e.color;
        }}
        nodeBorderColor={{ from: "color", modifiers: [["darker", 0.8]] }}
        linkColor={{ from: "target.color", modifiers: [] }}
        linkThickness={function (e) {
          return 2 * (2 - e.source.depth);
        }}
        animate
        linkDistance={50}
        repulsivity={50}
      />
    </div>
  );
};

export default Nivo;
