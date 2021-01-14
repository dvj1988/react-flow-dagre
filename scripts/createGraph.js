const NODE_TYPES = {
  SOURCE: "SOURCE",
  FACTORY: "FACTORY",
  WAREHOUSE: "WAREHOUSE",
  DC: "DC",
  RETAILER: "RETAILER",
};

const nodeTypes = [
  NODE_TYPES.SOURCE,
  NODE_TYPES.FACTORY,
  NODE_TYPES.WAREHOUSE,
  NODE_TYPES.DC,
  NODE_TYPES.RETAILER,
];

const nodeEdgesMap = {
  [NODE_TYPES.SOURCE]: {
    type: "input",
    destinations: [NODE_TYPES.FACTORY],
  },
  [NODE_TYPES.FACTORY]: {
    type: "bi",
    origin: [NODE_TYPES.SOURCE],
    destination: [NODE_TYPES.WAREHOUSE, NODE_TYPES.FACTORY],
  },
  [NODE_TYPES.WAREHOUSE]: {
    type: "bi",
    origin: [NODE_TYPES.FACTORY],
    destination: [NODE_TYPES.DC],
  },
  [NODE_TYPES.DC]: {
    type: "bi",
    origin: [NODE_TYPES.WAREHOUSE],
    destination: [NODE_TYPES.DC, NODE_TYPES.RETAILER],
  },
  [NODE_TYPES.RETAILER]: {
    type: "output",
    origin: [NODE_TYPES.DC],
  },
};
