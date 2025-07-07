// src/components/BabylonCanvas.tsx

import { useEffect, useRef } from "react";
import {
  Engine,
  Scene,
  ArcRotateCamera,
  Vector3,
  HemisphericLight,
  StandardMaterial,
  Color3,
  Texture,
  AbstractMesh,
} from "@babylonjs/core";
import "@babylonjs/loaders";
import { loadKitchenScene } from "./scenes/loadKitchenScene"; // Assurez-vous que ce chemin est correct

type BabylonCanvasProps = {
  texture: string;
  part: string;
  onPartsUpdate: (parts: string[]) => void;
};

export default function BabylonCanvas({ texture, part, onPartsUpdate }: BabylonCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sceneRef = useRef<Scene | null>(null);
  const engineRef = useRef<Engine | null>(null);
  const meshesRef = useRef<AbstractMesh[]>([]);

  useEffect(() => {
    const engine = new Engine(canvasRef.current!, true);
    const scene = new Scene(engine);
    sceneRef.current = scene;
    engineRef.current = engine;

    const camera = new ArcRotateCamera("camera", Math.PI / 2, Math.PI / 3, 10, new Vector3(0, 1, 0), scene);
    camera.attachControl(canvasRef.current!, true);
    new HemisphericLight("light", new Vector3(0, 1, 0), scene);

    engine.runRenderLoop(() => scene.render());
    window.addEventListener("resize", () => engine.resize());

    // Charger la scène Kitchen
    loadKitchenScene(scene).then((meshes) => {
      meshesRef.current = meshes;
      onPartsUpdate(meshes.map((mesh) => mesh.name));
    });

    return () => {
      engine.dispose();
    };
  }, []);

  useEffect(() => {
    if (!sceneRef.current || !part || !texture) return;

    const mesh = sceneRef.current.getMeshByName(part);
    if (!mesh) return;

    const material = new StandardMaterial(`mat-${texture}`, sceneRef.current);

    switch (texture) {
      case "red":
        material.diffuseColor = Color3.Red();
        break;
      case "green":
        material.diffuseColor = Color3.Green();
        break;
      case "wood":
        material.diffuseTexture = new Texture("/textures/wood-diffuse_124.jpg", sceneRef.current);
        break;
      case "metal":
        material.diffuseTexture = new Texture("/textures/metal_basecolor.jpg", sceneRef.current);
        break;
    }

    mesh.material = material;
  }, [texture, part]);

  return <canvas ref={canvasRef} className="w-full h-screen" />;
}
