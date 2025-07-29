import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider.jsx";
import { ThemeProvider } from "./context/themeContext.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";

import Header from "./components/header/Header";

import Register from "./components/pages/Register/Register.jsx";
import Login from "./components/pages/Login/Login.jsx";
import Dashboard from "./components/pages/Dashboard.jsx";

import Home from "./pages/home/Home.jsx";
import Spot from "./pages/spot/Spot.jsx";
import Categories from "./pages/categories/Categories.jsx";
import Especes from "./pages/especes/Especes.jsx";
import Preventions from "./pages/preventions/Preventions.jsx";

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <div className="App">
          <Header />
          <Routes>
            {/* Page d'accueil publique : Register */}
            <Route path="/" element={<Register />} />

            {/* Pages publiques */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            {/* Page privée Home */}
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />

            {/* Routes protégées */}
            {/* <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            /> */}
            <Route
              path="/spot"
              element={
                <PrivateRoute>
                  <Spot />
                </PrivateRoute>
              }
            />
            <Route
              path="/categories"
              element={
                <PrivateRoute>
                  <Categories />
                </PrivateRoute>
              }
            />
            <Route
              path="/especes"
              element={
                <PrivateRoute>
                  <Especes />
                </PrivateRoute>
              }
            />
            <Route
              path="/preventions"
              element={
                <PrivateRoute>
                  <Preventions />
                </PrivateRoute>
              }
            />

            
            <Route path="*" element={<Register />} />
          </Routes>
        </div>
      </ThemeProvider>
    </AuthProvider>
  );
}
