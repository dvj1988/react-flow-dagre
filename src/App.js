import React from "react";
import ReactFlow, { isNode } from "react-flow-renderer";
import dagre from "dagre";

import { initialElements } from "./elements";

import "./App.css";

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));
const direction = "LR";
const isHorizontal = direction === "LR";
dagreGraph.setGraph({
  rankdir: direction,
  ranksep: 150,
  marginx: 50,
  marginy: 50,
});

initialElements.forEach((el) => {
  if (isNode(el)) {
    dagreGraph.setNode(el.id, { width: 5, height: 5 });
  } else {
    dagreGraph.setEdge(el.source, el.target);
  }
});

dagre.layout(dagreGraph);

console.log("dagreGraph", dagreGraph);

const layoutedElements = initialElements.map((el) => {
  if (isNode(el)) {
    const nodeWithPosition = dagreGraph.node(el.id);
    el.targetPosition = isHorizontal ? "left" : "top";
    el.sourcePosition = isHorizontal ? "right" : "bottom";
    el.position = {
      x: nodeWithPosition.x,
      y: nodeWithPosition.y,
    };
  }

  return el;
});

const LayoutFlow = () => {
  return (
    <div style={{ width: "100%", height: "500px" }}>
      <ReactFlow
        elements={layoutedElements}
        elementsSelectable={false}
        nodesConnectable={false}
        nodesDraggable={false}
        zoomOnScroll={false}
        panOnScroll={false}
        panOnScrollMode={false}
        zoomOnDoubleClick={false}
        paneMoveable={false}
      ></ReactFlow>
      ;
    </div>
  );
};

export default LayoutFlow;
