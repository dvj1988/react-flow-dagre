const cloneDeep = require("lodash/cloneDeep");
const keyMirror = require("keyMirror");
const fs = require("fs");
const path = require("path");

const nanoid = () => Math.random().toString(36).substr(2);
const NUMBER_OF_CONNECTIONS = 45;

const getRandomElement = (items = []) =>
  items[Math.floor(Math.random() * items.length)];

const getRandomNumber = (max = 1) => Math.ceil(Math.random() * max);

const NODE_POSITION = { x: 0, y: 0 };

const NODE_TYPES = keyMirror({
  SOURCE: null,
  FACTORY: null,
  WAREHOUSE: null,
  DC: null,
  RETAILER: null,
});

const ELEMENT_TYPE_MAP = keyMirror({
  NODE: null,
  EDGE: null,
});

const nodeTypes = Object.keys(NODE_TYPES);

const nodeEdgesConfigMap = {
  [NODE_TYPES.SOURCE]: {
    destinations: [NODE_TYPES.FACTORY],
    origins: [],
  },
  [NODE_TYPES.FACTORY]: {
    origins: [NODE_TYPES.SOURCE],
    destinations: [NODE_TYPES.WAREHOUSE],
  },
  [NODE_TYPES.WAREHOUSE]: {
    origins: [NODE_TYPES.FACTORY],
    destinations: [NODE_TYPES.DC],
  },
  [NODE_TYPES.DC]: {
    origins: [NODE_TYPES.WAREHOUSE],
    destinations: [NODE_TYPES.RETAILER],
  },
  [NODE_TYPES.RETAILER]: {
    origins: [NODE_TYPES.DC],
    destinations: [],
  },
};

class Node {
  constructor(type) {
    this.id = nanoid();
    this.type = type;
    this.position = NODE_POSITION;
    this.elementType = ELEMENT_TYPE_MAP.NODE;
    this.quantity = getRandomNumber(1000);
  }

  setNodeType(type) {
    this.type = type;
  }

  toJS() {
    const { id, data, position, type, elementType, quantity } = this;
    return {
      id,
      data,
      position,
      type,
      elementType,
      quantity,
    };
  }
}

class Edge {
  constructor(source = null, target = null) {
    this.id = nanoid();
    this.source = source;
    this.target = target;
    this.elementType = ELEMENT_TYPE_MAP.EDGE;
  }

  setSource(source) {
    this.source = source;
  }

  setTarget(target) {
    this.target = target;
  }

  toJS() {
    const { id, source, target, elementType } = this;
    return {
      id,
      source,
      target,
      elementType,
    };
  }
}

const SEED_NODES = [
  {
    id: nanoid(),
    position: NODE_POSITION,
    type: NODE_TYPES.SOURCE,
    elementType: ELEMENT_TYPE_MAP.NODE,
    quantity: getRandomNumber(1000),
  },
  {
    id: nanoid(),
    position: NODE_POSITION,
    type: NODE_TYPES.FACTORY,
    elementType: ELEMENT_TYPE_MAP.NODE,
    quantity: getRandomNumber(1000),
  },
  {
    id: nanoid(),
    position: NODE_POSITION,
    type: NODE_TYPES.WAREHOUSE,
    elementType: ELEMENT_TYPE_MAP.NODE,
    quantity: getRandomNumber(1000),
  },
  {
    id: nanoid(),
    position: NODE_POSITION,
    type: NODE_TYPES.DC,
    elementType: ELEMENT_TYPE_MAP.NODE,
    quantity: getRandomNumber(1000),
  },
  {
    id: nanoid(),
    position: NODE_POSITION,
    type: NODE_TYPES.RETAILER,
    elementType: ELEMENT_TYPE_MAP.NODE,
    quantity: getRandomNumber(1000),
  },
];

const SEED_EDGES = [
  {
    id: "e12",
    source: SEED_NODES[0].id,
    target: SEED_NODES[1].id,
    elementType: ELEMENT_TYPE_MAP.EDGE,
  },
  {
    id: "e23",
    source: SEED_NODES[1].id,
    target: SEED_NODES[2].id,
    elementType: ELEMENT_TYPE_MAP.EDGE,
  },
  {
    id: "e34",
    source: SEED_NODES[2].id,
    target: SEED_NODES[3].id,
    elementType: ELEMENT_TYPE_MAP.EDGE,
  },
  {
    id: "e45",
    source: SEED_NODES[3].id,
    target: SEED_NODES[4].id,
    elementType: ELEMENT_TYPE_MAP.EDGE,
  },
];

(async () => {
  const nodes = cloneDeep(SEED_NODES);
  const edges = cloneDeep(SEED_EDGES);

  for (let i = 0; i < NUMBER_OF_CONNECTIONS; i++) {
    const newNode = new Node(getRandomElement(nodeTypes));
    const { origins, destinations } = nodeEdgesConfigMap[newNode.type];

    if (origins.length) {
      const edge = new Edge();
      const originType = getRandomElement(origins);
      const randomOriginNode = getRandomElement(
        nodes.filter(({ type }) => type === originType)
      );

      edge.setSource(randomOriginNode.id);
      edge.setTarget(newNode.id);

      edges.push(edge.toJS());
    }

    if (destinations.length) {
      const edge = new Edge();
      const destinationType = getRandomElement(destinations);
      const randomDestinationNode = getRandomElement(
        nodes.filter(({ type }) => type === destinationType)
      );
      edge.setSource(newNode.id);
      edge.setTarget(randomDestinationNode.id);

      edges.push(edge.toJS());
    }

    nodes.push(newNode.toJS());
  }

  fs.writeFile(
    path.resolve(`${__dirname}/nodes_${nodes.length}.json`),
    JSON.stringify([...nodes, ...edges]),
    (err) => {
      if (err) {
        console.error(err);
      }
    }
  );
})();
