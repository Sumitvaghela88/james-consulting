import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../Pages/home";
import Login from "../Pages/Loginpage";
import Register from "../Pages/Resgister";
import Dashboard from "../Pages/Dashboard";
import ProtectedRoute from "../Pages/ProtecteRoute";

function App() {
  return (
 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
   
  );
}

export default App;
