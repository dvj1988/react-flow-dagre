import React, { useEffect, useRef } from "react";
import dagre from "dagre";

import elements from "./initialElements";
import { NODE_RANK, getNodeColor } from "./utils";
import "./styles.css";
const CANVAS_HEIGHT = 1200;
const CANVAS_WIDTH = 2000;
const graph = new dagre.graphlib.Graph();
graph.setDefaultEdgeLabel(() => ({}));

graph.setGraph({
  rankdir: "LR",
  ranksep: 200,
  nodesep: 10,
  edgesep: 10,
  ranker: "longest-path",
  marginx: 0,
  marginy: 0,
});

elements.forEach((el) => {
  if (el.elementType === "NODE") {
    const radius = (el.quantity + 10) / 10;
    // set width and height based on quantity
    graph.setNode(el.id, {
      width: radius,
      height: radius,
      type: el.type,
    });
  } else {
    graph.setEdge(el.source, el.target);
  }
});

dagre.layout(graph);

const SCALE =
  graph.graph().height < CANVAS_HEIGHT
    ? 1
    : CANVAS_HEIGHT / graph.graph().height;

console.log(CANVAS_HEIGHT, graph.graph().height);
console.log(CANVAS_WIDTH, graph.graph().width);
const NUMBER_OF_RANKS = 5;

const LayoutFlow = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const $canvasEl = canvasRef.current;
    const context = $canvasEl.getContext("2d");
    console.log(graph.graph());

    $canvasEl.width = CANVAS_WIDTH;
    $canvasEl.height = CANVAS_HEIGHT;
    $canvasEl.style.width = `${CANVAS_WIDTH / 2}px`;
    $canvasEl.style.height = `${CANVAS_HEIGHT / 2}px`;

    context.scale(SCALE, SCALE);
    // const adjustedMarginLeft = 0;
    const adjustedMarginLeft =
      CANVAS_WIDTH - graph.graph().width * SCALE > 0
        ? (CANVAS_WIDTH - graph.graph().width * SCALE) * SCALE
        : 0;

    graph.edges().forEach(({ v: sourceId, w: targetId }) => {
      const {
        x: x1,
        y: y1,
        type: sourceType,
        width: sourceDiameter,
      } = graph.node(sourceId);
      const {
        x: x2,
        y: y2,
        type: targetType,
        width: targetDiameter,
      } = graph.node(targetId);
      const sourceRank = NODE_RANK[sourceType];
      const targetRank = NODE_RANK[targetType];

      const theta = Math.atan((y2 - y1) / (x2 - x1));

      drawEdge({
        context,
        x1:
          x1 +
          (adjustedMarginLeft * sourceRank) / NUMBER_OF_RANKS +
          (sourceDiameter / 2) * Math.cos(theta),
        y1: y1 + (sourceDiameter / 2) * Math.sin(theta),
        x2:
          x2 -
          (targetDiameter / 2) * Math.cos(theta) +
          (adjustedMarginLeft * targetRank) / NUMBER_OF_RANKS,
        y2: y2 - (targetDiameter / 2) * Math.sin(theta),
        color: "green",
        lineWidth: 2 / SCALE,
      });
      drawNode({
        context,
        x: x1 + (adjustedMarginLeft * sourceRank) / NUMBER_OF_RANKS,
        y: y1,
        radius: sourceDiameter / 2,
        color: getNodeColor(sourceType),
      });
      drawNode({
        context,
        x: x2 + (adjustedMarginLeft * targetRank) / NUMBER_OF_RANKS,
        y: y2,
        radius: targetDiameter / 2,
        color: getNodeColor(targetType),
      });
    });
  }, []);

  const drawNode = ({ context, x, y, radius, color }) => {
    context.beginPath();
    context.fillStyle = color;
    context.arc(x, y, radius, 0, 2 * Math.PI);
    context.fill();
  };

  const drawEdge = ({ context, x1, y1, x2, y2, color, lineWidth }) => {
    context.strokeStyle = color;
    context.fillStyle = color;
    context.lineWidth = lineWidth;
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
  };

  return (
    <div
      style={{ display: "flex", marginTop: "50px", justifyContent: "center" }}
    >
      <canvas ref={canvasRef} style={{ border: "1px dashed black" }} />
    </div>
  );
};

export default LayoutFlow;
