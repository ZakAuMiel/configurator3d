// src/core/TransitionManager.ts
import {
    AbstractMesh,
    Animation,
    Scene,
    Vector3,
    EasingFunction,
    CubicEase,
  } from "@babylonjs/core";
  
  type TransitionOptions = {
    scene: Scene;
    oldMesh: AbstractMesh | null;
    loadNewMeshFn: () => Promise<AbstractMesh>;
    animationStyle?: "scaleFade";
  };
  
  export async function transitionBetweenMeshes({
    scene,
    oldMesh,
    loadNewMeshFn,
    animationStyle = "scaleFade",
  }: TransitionOptions): Promise<AbstractMesh> {
    // 1. Animation de sortie
    if (oldMesh) {
      const ease = new CubicEase();
      ease.setEasingMode(EasingFunction.EASINGMODE_EASEINOUT);
  
      const scaleOut = new Animation(
        "scaleOut",
        "scaling",
        60,
        Animation.ANIMATIONTYPE_VECTOR3,
        Animation.ANIMATIONLOOPMODE_CONSTANT
      );
      scaleOut.setEasingFunction(ease);
      scaleOut.setKeys([
        { frame: 0, value: oldMesh.scaling.clone() },
        { frame: 30, value: Vector3.Zero() },
      ]);
  
      const fadeOut = new Animation(
        "fadeOut",
        "visibility",
        60,
        Animation.ANIMATIONTYPE_FLOAT,
        Animation.ANIMATIONLOOPMODE_CONSTANT
      );
      fadeOut.setEasingFunction(ease);
      fadeOut.setKeys([
        { frame: 0, value: 1 },
        { frame: 30, value: 0 },
      ]);
  
      await scene.beginDirectAnimation(oldMesh, [scaleOut, fadeOut], 0, 30, false);
      oldMesh.dispose();
    }
  
    // 2. Pause
    await new Promise((resolve) => setTimeout(resolve, 200));
  
    // 3. Nouveau modèle
    const newMesh = await loadNewMeshFn();
    newMesh.scaling = Vector3.Zero();
    newMesh.visibility = 0;
  
    // 4. Animation d'entrée
    const ease = new CubicEase();
    ease.setEasingMode(EasingFunction.EASINGMODE_EASEINOUT);
  
    const scaleIn = new Animation(
      "scaleIn",
      "scaling",
      60,
      Animation.ANIMATIONTYPE_VECTOR3,
      Animation.ANIMATIONLOOPMODE_CONSTANT
    );
    scaleIn.setEasingFunction(ease);
    scaleIn.setKeys([
      { frame: 0, value: Vector3.Zero() },
      { frame: 30, value: new Vector3(1, 1, 1) },
    ]);
  
    const fadeIn = new Animation(
      "fadeIn",
      "visibility",
      60,
      Animation.ANIMATIONTYPE_FLOAT,
      Animation.ANIMATIONLOOPMODE_CONSTANT
    );
    fadeIn.setEasingFunction(ease);
    fadeIn.setKeys([
      { frame: 0, value: 0 },
      { frame: 30, value: 1 },
    ]);
  
    scene.beginDirectAnimation(newMesh, [scaleIn, fadeIn], 0, 30, false);
  
    return newMesh;
  }
  