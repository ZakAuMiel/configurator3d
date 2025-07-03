// src/components/scenes/CubeScene.ts
import {
    MeshBuilder,
    Scene,
    StandardMaterial,
    Color3,
    MultiMaterial,
    SubMesh,
    Vector3,
  } from "@babylonjs/core";
  
  export function loadCube(scene: Scene) {
    const box = MeshBuilder.CreateBox("box", { size: 75 }, scene);
    
    // Créer 6 matériaux identiques par défaut (rouges)
    const redMat = new StandardMaterial("mat-red", scene);
    redMat.diffuseColor = Color3.Red();
  
    const multiMat = new MultiMaterial("multiMat", scene);
    multiMat.subMaterials = [redMat, redMat, redMat, redMat, redMat, redMat];
  
    box.material = multiMat;
  
    // Diviser le mesh en 6 sous-meshes (1 par face)
    box.subMeshes = [];
    const verticesCount = box.getTotalVertices();
    for (let i = 0; i < 6; i++) {
      SubMesh.AddToMesh(i, 0, verticesCount, i * 6, 6, box);
    }
  
    return { mesh: box, material: multiMat };
  }
  