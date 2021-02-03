const position = { x: 0, y: 0 };
const edgeType = "straight";

const labelStyle = {
  width: 30,
  height: 10,
  border: "none",
  display: "flex",
  justifyContent: "flex-end",
};

export const labelNodes = [
  {
    id: "7",
    data: { label: "Sourcing" },
    position,
    style: labelStyle,
  },
  {
    id: "8",
    data: { label: "Manufacturing" },
    position,
    style: labelStyle,
  },
  {
    id: "9",
    data: { label: "Mother Warehouse" },
    position,
    style: labelStyle,
  },
  {
    id: "10",
    data: { label: "Distribution Centers" },
    position,
    style: labelStyle,
  },
  {
    id: "11",
    data: { label: "Customer Nodes" },
    position,
    style: labelStyle,
  },
];

export const labelEdges = [
  {
    id: "e78",
    source: "7",
    target: "8",
    type: edgeType,
    style: { strokeWidth: 0 },
  },
  {
    id: "e89",
    source: "8",
    target: "9",
    type: edgeType,
    style: { strokeWidth: 0 },
  },
  {
    id: "e910",
    source: "9",
    target: "10",
    type: edgeType,
    style: { strokeWidth: 0 },
  },
  {
    id: "e1011",
    source: "10",
    target: "11",
    type: edgeType,
    style: { strokeWidth: 0 },
  },
];
