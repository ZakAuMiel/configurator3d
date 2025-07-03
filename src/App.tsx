import { useState } from "react";
import BabylonCanvas from "./components/BabylonCanvas";
import UIControls from "./components/UIControls";

function App() {
  const [model, setModel] = useState("cube");
  const [texture, setTexture] = useState("red");
  const [part, setPart] = useState("face0");

  return (
    <div className="flex h-screen w-screen">
      <BabylonCanvas model={model} texture={texture} part={part} />
      <UIControls
        onModelChange={setModel}
        onTextureChange={setTexture}
        onPartSelect={setPart}
      />
    </div>
  );
}

export default App;
