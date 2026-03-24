import { Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import Upload from "./page/Upload";
import Login from "./page/Login";
import Signup from "./page/SignUp";
import AllPatient from "./page/AllPatient";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/patients" element={<AllPatient/>} />
    </Routes>
  );
}

export default App;
