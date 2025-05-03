
import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlayCircle } from "lucide-react";
import SpaceBg from "./SpaceBg";
import Rocket3D from "./Rocket3D";
import GradientText from "./GradientText";

const HeroSection = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0A0A18] via-[#12121E] to-[#1A1A2E]">
      {/* 3D Space Background */}
      <SpaceBg />

      <div className="absolute inset-0 bg-gradient-radial from-purple-500/5 to-transparent opacity-80 z-[1]" />

      <div className="container relative mx-auto px-4 py-12 md:py-20 z-[2]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center min-h-[80vh]">
          {/* Content Section */}
          <div className="flex flex-col space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="space-y-6"
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
                Finally your Startup can{" "}
                <GradientText text="blast off!" underlined />
              </h1>

              <p className="text-xl text-gray-200 leading-relaxed">
                Stand out, get Traction, hit PMF, go viral, make Money, secure funding and{" "}
                <span className="font-bold text-purple-400">
                  scale scale scale.
                </span>
              </p>

              <p className="text-xl font-semibold text-white">
                The World needs to feel your impact.
                <br />
                Get the Growth you have always desired.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
            >
              <motion.button
                onClick={toggleVideo}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-purple-700 to-purple-500 text-white font-medium text-lg relative overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative flex items-center">
                  <PlayCircle className="mr-3" size={28} />
                  <span>Watch the video</span>
                </span>
                <span className="absolute inset-0 rounded-full border border-white/20"></span>
              </motion.button>
              <p className="mt-4 text-gray-400 text-sm">
                Watch the video below to find out if this is for you.
              </p>
            </motion.div>
          </div>

          {/* 3D Rocket & Video Section */}
          <div className="relative">
            {/* 3D Rocket */}
            <div className="absolute -top-20 -right-12 md:-right-28 z-10 h-64 w-64 md:h-96 md:w-96">
              <Rocket3D />
            </div>

            {/* Video Container */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="relative z-[2] rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(138,79,255,0.3)] border border-purple-500/20"
            >
              <div className="aspect-w-16 aspect-h-9">
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  poster="/api/placeholder/800/450"
                  onClick={toggleVideo}
                >
                  <source src="your-video-url.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>

              {/* Video Play Overlay */}
              <AnimatePresence>
                {!isVideoPlaying && (
                  <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center cursor-pointer"
                    onClick={toggleVideo}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-20 h-20 flex items-center justify-center rounded-full bg-purple-600/80 shadow-[0_0_30px_rgba(138,79,255,0.6)]"
                    >
                      <PlayCircle size={36} className="text-white" />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Decorative Corner Elements */}
              <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-purple-500/60 rounded-tl-2xl"></div>
              <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-purple-500/60 rounded-tr-2xl"></div>
              <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-purple-500/60 rounded-bl-2xl"></div>
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-purple-500/60 rounded-br-2xl"></div>
            </motion.div>

            {/* Glow Effects */}
            <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-purple-600/10 blur-[100px] rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      >
        <div className="w-10 h-14 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-2 h-2 bg-white rounded-full"
          ></motion.div>
        </div>
        <span className="mt-2 text-white/50 text-xs font-medium uppercase tracking-widest">Scroll</span>
      </motion.div>
    </div>
  );
};

export default HeroSection;
