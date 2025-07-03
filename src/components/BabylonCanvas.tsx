// src/components/BabylonCanvas.tsx
import { useEffect, useRef, useState } from "react";
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

type BabylonCanvasProps = {
  model: string;
  texture: string;
  part: string;
};

export default function BabylonCanvas({ model, texture, part }: BabylonCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sceneRef = useRef<Scene | null>(null);
  const engineRef = useRef<Engine | null>(null);
  const meshRef = useRef<any>(null);
  const [multiMat, setMultiMat] = useState<any>(null);

  useEffect(() => {
    const engine = new Engine(canvasRef.current, true);
    engineRef.current = engine;

    const scene = new Scene(engine);
    sceneRef.current = scene;

    const camera = new ArcRotateCamera("camera", Math.PI / 2, Math.PI / 3, 6, Vector3.Zero(), scene);
    camera.attachControl(canvasRef.current, true);

    new HemisphericLight("light", new Vector3(0, 1, 0), scene);

    engine.runRenderLoop(() => scene.render());
    window.addEventListener("resize", () => engine.resize());

    return () => engine.dispose();
  }, []);

  useEffect(() => {
    if (!sceneRef.current || !model) return;

    // Remove previous mesh
    if (meshRef.current) {
      meshRef.current.dispose();
    }

    // Load appropriate scene model
    if (model === "cube") {
      const { mesh, material } = loadCube(sceneRef.current);
      meshRef.current = mesh;
      setMultiMat(material);
    }
  }, [model]);

  useEffect(() => {
    if (!multiMat || !sceneRef.current) return;

    const scene = sceneRef.current;
    let newMat = null;

    if (texture === "red") {
      newMat = new StandardMaterial("mat-red", scene);
      newMat.diffuseColor = Color3.Red();
    } else if (texture === "green") {
      newMat = new StandardMaterial("mat-green", scene);
      newMat.diffuseColor = Color3.Green();
    } else if (texture === "wood") {
      newMat = new StandardMaterial("mat-wood", scene);
      newMat.diffuseTexture = new Texture("https://assets.babylonjs.com/environments/wood.jpg", scene);
    }

    const faceIndex = parseInt(part.replace("face", ""));
    if (!isNaN(faceIndex)) {
      multiMat.subMaterials[faceIndex] = newMat;
    }
  }, [texture, part, multiMat]);

  return <canvas ref={canvasRef} className="w-full h-screen" />;
}

