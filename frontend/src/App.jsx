import { Routes, Route } from "react-router-dom";
import Header from "./Component/HeaderComponent/Header";
import Login from "./Component/HeaderComponent/Login/Login";
import Signup from "./Component/HeaderComponent/Signup/Signup";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/dashboard" element={<h1>Dashboard Page</h1>} />
        <Route path="/apply-rebate" element={<h1>Apply Rebate Page</h1>} />
        <Route path="/rebate-history" element={<h1>Rebate History Page</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
