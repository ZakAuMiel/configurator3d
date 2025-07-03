
type UIControlsProps = {
  onModelChange: (model: string) => void;
  onTextureChange: (texture: string) => void;
  onPartSelect: (part: string) => void;
};

export default function UIControls({
  onModelChange,
  onTextureChange,
  onPartSelect,
}: UIControlsProps) {
  const models = ["cube"];
  const textures = ["red", "green", "wood"];
  const parts = ["face0", "face1", "face2", "face3", "face4", "face5"];

  return (
    <div className="p-4 bg-gray-800 text-white space-y-4 w-64">
      <div className="flex flex-col gap-2">
        <span className="font-bold">Modèle</span>
        {models.map((m) => (
          <button key={m} onClick={() => onModelChange(m)} className="bg-blue-500 px-3 py-1 rounded">
            {m}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <span className="font-bold">Textures/Couleurs</span>
        {textures.map((t) => (
          <button key={t} onClick={() => onTextureChange(t)} className="bg-green-500 px-3 py-1 rounded">
            {t}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <span className="font-bold">Faces</span>
        {parts.map((p) => (
          <button key={p} onClick={() => onPartSelect(p)} className="bg-gray-600 px-3 py-1 rounded">
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}