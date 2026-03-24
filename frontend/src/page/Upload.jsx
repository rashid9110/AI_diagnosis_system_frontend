import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../Layout/Layout";
import { analyzeXray } from "../Redux/slices/modelSlice";

function Upload() {
  console.log("Rendering Upload component");
  const [file, setFile] = useState(null);
  const [patientId, setPatientId] = useState("");

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
    formData.append("patientId", patientId);

    dispatch(analyzeXray(formData));
  };

  const handleReupload = () => {
    setFile(null);
    setPatientId("");
    // Reset the file input
    const fileInput = document.getElementById("fileUpload");
    if (fileInput) {
      fileInput.value = "";
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 shadow rounded w-full max-w-lg">
          <h2 className="text-2xl font-bold text-center">Upload X-Ray Image</h2>

          <form onSubmit={handleSubmit} className="mt-6">
            <div className="mt-6">
              {/* Patient Name */}
              <input
                type="text"
                placeholder="Enter Patient id"
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
                className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />

              {/* Upload Box */}
              <label
                htmlFor="fileUpload"
                className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-purple-400 rounded-xl cursor-pointer 
    bg-gradient-to-r from-purple-50 to-blue-50 hover:from-purple-100 hover:to-blue-100 transition"
              >
                <p className="text-gray-600">
                  {file ? file.name : "Click or drag X-ray here 🩺"}
                </p>
                {/* <span className="text-sm text-gray-400 mt-1">
                  PNG, JPG (Max 5MB)
                </span> */}
              </label>

              <input
                id="fileUpload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />

              {/* Buttons */}
              <div className="mt-5 flex gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 
      text-white py-3 rounded-xl shadow-lg transition duration-300"
                >
                  {loading ? "Analyzing..." : "Analyze X-Ray"}
                </button>

                {/* <button
                  type="button"
                  onClick={handleReupload}
                  className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-xl shadow-lg transition duration-300"
                >
                  Reupload
                </button> */}
              </div>
            </div>
          </form>

          {/* RESULT */}
          {result && (
            <div className="mt-6 p-4 bg-gray-100 rounded">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Analysis Result</h3>
                <button
                  onClick={handleReupload}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition duration-300"
                >
                  Next Analysis
                </button>
              </div>

              <p>
                <b>Patient Name</b> {result.patientInfo.name}
              </p>
              <p>
              <b>Age:</b> {result.patientInfo.age}
              </p>
              <p>
                <b>Gender:</b> {result.patientInfo.gender}
              </p>
              <p>
                <b>Prediction:</b> {result.prediction}
              </p>
              <p>
                <b>Confidence:</b> {result.confidence}
              </p>
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
