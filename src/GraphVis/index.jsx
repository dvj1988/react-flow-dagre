import React, { useEffect, useRef } from "react";
import vis from "vis-network";

const graph = {
  nodes: [
    { id: 1, label: "1", fixed: true },
    { id: 2, label: "2", fixed: true },
    { id: 3, label: "3", fixed: true },
    { id: 4, label: "4", fixed: true },
    { id: 5, label: "5", fixed: true },
  ],
  edges: [
    { from: 1, to: 2 },
    { from: 2, to: 3 },
    { from: 3, to: 4 },
    { from: 4, to: 5 },
  ],
};

const options = {
  layout: {
    hierarchical: {
      direction: "LR",
    },
  },
};

const GraphVis = () => {
  const ref = useRef(null);
  useEffect(() => {
    const a = new vis.Network(ref.current, graph, options);
    console.log(a);
  }, []);
  return (
    <>
      <div ref={ref} style={{ width: "1000px", height: "400px" }}></div>
    </>
  );
};

export default GraphVis;
