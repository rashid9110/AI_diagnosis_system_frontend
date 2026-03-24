import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatients, resetPatientState } from "../Redux/slices/patientSlice";
import Layout from "../Layout/Layout";

function PatientReports() {
  const dispatch = useDispatch();
  const { patients, loading, error } = useSelector((state) => state.patient);

  useEffect(() => {
    dispatch(fetchPatients());
    return () => {
      dispatch(resetPatientState());
    };
  }, [dispatch]);

  const handleReload = () => {
    dispatch(fetchPatients());
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
        <div className="text-xl">Loading patients...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
        <div className="text-xl text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <Layout>
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex flex-wrap items-center justify-between mb-6">
        <h2 className="text-3xl font-bold">Patient Reports</h2>

        <button
          onClick={handleReload}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Refresh Patients
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {patients.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg p-5 hover:shadow-xl transition"
          >
            {/*  Patient Info */}
            <div className="mb-3">
              <h3 className="text-lg font-bold text-gray-800">
                {item.patientInfo.name}
              </h3>

              <p className="text-sm text-gray-500">
                ID: {item.patientId}
              </p>

              <p className="text-sm text-gray-500">
                Age: {item.patientInfo.age} | {item.patientInfo.gender}
              </p>
            </div>

            {/* 📊 Prediction */}
            <div className="mb-3">
              <p className="font-semibold">
                Prediction:{" "}
                <span
                  className={
                    item.prediction === "Pneumonia"
                      ? "text-red-600"
                      : "text-green-600"
                  }
                >
                  {item.prediction}
                </span>
              </p>

              <p className="text-sm text-gray-600">
                Confidence: {item.confidence}%
              </p>
            </div>

            {/* 🖼 Images */}
            <div className="grid grid-cols-2 gap-2 mt-3">
              <div>
                <p className="text-xs text-gray-500 text-center">X-ray</p>
                <img
                  src={item.imageUrl}
                  alt="xray"
                  className="rounded-lg border"
                />
              </div>

              <div>
                <p className="text-xs text-gray-500 text-center">Heatmap</p>
                <img
                  src={item.heatmapUrl}
                  alt="heatmap"
                  className="rounded-lg border"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </Layout>
  );
}

export default PatientReports;