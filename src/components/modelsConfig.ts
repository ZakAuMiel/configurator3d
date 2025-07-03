
export const modelsConfig = {
    cube: {
      type: "primitive",
      name: "Cube",
      parts: ["face1", "face2", "face3", "face4", "face5", "face6"],
    },
    table: {
      type: "glb",
      name: "Table",
      url: "/models/table.glb",
      parts: ["Plateau", "Pied1", "Pied2", "Pied3", "Pied4"],
    },
    chair: {
      type: "glb",
      name: "Chaise",
      url: "/models/chair.glb",
      parts: ["Assise", "Dossier", "Pied1", "Pied2", "Pied3", "Pied4"],
    },
  };
  