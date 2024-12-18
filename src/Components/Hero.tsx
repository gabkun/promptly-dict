import React from "react";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const GradientWithParticles: React.FC = () => {
  const particleInit = async (engine: any) => {
    await loadFull(engine);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Animated Background Gradient */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full"
        animate={{
          background: [
            "radial-gradient(circle, #ff7eb3, #ff758c)",
            "radial-gradient(circle, #71b7e6, #8ed1fc)",
            "radial-gradient(circle, #ff9a8b, #ff6a88)",
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={{
          zIndex: 1,
        }}
      ></motion.div>

      {/* Particles */}
      <Particles
        init={particleInit}
        options={{
          fullScreen: false,
          background: { color: { value: "transparent" } },
          fpsLimit: 60,
          particles: {
            number: { value: 60, density: { enable: true, area: 800 } },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: {
              value: 0.5,
              random: true,
              anim: { enable: true, speed: 0.2, opacity_min: 0.1, sync: false },
            },
            size: {
              value: { min: 1, max: 3 },
              anim: { enable: true, speed: 1, size_min: 0.1, sync: false },
            },
            move: {
              enable: true,
              speed: 1,
              direction: "none",
              random: false,
              straight: false,
              outModes: { default: "out" },
            },
          },
          interactivity: {
            events: {
              onHover: { enable: true, mode: "repulse" },
              onClick: { enable: true, mode: "push" },
            },
            modes: {
              repulse: { distance: 100 },
              push: { quantity: 4 },
            },
          },
        }}
        style={{ position: "absolute", top: 0, left: 0, zIndex: 2 }}
      />
    </div>
  );
};

export default GradientWithParticles;