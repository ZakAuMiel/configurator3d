// src/components/UIControls.tsx

type UIControlsProps = {
  onModelChange: (model: string) => void;
  onTextureChange: (texture: string) => void;
  onPartSelect: (part: string) => void;
  currentModel: string;
  parts: string[];
};

export default function UIControls({
  onModelChange,
  onTextureChange,
  onPartSelect,
  currentModel,
  parts,
}: UIControlsProps) {
  const textures = ["red", "green", "wood", "metal"];
  const models = ["cube", "table"];

  return (
    <div className="p-4 bg-gray-800 text-white space-y-4 w-64 overflow-y-auto">
      <div className="flex flex-col gap-2">
        <span className="font-bold">Modèle</span>
        {models.map((m) => (
          <button
            key={m}
            onClick={() => onModelChange(m)}
            className={`px-3 py-1 rounded ${
              currentModel === m ? "bg-blue-700" : "bg-blue-500"
            }`}
          >
            {m}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <span className="font-bold">Textures/Couleurs</span>
        {textures.map((t) => (
          <button
            key={t}
            onClick={() => onTextureChange(t)}
            className="bg-green-500 px-3 py-1 rounded"
          >
            {t}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <span className="font-bold">Parties</span>
        {parts.map((p) => (
          <button
            key={p}
            onClick={() => onPartSelect(p)}
            className="bg-gray-600 px-3 py-1 rounded"
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}
