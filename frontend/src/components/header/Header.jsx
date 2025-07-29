import React, { useState, useContext } from "react";
import "./Header.css";
import { motion as Motion } from "framer-motion";
import { FaWater, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

// Import des images en sombre
import iconBoatB from "../../assets/iconNavbar/icon-boat-b.png";
import iconFishB from "../../assets/iconNavbar/icon-fish-b.png";
import iconPlongB from "../../assets/iconNavbar/icon-plong-b.png";
import iconBubbleW from "../../assets/iconNavbar/icon-bubble-w.png";

// Import des images en clair
import iconBoatW from "../../assets/iconNavbar/icon-boat-w.png";
import iconFishW from "../../assets/iconNavbar/icon-fish-w.png";
import iconPlongW from "../../assets/iconNavbar/icon-plong-w.png";
import iconBubbleB from "../../assets/iconNavbar/icon-bubble-b.png";

// Import des éléments pour le DarkMode
import { useTheme } from "../../context/themeContext";

// Déconnexion
import { AuthContext } from "../../context/AuthContext";

// Liste des éléments du menu (Forum remplacé par Déconnexion)
const items = [
  {
    label: "Spots",
    link: "/spot",
    iconLight: iconBoatB,
    iconDark: iconBoatW,
  },
  {
    label: "Espèces",
    link: "/categories",
    iconLight: iconFishB,
    iconDark: iconFishW,
  },
  {
    label: "Déconnexion",
    action: "logout",
    iconLight: iconBubbleB,
    iconDark: iconBubbleW,
  },
  {
    label: "Preventions",
    link: "/preventions",
    iconLight: iconPlongB,
    iconDark: iconPlongW,
  },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { darkMode } = useTheme();

  // On recupere la fonction logout dans AuthContext (donc pas besoin de token dans ce cas)
  const { user, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const toggleMenu = () => setOpen(!open);

  const handleLogout = async () => {
  try {
    await logout();
    navigate("/register");
  } catch (error) {
    console.error("Erreur de déconnexion :", error);
  }
};


  return (
    <>
      {/* Menu burger à droite */}
      <div className={`line-container ${darkMode ? "dark" : ""}`}>
        <div className="menu-icon" onClick={toggleMenu}>
          {open ? <FaTimes size={28} /> : <FaWater size={28} />}
        </div>

        <div className="line" />

        {open &&
          items.map((item, index) => (
            <Motion.div
              key={index}
              className="line-item"
              style={{ top: `${index * 130 + 40}px`, position: "absolute" }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.2, duration: 0.6 }}
              whileHover={{ scale: 1.1, rotate: [0, 1, -1, 0] }}
            >
              {item.action === "logout" ? (
                <button onClick={handleLogout} className="logout-button">
                  <img
                    src={darkMode ? item.iconDark : item.iconLight}
                    alt={item.label}
                    className="hook-img"
                  />
                  <div className="label">{item.label}</div>
                </button>
              ) : (
                <Link to={item.link}>
                  <img
                    src={darkMode ? item.iconDark : item.iconLight}
                    alt={item.label}
                    className="hook-img"
                  />
                  <div className="label">{item.label}</div>
                </Link>
              )}
            </Motion.div>
          ))}
      </div>
    </>
  );
}
