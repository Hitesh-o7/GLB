import { useState } from "react";
import axios from "axios";

const UploadModelForm = () => {
  const [modelName, setModelName] = useState("");
  const [description, setDescription] = useState("");
  const [modelUrl, setModelUrl] = useState("");
  const [error, setError] = useState(""); 

  const handleUpload = async () => {
    try {
      await axios.post("http://localhost:5000/api/models", {
        name: modelName,
        description,
        url: modelUrl,
      });
      alert("Model uploaded successfully!");
      setModelName("");
      setDescription("");
      setModelUrl("");
      setError(""); 
    } catch (err) {
      console.error("Upload failed:", err); // Logs error
      setError("Failed to upload model. Please try again.");
    }
  };

  return (
    <div className="bg-white shadow-md p-6 rounded-lg">
      <h2 className="font-semibold text-lg">Upload New Model</h2>

      {error && <p className="text-red-500 bg-red-100 p-2 mt-2 rounded">{error}</p>}

      <div className="mt-4">
        <label className="block text-gray-600">Model Name</label>
        <input
          type="text"
          value={modelName}
          onChange={(e) => setModelName(e.target.value)}
          className="border rounded-md px-3 py-2 w-full mt-1"
          placeholder="Air Jordan 1"
        />
      </div>
      <div className="mt-4">
        <label className="block text-gray-600">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border rounded-md px-3 py-2 w-full mt-1"
          placeholder="Describe the shoe model..."
        />
      </div>
      <div className="mt-4">
        <label className="block text-gray-600">Model URL (GLB/GLTF)</label>
        <input
          type="text"
          value={modelUrl}
          onChange={(e) => setModelUrl(e.target.value)}
          className="border rounded-md px-3 py-2 w-full mt-1"
          placeholder="https://example.com/model.glb"
        />
      </div>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded-md mt-4 w-full"
        onClick={handleUpload}
      >
        ⬆ Upload Model
      </button>
    </div>
  );
};

export default UploadModelForm;
