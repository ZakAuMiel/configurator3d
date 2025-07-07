// src/scenes/loadKitchenScene.ts
import { SceneLoader, Scene, AbstractMesh } from "@babylonjs/core";
import "@babylonjs/loaders";

export async function loadKitchenScene(scene: Scene): Promise<AbstractMesh[]> {
  const result = await SceneLoader.ImportMeshAsync("", "/models/", "Kitchen.glb", scene);
  return result.meshes.filter((mesh) => mesh.name !== "__root__");
}
