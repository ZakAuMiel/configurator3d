// src/App.tsx
import { useState } from "react";
import BabylonCanvas from "./components/BabylonCanvas";
import UIControls from "./components/UIControls";
import type { ModelType } from "./components/BabylonCanvas";

function App() {
  const [model, setModel] = useState<ModelType>("cube");
  const [texture, setTexture] = useState("red");
  const [part, setPart] = useState("face0");
  const [parts, setParts] = useState<string[]>(["face0", "face1", "face2", "face3", "face4", "face5"]);

  return (
    <div className="flex h-screen">
      <BabylonCanvas
        model={model}
        texture={texture}
        part={part}
        onPartsUpdate={setParts}
      />
      <UIControls
        onModelChange={(m) => {
          setModel(m as ModelType);
          setPart(""); // Reset la partie sélectionnée quand on change de modèle
        }}
        onTextureChange={setTexture}
        onPartSelect={setPart}
        currentModel={model}
        parts={parts}
      />
    </div>
  );
}

export default App;
