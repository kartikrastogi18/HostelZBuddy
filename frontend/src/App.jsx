import { Routes, Route } from "react-router-dom";
import Header from "./Component/HeaderComponent/Header";
import Login from "./Component/HeaderComponent/Login/Login";
import StudentDashboard from "./Component/Other/StudentDashboard/StudentDashboard";
import AdminDashboard from "./Component/Other/AdminDashboard/AdminDashboard";
import JNUHome from "./Component/HeaderComponent/JNUHome";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<JNUHome />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route path="/apply-rebate" element={<h1>Apply Rebate Page</h1>} />
        <Route path="/rebate-history" element={<h1>Rebate History Page</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/student-dashboard"  element={<StudentDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </>
  );
}

export default App;
