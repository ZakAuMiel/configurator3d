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

  const getStyle = (texture: string) => {
    switch (texture) {
      case "red":
        return { backgroundColor: "red" };
      case "green":
        return { backgroundColor: "green" };
      case "wood":
        return {
          backgroundImage: 'url("/textures/wood-diffuse_124.jpg")',
          backgroundSize: "cover",
        };
      case "metal":
        return {
          backgroundImage: 'url("/textures/metal_basecolor.jpg")',
          backgroundSize: "cover",
        };
      default:
        return {};
    }
  };

  return (
    <div className="p-4 bg-gray-800 text-white space-y-4 w-64 overflow-y-auto">
      {/* Modèles */}
      <div className="flex flex-col gap-2">
        <span className="font-bold">Modèle</span>
        {models.map((m) => (
          <button
            key={m}
            onClick={() => onModelChange(m)}
            className={`px-3 py-1 rounded transition ${
              currentModel === m ? "bg-blue-700" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Textures/Couleurs */}
      <div className="flex flex-col gap-2">
        <span className="font-bold">Textures/Couleurs</span>
        <div className="flex flex-wrap gap-2">
          {textures.map((t) => (
            <button
              key={t}
              onClick={() => onTextureChange(t)}
              className="w-10 h-10 rounded-full border-2 border-white hover:scale-110 transition"
              style={getStyle(t)}
              title={t}
            />
          ))}
        </div>
      </div>

      {/* Parties */}
      <div className="flex flex-col gap-2">
        <span className="font-bold">Parties</span>
        {parts.map((p) => (
          <button
            key={p}
            onClick={() => onPartSelect(p)}
            className="bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded transition"
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}
