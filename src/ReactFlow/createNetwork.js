import cloneDeep from "lodash/cloneDeep";

const nanoid = () => Math.random().toString(36).substr(2);

const getRandomElement = (items = []) =>
  items[Math.floor(Math.random() * items.length)];

const getRandomNumber = (max = 1) => Math.ceil(Math.random() * max);

const NODE_POSITION = { x: 0, y: 0 };

const NODE_TYPES = {
  SOURCE: "SOURCE",
  FACTORY: "FACTORY",
  WAREHOUSE: "WAREHOUSE",
  DC: "DC",
  RETAILER: "RETAILER",
};

const ELEMENT_TYPE_MAP = {
  NODE: "NODE",
  EDGE: "NODE",
};

const nodeTypes = Object.keys(NODE_TYPES);

const nodeEdgesConfigMap = {
  [NODE_TYPES.SOURCE]: {
    destinations: [NODE_TYPES.FACTORY],
    origins: [],
    style: { padding: 0, borderRadius: "50%" },
    color: "#34495e",
  },
  [NODE_TYPES.FACTORY]: {
    origins: [NODE_TYPES.SOURCE],
    destinations: [NODE_TYPES.WAREHOUSE],
    style: { padding: 0, borderRadius: "50%" },
    color: "#e74c3c",
  },
  [NODE_TYPES.WAREHOUSE]: {
    origins: [NODE_TYPES.FACTORY],
    destinations: [NODE_TYPES.DC],
    style: { padding: 0, borderRadius: "50%" },
    color: "#2ecc71",
  },
  [NODE_TYPES.DC]: {
    origins: [NODE_TYPES.WAREHOUSE],
    destinations: [NODE_TYPES.RETAILER],
    style: { padding: 0, borderRadius: "50%" },
    color: "#3498db",
  },
  [NODE_TYPES.RETAILER]: {
    origins: [NODE_TYPES.DC],
    style: { padding: 0, borderRadius: "50%" },
    destinations: [],
    color: "#f1c40f",
  },
};

class Node {
  constructor(type) {
    this.id = nanoid();
    this.nodeType = type;
    this.position = NODE_POSITION;
    this.elementType = ELEMENT_TYPE_MAP.NODE;
    this.quantity = getRandomNumber(1000);
    this.type = "default";
    this.data = { label: "" };
    this.setStyle();
  }

  setStyle() {
    const config = nodeEdgesConfigMap[this.nodeType] || {};
    const style = config.style || {};
    this.style = {
      ...style,
      backgroundColor: config.color || "#000000",
      borderColor: config.color || "#000000",
    };
  }

  setNodeType(type) {
    this.type = type;
  }

  toJS() {
    const {
      id,
      data,
      position,
      nodeType,
      elementType,
      quantity,
      type,
      style,
    } = this;
    return {
      id,
      data,
      position,
      type,
      nodeType,
      elementType,
      quantity,
      style,
    };
  }
}

class Edge {
  constructor({ source = null, target = null, sourceType = "" } = {}) {
    this.id = nanoid();
    this.source = source;
    this.target = target;
    this.elementType = ELEMENT_TYPE_MAP.EDGE;
    this.arrowHeadType = "arrow";
    this.setStyle(sourceType);
    // this.type = "straight";
  }

  setStyle(type) {
    const defaultStyle = { animated: true, label: "animated styled edge" };
    const sourceConfig = nodeEdgesConfigMap[type];
    if (sourceConfig) {
      const color = sourceConfig.color;
      this.style = { ...defaultStyle, stroke: color };
      return;
    }
    this.style = defaultStyle;
  }

  setSource(source, sourceType) {
    this.source = source;
    this.setStyle(sourceType);
  }

  setTarget(target) {
    this.target = target;
  }

  toJS() {
    const {
      id,
      source,
      target,
      elementType,
      type,
      arrowHeadType,
      style,
    } = this;
    return {
      id,
      source,
      target,
      elementType,
      type,
      arrowHeadType,
      style,
    };
  }
}

const SEED_NODES = [
  new Node(NODE_TYPES.SOURCE).toJS(),
  new Node(NODE_TYPES.FACTORY).toJS(),
  new Node(NODE_TYPES.WAREHOUSE).toJS(),
  new Node(NODE_TYPES.DC).toJS(),
  new Node(NODE_TYPES.DC).toJS(),
  new Node(NODE_TYPES.RETAILER).toJS(),
];

const SEED_EDGES = [
  new Edge({ source: SEED_NODES[0].id, target: SEED_NODES[1].id }).toJS(),
  new Edge({ source: SEED_NODES[1].id, target: SEED_NODES[2].id }).toJS(),
  new Edge({ source: SEED_NODES[2].id, target: SEED_NODES[3].id }).toJS(),
  new Edge({ source: SEED_NODES[3].id, target: SEED_NODES[4].id }).toJS(),
  new Edge({ source: SEED_NODES[4].id, target: SEED_NODES[5].id }).toJS(),
];

const getEntityById = (entities = [], _id) =>
  entities.find(({ id }) => id === _id);

export const getElements = (number) => {
  const nodes = cloneDeep(SEED_NODES);
  const edges = cloneDeep(SEED_EDGES);

  for (let i = 0; i < number - 5; i++) {
    const newNode = new Node(getRandomElement(nodeTypes));
    const { origins, destinations } = nodeEdgesConfigMap[newNode.nodeType];

    if (origins.length) {
      const edge = new Edge();
      const originType = getRandomElement(origins);
      const randomOriginNode = getRandomElement(
        nodes.filter(({ nodeType }) => nodeType === originType)
      );

      edge.setSource(randomOriginNode.id, randomOriginNode.nodeType);
      edge.setTarget(newNode.id);

      edges.push(edge.toJS());
    }

    if (destinations.length) {
      const edge = new Edge();
      const destinationType = getRandomElement(destinations);
      const randomDestinationNode = getRandomElement(
        nodes.filter(({ nodeType }) => nodeType === destinationType)
      );
      edge.setSource(newNode.id, newNode.nodeType);
      edge.setTarget(randomDestinationNode.id);

      edges.push(edge.toJS());
    }

    nodes.push(newNode.toJS());
  }

  return { nodes, edges };
};
