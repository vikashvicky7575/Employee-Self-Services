import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./auth/pages/Login/Login";
import MainLayout from "./Shared/layouts/MainLayout";
import { employeeRoutes } from "./routes/EmployeeRoute.jsx";
import { HrRoutes } from "./routes/HrRoute.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer position="top-right" />
      <BrowserRouter>
        <Routes>
          {/* Login Module */}
          <Route path="/" element={<Login />} />

          {/* Employee Panel */}
          <Route path="/employee/*" element={<MainLayout role="employee" />}>
            {employeeRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Route>

          {/* Hr Panel */}
          <Route path="/hr/*" element={<MainLayout role="hr" />}>
            {HrRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
