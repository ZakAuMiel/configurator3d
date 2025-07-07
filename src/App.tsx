// src/App.tsx
import { useState } from "react";
import BabylonCanvas from "./components/BabylonCanvas";
import UIControls from "./components/UIControls";

function App() {
  const [texture, setTexture] = useState("red");
  const [part, setPart] = useState("");
  const [parts, setParts] = useState<string[]>([]);

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <BabylonCanvas
        texture={texture}
        part={part}
        onPartsUpdate={(updatedParts) => {
          setParts(updatedParts);
          if (updatedParts.length > 0 && !updatedParts.includes(part)) {
            setPart(updatedParts[0]); // Sélectionner un élément par défaut
          }
        }}
      />
      <UIControls
        onTextureChange={setTexture}
        onPartSelect={setPart}
        parts={parts}
      />
    </div>
  );
}

export default App;
