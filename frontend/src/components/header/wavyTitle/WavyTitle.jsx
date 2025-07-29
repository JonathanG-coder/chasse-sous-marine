//LIen du code pour faire bouger le texte 
// https://examples.motion.dev/react/split-text-wavy
import React from "react";
import "./WavyTitle.css";
import { animate, stagger } from "motion";
import { splitText } from "motion-plus";
import { useEffect, useRef } from "react";

export default function WavyTitle() {
  const containerRef = useRef(null);

  useEffect(() => {
    document.fonts.ready.then(() => {
      if (!containerRef.current) return;

      const element = containerRef.current.querySelector(".wavy");
      if (!element) return;

      const { chars } = splitText(element);
      containerRef.current.style.visibility = "visible";

      const staggerDelay = 0.15;

      animate(
        chars,
        { y: [-5, 5] },
        {
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
          duration: 2,
          delay: stagger(staggerDelay, {
            startDelay: -staggerDelay * chars.length,
          }),
        }
      );
    });
  }, []);

  return (
    <div className="container" ref={containerRef}>
      <h1 className="titleHeader">
 <span className="wavy">
  chasse{' '}
  sous-
  marine.
</span>

</h1>

    </div>
  );
}
