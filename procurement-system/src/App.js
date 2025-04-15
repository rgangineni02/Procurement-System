import React from "react";
import { Routes, Route, NavLink, useLocation, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Orders from "./pages/Orders";
import Inventory from "./pages/Inventory";
import Suppliers from "./pages/Suppliers";
import Reports from "./pages/Reports";
import AddProduct from "./pages/AddProduct";
import "./App.css";

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("authToken");

  const showSidebar = isAuthenticated && !(location.pathname === "/" || location.pathname === "/signup");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("rememberMe");
    navigate("/"); // Redirect to login
  };

  return (
    <div className={`app-container ${showSidebar ? "authenticated" : ""}`}>
      {showSidebar && (
        <nav className="sidebar">
          <h2>Procurement System</h2>
          <ul>
            <li>
              <NavLink to="/orders" className={({ isActive }) => `sidebar-link ${isActive ? "active-link" : ""}`}>
                Orders
              </NavLink>
            </li>
            <li>
              <NavLink to="/inventory" className={({ isActive }) => `sidebar-link ${isActive ? "active-link" : ""}`}>
                Inventory
              </NavLink>
            </li>
            <li>
              <NavLink to="/suppliers" className={({ isActive }) => `sidebar-link ${isActive ? "active-link" : ""}`}>
                Suppliers
              </NavLink>
            </li>
            <li>
              <NavLink to="/reports" className={({ isActive }) => `sidebar-link ${isActive ? "active-link" : ""}`}>
                Reports
              </NavLink>
            </li>
            <li>
              <NavLink to="/add-product" className={({ isActive }) => `sidebar-link ${isActive ? "active-link" : ""}`}>
                Add Product
              </NavLink>
            </li>
          </ul>

          <div className="sidebar-content">
  

  <button className="logout-button" onClick={handleLogout}>
    Logout
  </button>
</div>

        </nav>
      )}

      <main className="content">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/add-product" element={<AddProduct />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
