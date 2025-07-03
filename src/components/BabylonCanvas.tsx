import { useEffect, useRef } from "react";
import {
  Engine,
  Scene,
  ArcRotateCamera,
  Vector3,
  HemisphericLight,
  MeshBuilder,
  StandardMaterial,
  Color3,
  Texture,
  MultiMaterial,
  SubMesh,
} from "@babylonjs/core";
import "@babylonjs/loaders";

interface BabylonCanvasProps {
  texture: string;
  part: string;
}

export default function BabylonCanvas({ texture, part }: BabylonCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sceneRef = useRef<Scene | null>(null);
  const multiMatRef = useRef<MultiMaterial | null>(null);

  useEffect(() => {
    const engine = new Engine(canvasRef.current, true);
    const scene = new Scene(engine);
    sceneRef.current = scene;

    const camera = new ArcRotateCamera("camera", Math.PI / 2, Math.PI / 3, 6, Vector3.Zero(), scene);
    camera.attachControl(canvasRef.current, true);

    new HemisphericLight("light", new Vector3(0, 1, 0), scene);

    const redMat = new StandardMaterial("red", scene);
    redMat.diffuseColor = Color3.Red();

    const greenMat = new StandardMaterial("green", scene);
    greenMat.diffuseColor = Color3.Green();

    const woodMat = new StandardMaterial("wood", scene);
    woodMat.diffuseTexture = new Texture("https://assets.babylonjs.com/environments/wood.jpg", scene);

    const multiMat = new MultiMaterial("multi", scene);
    multiMat.subMaterials.push(redMat, redMat, redMat, redMat, redMat, redMat);
    multiMatRef.current = multiMat;

    const box = MeshBuilder.CreateBox("box", { size: 2 }, scene);
    box.material = multiMat;

    box.subMeshes = [];
    const verticesCount = box.getTotalVertices();
    for (let i = 0; i < 6; i++) {
      SubMesh.AddToMesh(i, 0, verticesCount, i * 6, 6, box);
    }

    engine.runRenderLoop(() => scene.render());
    window.addEventListener("resize", () => engine.resize());

    return () => engine.dispose();
  }, []);

  useEffect(() => {
    if (!multiMatRef.current || !sceneRef.current) return;

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
      multiMatRef.current.subMaterials[faceIndex] = newMat;
    }
  }, [texture, part]);

  return <canvas ref={canvasRef} className="w-full h-screen" />;
}