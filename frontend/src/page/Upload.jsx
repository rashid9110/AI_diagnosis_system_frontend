

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../Layout/Layout";
import { analyzeXray } from "../Redux/slices/modelSlice";

function Upload() {
  console.log("Rendering Upload component");
  const [file, setFile] = useState(null);
  const [patientName, setPatientName] = useState("");

  const dispatch = useDispatch();
  const { loading, result } = useSelector((state) => state.aiModel);
  
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please upload an X-ray image.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file); // ✅ must match backend
    formData.append("patientName", patientName);

    dispatch(analyzeXray(formData));
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 shadow rounded w-full max-w-lg">

          <h2 className="text-2xl font-bold text-center">
            Upload X-Ray Image
          </h2>

          <form onSubmit={handleSubmit} className="mt-6">

            {/* Patient Name */}
            <input
              type="text"
              placeholder="Enter Patient Name"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            />

            {/* File Upload */}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full"
            />

            {file && (
              <p className="mt-2 text-green-600">
                {file.name}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded"
            >
              {loading ? "Analyzing..." : "Analyze X-Ray"}
            </button>

          </form>

          {/* RESULT */}
          {result && (
            <div className="mt-6 p-4 bg-gray-100 rounded">

              <p><b>Prediction:</b> {result.prediction}</p>
              <p><b>Confidence:</b> {result.confidence}</p>

              {/* Original Image */}
              {result.imageUrl && (
                <img
                  src={result.imageUrl}
                  alt="X-ray"
                  className="mt-3 rounded"
                />
              )}

              {/* Heatmap */}
              {result.heatmapUrl && (
                <img
                  src={result.heatmapUrl}
                  alt="heatmap"
                  className="mt-3 rounded"
                />
              )}

            </div>
          )}

        </div>
      </div>
    </Layout>
  );
}

export default Upload;