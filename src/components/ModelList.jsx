import { useEffect, useState } from "react";
import axios from "axios";

const ModelList = () => {
  const [models, setModels] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/models")
      .then((response) => setModels(response.data))
      .catch(() => setError("Failed to load models. Please try again later."));
  }, []);

  return (
    <div className="bg-white shadow-md p-4 rounded-lg">
      <h2 className="font-semibold text-lg">Available Models</h2>
      {error && <p className="text-red-500">{error}</p>}
      {models.length === 0 ? (
        <p className="text-gray-500">No models found</p>
      ) : (
        <ul className="list-disc pl-4 mt-2">
          {models.map((model) => (
            <li key={model.id}>{model.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ModelList;
