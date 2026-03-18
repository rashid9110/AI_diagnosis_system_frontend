

import { useNavigate } from "react-router-dom";
import { LogIn, User } from "lucide-react";
import Layout from "../Layout/Layout";


function Home() {
  const navigate = useNavigate();

  return (
    <Layout>
    <div className="min-h-screen bg-gray-50">
 
      {/* Hero Section */}
      <section className="min-h-screen bg-white flex items-center justify-center">
  <div className="max-w-4xl mx-auto px-6 text-center">

    <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900">
      AI Driven Healthcare System
    </h1>

    <p className="mt-4 text-xl text-indigo-600 font-semibold">
      Automated X-Ray Image Analysis & Intelligent Report Generation
    </p>

    <p className="mt-6 text-lg text-gray-600">
      Our advanced AI-powered system analyzes chest X-ray images with high accuracy,
      detects abnormalities, and automatically generates structured medical reports
      to assist healthcare professionals in faster and more reliable diagnosis.
    </p>

    <div className="mt-8 flex justify-center gap-4">
      <button
        onClick={() => navigate("/upload")}
        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg shadow-md transition"
      >
        Get Started
      </button>

      <button
        onClick={() => navigate("/about")}
        className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg transition"
      >
        Learn More
      </button>
    </div>

    <p className="mt-4 text-sm text-gray-500">
      Secure • Fast • AI-Assisted Diagnosis
    </p>

  </div>
</section>


      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            System Capabilities
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-blue-600">
                AI Disease Detection
              </h3>
              <p className="mt-4 text-gray-600">
                Detects pneumonia, tuberculosis, and other lung abnormalities
                with high accuracy.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-blue-600">
                Automated Report Generation
              </h3>
              <p className="mt-4 text-gray-600">
                Generates structured medical reports instantly,
                reducing manual workload.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-blue-600">
                Secure & Scalable
              </h3>
              <p className="mt-4 text-gray-600">
                Designed with data security and hospital-scale deployment
                in mind.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="bg-blue-50 py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">

          <h2 className="text-3xl font-bold text-gray-900 mb-12">
            How It Works
          </h2>

          <div className="grid md:grid-cols-4 gap-8">

            <div>
              <div className="text-blue-600 text-4xl font-bold">1</div>
              <p className="mt-2 font-medium">Upload X-Ray</p>
            </div>

            <div>
              <div className="text-blue-600 text-4xl font-bold">2</div>
              <p className="mt-2 font-medium">AI Image Processing</p>
            </div>

            <div>
              <div className="text-blue-600 text-4xl font-bold">3</div>
              <p className="mt-2 font-medium">Disease Detection</p>
            </div>

            <div>
              <div className="text-blue-600 text-4xl font-bold">4</div>
              <p className="mt-2 font-medium">Report Generated</p>
            </div>

          </div>
        </div>
      </section>

    </div>
    </Layout>
  );
}

export default Home;
