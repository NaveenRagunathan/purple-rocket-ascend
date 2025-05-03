
import React from "react";
import { motion } from "framer-motion";

interface GradientTextProps {
  text: string;
  underlined?: boolean;
  className?: string;
}

const GradientText: React.FC<GradientTextProps> = ({ text, underlined = false, className = "" }) => {
  return (
    <motion.span
      className={`relative inline-block ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <span
        className="relative"
        style={{
          background: "linear-gradient(90deg, #8A4FFF, #A375FF)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundSize: "200% 100%",
        }}
      >
        {text}
        {underlined && (
          <motion.span
            className="absolute bottom-0 left-0 w-full h-1.5 rounded-full"
            style={{
              background: "linear-gradient(90deg, #8A4FFF, #A375FF)",
              boxShadow: "0 5px 15px rgba(138, 79, 255, 0.5)",
            }}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.5, delay: 0.5 }}
          />
        )}
      </span>
    </motion.span>
  );
};

export default GradientText;
