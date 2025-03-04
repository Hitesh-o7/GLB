
import { useEffect } from "react";
import axios from "axios";
import UploadModelForm from "../components/UploadModelForm";
import ModelList from "../components/ModelList";

const Home = () => {
  useEffect(() => {
    const fetchModels = async () => {
      try {
        await axios.get("http://localhost:5000/api/models");
      } catch (err) {
        console.error("Failed to load models", err);
      }
    };

    fetchModels();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col">
      {/* Navbar */}
      <header className="flex justify-between items-center bg-white shadow-md px-6 py-4 rounded-lg">
        <h1 className="text-2xl font-bold flex items-center">🏷️ 3D Shoe Showcase</h1>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search shoes..."
            className="border rounded-md px-4 py-2"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md">Search</button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-6 mt-6">
        {/* Model Viewer Section */}
        <div className="flex-1 bg-white shadow-md p-6 rounded-lg text-gray-500 flex items-center justify-center">
          Select a model to view
        </div>

        {/* Sidebar */}
        <aside className="w-1/3 space-y-6">
          <ModelList />
          <UploadModelForm />
        </aside>
      </div>

      {/* Footer */}
      <footer className="text-center text-gray-500 mt-10 p-4">
        © 2025 3D Shoe Showcase. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
