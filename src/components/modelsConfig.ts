// src/modelsConfig.ts
export const modelsConfig = {
  cube: {
    type: "primitive",
    name: "Cube",
    parts: ["face0", "face1", "face2", "face3", "face4", "face5"],
  },
  table: {
    type: "glb",
    name: "Table",
    parts: ["node0_primitive0", "node0_primitive1"],
  },
} as const;

export type ModelKey = keyof typeof modelsConfig;
