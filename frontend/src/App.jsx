import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/students/StudentDashboard";
import ApplyClearance from "./pages/students/ApplyClearance";
import MyRequests from "./pages/students/MyRequests";
import DepartmentDashboard from "./pages/departments/DepartmentDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Home from "./pages/Home";
// function App(){
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/student" element={<StudentDashboard />} />
//         <Route path="/apply" element={<ApplyClearance />} />
//         <Route path="/requests" element={<MyRequests />} />
//         <Route path="/department" element={<DepartmentDashboard />} />
//         <Route path="/admin" element={<AdminDashboard />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }
function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/apply" element={<ApplyClearance />} />
        <Route path="/requests" element={<MyRequests />} />

        <Route path="/department" element={<DepartmentDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>

    </BrowserRouter>
  );
}
export default App;
