import React from "react";
import Tree from "react-tree-graph";

let data = {
  name: "",
  children: [
    {
      name: "",
      children: [],
      pathProps: { style: { stroke: "black" } },
    },
    { name: "", children: [], pathProps: { style: { stroke: "black" } } },
  ],
};

const TreeGraph = () => (
  <div
    style={{
      width: "1200px",
      height: "500px",
      border: "1px solid",
      margin: "50px auto",
    }}
  >
    <Tree
      data={data}
      height={500}
      width={1200}
      pathFunc={(x1, y1, x2, y2) => `M${y1},${x1} ${y2},${x2}`}
      margins={{ bottom: 20, left: 20, right: 20, top: 20 }}
    />
  </div>
);

export default TreeGraph;
