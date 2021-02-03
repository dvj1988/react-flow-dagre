import React from "react";
import { hierarchy, tree } from "d3-hierarchy";

const data = {
  name: "Eve",
  children: [
    {
      name: "Cain",
    },
    {
      name: "Seth",
      children: [
        {
          name: "Enos",
        },
        {
          name: "Noam",
        },
      ],
    },
    {
      name: "Abel",
    },
    {
      name: "Awan",
      children: [
        {
          name: "Enoch",
        },
      ],
    },
    {
      name: "Azura",
    },
  ],
};

const D3Heirarchy = () => {
  const family = hierarchy(data);
  const root = tree().size([1200, 500])(family);
  console.log(root);

  return <div>D3Heirarchy</div>;
};

export default D3Heirarchy;
