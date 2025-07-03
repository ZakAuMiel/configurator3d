import {
    MeshBuilder,
    MultiMaterial,
    StandardMaterial,
    Color3,
    SubMesh,
    Scene,
  } from "@babylonjs/core";
  
  export function loadCube(scene: Scene) {
    const redMat = new StandardMaterial("red", scene);
    redMat.diffuseColor = Color3.Red();
  
    const multiMat = new MultiMaterial("multi", scene);
    for (let i = 0; i < 6; i++) {
      multiMat.subMaterials.push(redMat);
    }
  
    const box = MeshBuilder.CreateBox("box", { size: 2 }, scene);
    box.material = multiMat;
  
    box.subMeshes = [];
    const verticesCount = box.getTotalVertices();
    for (let i = 0; i < 6; i++) {
      SubMesh.AddToMesh(i, 0, verticesCount, i * 6, 6, box);
    }
  
    return { mesh: box, material: multiMat };
  }