import { useEffect, useRef, useState } from "react";
import { useMotionValue, useAnimation, useTransform } from "framer-motion";
import { motion as Motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // <-- import useNavigate
import "./RollingGallery.css";

const RollingGallery = ({ autoplay = false, pauseOnHover = false }) => {
  const [images, setImages] = useState([]);
  const [isScreenSizeSm, setIsScreenSizeSm] = useState(window.innerWidth <= 640);

  const rotation = useMotionValue(0);
  const controls = useAnimation();
  const autoplayRef = useRef();

  const navigate = useNavigate(); // <-- initialize navigate

  // Charger les images depuis le backend, en filtrant celles qui ont categorieId
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get("http://localhost:3023/api/images");
        const formatted = res.data
          .filter(img => img.categorieId)  // garder uniquement celles avec categorieId défini
          .map((img) => ({
            src: img.url,
            title: img.categorieId.nom,
          }));
        setImages(formatted);
      } catch (error) {
        console.error("Erreur de chargement des images :", error);
      }
    };
    fetchImages();
  }, []);

  const faceCount = images.length;
  const cylinderWidth = isScreenSizeSm ? 1100 : 1800;
  const faceWidth = faceCount > 0 ? (cylinderWidth / faceCount) * 1.5 : 200;
  const radius = cylinderWidth / (2 * Math.PI);
  const dragFactor = 0.05;

  const handleDrag = (_, info) => {
    rotation.set(rotation.get() + info.offset.x * dragFactor);
  };

  const handleDragEnd = (_, info) => {
    controls.start({
      rotateY: rotation.get() + info.velocity.x * dragFactor,
      transition: { type: "spring", stiffness: 60, damping: 20, mass: 0.1, ease: "easeOut" },
    });
  };

  const transform = useTransform(rotation, (value) => {
    return `rotate3d(0, 1, 0, ${value}deg)`;
  });

  // Autoplay
  useEffect(() => {
    if (autoplay && faceCount > 0) {
      autoplayRef.current = setInterval(() => {
        controls.start({
          rotateY: rotation.get() - (360 / faceCount),
          transition: { duration: 2, ease: "linear" },
        });
        rotation.set(rotation.get() - (360 / faceCount));
      }, 2000);

      return () => clearInterval(autoplayRef.current);
    }
  }, [autoplay, rotation, controls, faceCount]);

  useEffect(() => {
    const handleResize = () => {
      setIsScreenSizeSm(window.innerWidth <= 640);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseEnter = () => {
    if (autoplay && pauseOnHover) {
      clearInterval(autoplayRef.current);
      controls.stop();
    }
  };

  const handleMouseLeave = () => {
    if (autoplay && pauseOnHover) {
      controls.start({
        rotateY: rotation.get() - (360 / faceCount),
        transition: { duration: 2, ease: "linear" },
      });
      rotation.set(rotation.get() - (360 / faceCount));

      autoplayRef.current = setInterval(() => {
        controls.start({
          rotateY: rotation.get() - (360 / faceCount),
          transition: { duration: 2, ease: "linear" },
        });
        rotation.set(rotation.get() - (360 / faceCount));
      }, 2000);
    }
  };

  // Gestion du clic sur une image
  const handleImageClick = (title) => {
    navigate("/especes", { state: { category: title } });
  };

  return (
    <div className="gallery-container">
      <div className="gallery-gradient gallery-gradient-left"></div>
      <div className="gallery-gradient gallery-gradient-right"></div>
      <div className="gallery-content">
        <Motion.div
          drag="x"
          className="gallery-track"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: transform,
            rotateY: rotation,
            width: cylinderWidth,
            transformStyle: "preserve-3d",
          }}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          animate={controls}
        >
          {images.map(({ src, title }, i) => (
            <div
              key={i}
              className="gallery-item"
              style={{
                width: `${faceWidth}px`,
                transform: `rotateY(${i * (360 / faceCount)}deg) translateZ(${radius}px)`,
                cursor: "pointer",
              }}
              onClick={() => handleImageClick(title)}
            >
              <img src={src} alt={title} className="gallery-img" />
              <div className="gallery-caption">{title}</div>
            </div>
          ))}
        </Motion.div>
      </div>
    </div>
  );
};

export default RollingGallery;
