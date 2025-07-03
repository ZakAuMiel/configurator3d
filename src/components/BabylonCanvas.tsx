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
} from "@babylonjs/core";
import { loadCube } from "./scenes/CubeScene";
import { loadTableScene } from "./scenes/TableScene";

export type ModelType = "cube" | "table";

type BabylonCanvasProps = {
  model: ModelType;
  texture: string;
  part: string;
  onPartsUpdate: (parts: string[]) => void;
};

export default function BabylonCanvas({ model, texture, part, onPartsUpdate }: BabylonCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sceneRef = useRef<Scene | null>(null);
  const engineRef = useRef<Engine | null>(null);
  const meshRef = useRef<any>(null);

  useEffect(() => {
    const engine = new Engine(canvasRef.current!, true);
    engineRef.current = engine;

    const scene = new Scene(engine);
    sceneRef.current = scene;

    const camera = new ArcRotateCamera("camera", Math.PI / 2, Math.PI / 3, 6, Vector3.Zero(), scene);
    camera.attachControl(canvasRef.current!, true);

    new HemisphericLight("light", new Vector3(0, 1, 0), scene);

    engine.runRenderLoop(() => scene.render());
    window.addEventListener("resize", () => engine.resize());

    return () => engine.dispose();
  }, []);

  useEffect(() => {
    if (!sceneRef.current || !model) return;

    const loadModel = async () => {
      if (meshRef.current) {
        meshRef.current.dispose();
      }

      const scene = sceneRef.current!;

      if (model === "cube") {
        const { mesh } = loadCube(scene);
        meshRef.current = mesh;
        onPartsUpdate(["face0", "face1", "face2", "face3", "face4", "face5"]);
      } else if (model === "table") {
        const mesh = await loadTableScene(scene);
        meshRef.current = mesh;
        const parts = mesh.getChildMeshes().map((m) => m.name);
        onPartsUpdate(parts);
      }
    };

    loadModel();
  }, [model]);

  useEffect(() => {
    if (!sceneRef.current || !meshRef.current || !part || !texture) return;
    const scene = sceneRef.current;
    const mesh = scene.getMeshByName(part);
    if (!mesh) return;

    const material = new StandardMaterial(`mat-${texture}`, scene);

    switch (texture) {
      case "red":
        material.diffuseColor = Color3.Red();
        break;
      case "green":
        material.diffuseColor = Color3.Green();
        break;
      case "wood":
        material.diffuseTexture = new Texture("/textures/wood-diffuse_124.jpg", scene);
        break;
      case "metal":
        material.diffuseTexture = new Texture("/textures/metal_basecolor.jpg", scene);
        break;
    }

    mesh.material = material;
  }, [texture, part, model]);

  return <canvas ref={canvasRef} className="w-full h-screen" />;
}
