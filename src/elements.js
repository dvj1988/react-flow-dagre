const position = { x: 0, y: 0 };
const edgeType = "straight";
const style = {
  width: 5,
  height: 5,
  borderRadius: "50%",
  background: "red",
  border: "none",
};

const labelStyle = {
  width: 30,
  height: 10,
  border: "none",
  display: "flex",
  justifyContent: "flex-end",
};

export const initialElements = [
  {
    id: "1",
    data: { label: "" },
    position,
    style,
  },
  {
    id: "2",
    data: { label: "" },
    position,
    style,
  },
  {
    id: "e12",
    source: "1",
    target: "2",
    type: edgeType,
    arrowHeadType: "arrow",
  },

  {
    id: "3",
    data: { label: "" },
    position,
    style,
  },
  {
    id: "e23",
    source: "2",
    target: "3",
    type: edgeType,
    arrowHeadType: "arrow",
  },

  {
    id: "4",
    data: { label: "" },
    position,
    style,
  },
  {
    id: "e34",
    source: "3",
    target: "4",
    type: edgeType,
    arrowHeadType: "arrow",
  },

  {
    id: "5",
    data: { label: "" },
    position,
    style,
  },
  {
    id: "e45",
    source: "4",
    target: "5",
    type: edgeType,
    arrowHeadType: "arrow",
  },
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
