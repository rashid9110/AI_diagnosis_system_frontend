import { useState } from "react";
import Layout from "../Layout/Layout";

function Upload() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please upload an X-ray image.");
      return;
    }

    // Later you will send this file to backend
    console.log("Uploaded File:", file);
    alert("X-Ray Uploaded Successfully!");
  };

  return (
    <Layout>
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">

      <div className="bg-white shadow-lg rounded-xl p-10 w-full max-w-xl">

        <h2 className="text-3xl font-bold text-gray-900 text-center">
          Upload X-Ray Image
        </h2>

        <p className="text-gray-600 text-center mt-2">
          Upload a chest X-ray image for AI-based analysis and report generation.
        </p>

        <form onSubmit={handleSubmit} className="mt-8">

          <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-600"
            />
          </div>

          {file && (
            <p className="mt-4 text-green-600 text-sm">
              Selected File: {file.name}
            </p>
          )}

          <button
            type="submit"
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg shadow-md transition"
          >
            Analyze X-Ray
          </button>

        </form>

      </div>

    </div>
    </Layout>
  );
}

export default Upload;
