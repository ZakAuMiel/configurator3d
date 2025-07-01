import { useEffect, useRef } from "react"

import {
  Engine,
  Scene,
  ArcRotateCamera,
  HemisphericLight,
  MeshBuilder,
  Vector3,
} from "@babylonjs/core"


export default function BabylonCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const engine = new Engine(canvasRef.current, true)
    const scene = new Scene(engine)

    const camera = new ArcRotateCamera("camera", Math.PI / 2, Math.PI / 2.5, 5, Vector3.Zero(), scene)
    camera.attachControl(canvasRef.current, true)


    new HemisphericLight("light", new Vector3(1, 1, 0), scene)
    MeshBuilder.CreateBox("box", {}, scene)

    engine.runRenderLoop(() => {
      scene.render()
    })

    window.addEventListener("resize", () => {
      engine.resize()
    })

    return () => {
      engine.dispose()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full block bg-black"
    />
  )
}
