import keyMirror from "keymirror";

const NODE_TYPES = keyMirror({
  SOURCE: null,
  FACTORY: null,
  WAREHOUSE: null,
  DC: null,
  RETAILER: null,
});

const NODE_COLOR_MAP = {
  [NODE_TYPES.SOURCE]: "#67718E",
  [NODE_TYPES.FACTORY]: "#DC2518",
  [NODE_TYPES.WAREHOUSE]: "#2CC92C",
  [NODE_TYPES.DC]: "#0072F5",
  [NODE_TYPES.RETAILER]: "#FFBB33",
};

export const NODE_RANK = {
  [NODE_TYPES.SOURCE]: 1,
  [NODE_TYPES.FACTORY]: 2,
  [NODE_TYPES.WAREHOUSE]: 4,
  [NODE_TYPES.DC]: 5,
  [NODE_TYPES.RETAILER]: 6,
};

export const getNodeColor = (type) => NODE_COLOR_MAP[type] || "black";
