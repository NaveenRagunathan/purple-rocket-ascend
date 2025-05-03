
import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";

// Particle effect for rocket exhaust
const RocketExhaust: React.FC<{ active: boolean }> = ({ active }) => {
  const particles = [];
  const particleCount = active ? 40 : 0;
  
  for (let i = 0; i < particleCount; i++) {
    const size = Math.random() * 10 + 5;
    const xOffset = (Math.random() - 0.5) * 40;
    const duration = Math.random() * 1 + 0.5;
    const delay = Math.random() * 0.2;
    
    particles.push(
      <motion.div
        key={i}
        style={{
          position: 'absolute',
          width: size,
          height: size,
          borderRadius: '50%',
          background: `radial-gradient(circle at center, ${
            Math.random() > 0.7 ? '#ffcc00' : '#ff6600'
          }, transparent)`,
          left: '50%',
          transform: 'translateX(-50%)',
          marginLeft: xOffset,
          bottom: -10,
          zIndex: -1
        }}
        animate={{
          y: [0, 100 + Math.random() * 50],
          opacity: [0.8, 0]
        }}
        transition={{
          duration,
          repeat: Infinity,
          delay
        }}
      />
    );
  }
  
  return <>{particles}</>;
};

const Rocket3D: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  
  // Animation values
  const baseY = useMotionValue(0);
  const rocketY = useTransform(baseY, [0, 100], [0, -50]);
  const rotation = useMotionValue(0);
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      baseY.set(Math.min(window.scrollY / 5, 100));
      
      // Add slight rotation based on scroll
      const newRotation = Math.sin(window.scrollY / 500) * 5;
      rotation.set(newRotation);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [baseY, rotation]);

  return (
    <motion.div
      style={{ 
        position: 'absolute',
        y: rocketY,
        rotate: rotation,
        zIndex: 5,
        width: '100%',
        height: '100%',
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      <div className="relative w-full h-full">
        {/* 3D Rocket with CSS transforms for depth */}
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 transform-gpu preserve-3d">
          {/* Rocket glow effect */}
          <div 
            className="absolute w-full h-full rounded-full"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(138, 79, 255, 0.4) 0%, transparent 70%)',
              filter: 'blur(20px)',
              transform: 'translateZ(-20px) scale(1.5)',
            }} 
          />
          
          {/* Rocket body */}
          <div
            className="absolute w-3/4 h-3/4"
            style={{
              left: '12.5%',
              background: 'linear-gradient(135deg, #9b87f5 0%, #A375FF 100%)',
              borderRadius: '50% 50% 15% 15% / 60% 60% 15% 15%',
              boxShadow: '0 0 30px rgba(138, 79, 255, 0.5), inset 0 10px 20px rgba(255, 255, 255, 0.4), inset 0 -5px 15px rgba(0, 0, 0, 0.3)',
              transform: 'translateZ(10px)',
            }}
          />
          
          {/* Rocket tip with 3D effect */}
          <div
            className="absolute w-1/2 h-1/3"
            style={{
              left: '25%',
              top: '-10%',
              background: 'linear-gradient(135deg, #7340D1 0%, #8A4FFF 100%)',
              borderRadius: '50% 50% 0 0 / 80% 80% 0 0',
              boxShadow: 'inset 0 5px 10px rgba(255, 255, 255, 0.4), inset 0 -2px 5px rgba(0, 0, 0, 0.2)',
              transform: 'translateZ(15px)',
            }}
          />
          
          {/* Window with 3D glass effect */}
          <div
            className="absolute w-1/3 h-1/5"
            style={{
              left: '33.3%',
              top: '25%',
              background: 'radial-gradient(ellipse at center, rgba(210, 235, 255, 0.9) 0%, rgba(120, 190, 255, 0.9) 100%)',
              borderRadius: '50%',
              boxShadow: 'inset 0 0 8px rgba(255, 255, 255, 0.8), 0 0 15px rgba(173, 216, 230, 0.6)',
              transform: 'translateZ(20px)',
            }}
          >
            {/* Window reflection */}
            <div
              className="absolute w-1/2 h-1/3 rounded-full bg-white/60"
              style={{
                top: '20%',
                left: '25%',
                transform: 'rotate(-30deg)',
              }}
            />
          </div>
          
          {/* Left fin with 3D effect */}
          <div
            className="absolute w-1/5 h-1/3"
            style={{
              left: '-5%',
              bottom: '20%',
              background: 'linear-gradient(135deg, #6030B1 0%, #7340D1 100%)',
              borderRadius: '50% 50% 0 50% / 50% 50% 0 50%',
              boxShadow: 'inset 0 5px 10px rgba(255, 255, 255, 0.2), inset 0 -2px 5px rgba(0, 0, 0, 0.3), -5px 5px 15px rgba(0, 0, 0, 0.2)',
              transform: 'translateZ(5px) rotate(-20deg)',
            }}
          />
          
          {/* Right fin with 3D effect */}
          <div
            className="absolute w-1/5 h-1/3"
            style={{
              right: '-5%',
              bottom: '20%',
              background: 'linear-gradient(135deg, #6030B1 0%, #7340D1 100%)',
              borderRadius: '50% 50% 50% 0 / 50% 50% 50% 0',
              boxShadow: 'inset 0 5px 10px rgba(255, 255, 255, 0.2), inset 0 -2px 5px rgba(0, 0, 0, 0.3), 5px 5px 15px rgba(0, 0, 0, 0.2)',
              transform: 'translateZ(5px) rotate(20deg)',
            }}
          />
          
          {/* Bottom exhaust */}
          <div
            className="absolute w-2/5 h-1/6 bg-gradient-to-b from-gray-700 to-gray-900"
            style={{
              left: '30%',
              bottom: '0',
              borderRadius: '0 0 40% 40% / 0 0 100% 100%',
              boxShadow: 'inset 0 -5px 10px rgba(255, 165, 0, 0.5)',
              transform: 'translateZ(5px)',
            }}
          />

          {/* Metal details - rivets around the body */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-gray-300"
              style={{
                left: '50%',
                top: `${30 + i * 6}%`,
                transform: `translateX(-50%) translateZ(15px) rotate(${i * 45}deg)`,
                boxShadow: '0 0 2px rgba(255, 255, 255, 0.8)',
              }}
            />
          ))}
          
          {/* Holographic details - slight shimmer effect */}
          <div
            className="absolute w-full h-full opacity-30"
            style={{
              background: 'linear-gradient(135deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
              animation: 'shimmer 3s infinite linear',
              transform: 'translateZ(12px)',
            }}
          />
        </div>
        
        {/* Rocket exhaust animation */}
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-full h-8 overflow-visible flex justify-center">
          <RocketExhaust active={isHovered || scrollY > 50} />
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -100% 0; }
          100% { background-position: 200% 0; }
        }
        
        .preserve-3d {
          transform-style: preserve-3d;
          perspective: 1000px;
        }
      `}</style>
    </motion.div>
  );
};

export default Rocket3D;
