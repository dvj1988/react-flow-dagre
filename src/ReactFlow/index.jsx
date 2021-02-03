import React from "react";
import ReactFlow, {
  isNode,
  Controls,
  ReactFlowProvider,
} from "react-flow-renderer";
import dagre from "dagre";

import { getElements } from "./createNetwork";
import "./styles.css";
import { useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";

const NODE_NUMBER_OPTIONS = [5, 10, 20, 50, 100, 200, 500];

const LayoutFlow = () => {
  const [numberOfNodes, setNumberOfNodes] = useState(5);
  const [network, setNetwork] = useState({ nodes: [], edges: [] });
  const [layoutedElements, setLayoutedElements] = useState([]);
  const [reactFlowRef, setReactFlowRef] = useState(null);

  const onChangeNumberOfNodes = useCallback(
    (number) => () => setNumberOfNodes(number),
    [setNumberOfNodes]
  );

  useEffect(() => {
    setNetwork(getElements(numberOfNodes));
  }, [numberOfNodes]);

  useEffect(() => {
    const { nodes, edges } = network;
    const dagreGraph = new dagre.graphlib.Graph();
    dagreGraph.setDefaultEdgeLabel(() => ({}));
    const direction = "LR";
    const isHorizontal = direction === "LR";
    dagreGraph.setGraph({
      rankdir: direction,
      ranksep: 200,
      nodesep: 5,
      edgesep: 1,
      ranker: "tight-tree",
      marginx: 0,
      marginy: 0,
    });

    nodes.forEach((n) => dagreGraph.setNode(n.id, { width: 10, height: 10 }));
    edges.forEach((e) => dagreGraph.setEdge(e.source, e.target));

    dagre.layout(dagreGraph);

    const lEls = nodes.map((n) => {
      const nodeWithPosition = dagreGraph.node(n.id);
      n.targetPosition = isHorizontal ? "left" : "top";
      n.sourcePosition = isHorizontal ? "right" : "bottom";
      n.position = {
        x: nodeWithPosition.x,
        y: nodeWithPosition.y,
      };
      n.style = {
        ...n.style,
        width: "10px",
        height: "10px",
      };

      return n;
    });

    setLayoutedElements([...lEls, ...edges]);
  }, [network, reactFlowRef]);

  useEffect(() => {
    if (reactFlowRef) {
      reactFlowRef.fitView();
    }
  }, [layoutedElements, reactFlowRef]);

  return (
    <div>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        {NODE_NUMBER_OPTIONS.map((n) => (
          <button
            onClick={onChangeNumberOfNodes(n)}
            style={{
              margin: "0 5px",
              background: numberOfNodes === n ? "#34495e" : "#3498db",
              color: "white",
              fontWeight: "600",
              boxShadow: "none",
              border: "none",
              height: "30px",
              padding: "0 20px",
              cursor: "pointer",
            }}
          >
            {n}
          </button>
        ))}
      </div>
      <div
        style={{
          width: `${1000}px`,
          height: `${500}px`,
          border: "1px solid lightgrey",
          margin: "100px auto",
        }}
      >
        <ReactFlowProvider>
          <ReactFlow
            elements={layoutedElements}
            onLoad={setReactFlowRef}
            elementsSelectable={false}
            nodesConnectable={false}
            nodesDraggable={false}
            zoomOnScroll={false}
            zoomOnPinch={false}
            panOnScroll={false}
            zoomOnDoubleClick={false}
            // paneMoveable={false}
          >
            <Controls
              showInteractive={false}
              style={{ left: "unset", right: "10px" }}
            />
          </ReactFlow>
        </ReactFlowProvider>
      </div>
    </div>
  );
};

export default LayoutFlow;
