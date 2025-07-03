// src/components/scenes/TableScene.ts
import { SceneLoader, Scene } from "@babylonjs/core";
import "@babylonjs/loaders";

export async function loadTableScene(scene: Scene) {
  const result = await SceneLoader.ImportMeshAsync("", "/models/", "Table.glb", scene);
  const root = result.meshes[0];
  root.name = "tableRoot";
  return root;
}