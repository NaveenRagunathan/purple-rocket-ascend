
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

// Main HeroSection component
const Hero = () => {
  const [showYouTubeVideo, setShowYouTubeVideo] = useState(false);

  const toggleVideo = () => {
    setShowYouTubeVideo(true);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0A0A18] via-[#12121E] to-[#1A1A2E]">
      {/* Space background effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(138,79,255,0.05),transparent)] opacity-80 z-10"></div>
      
      <div className="container relative mx-auto px-4 md:px-6 py-12 md:py-20 z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center min-h-[80vh]">
          
          {/* Content Section */}
          <div className="flex flex-col gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="flex flex-col gap-6"
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
                Finally your Startup can{" "}
                <span className="relative">
                  <span className="bg-gradient-to-r from-[#9b87f5] to-[#A375FF] bg-clip-text text-transparent">
                    blast off!
                  </span>
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#9b87f5] to-[#A375FF] rounded-full"></span>
                </span>
              </h1>

              <p className="text-xl text-[#e4e4e7] leading-relaxed">
                Stand out, get Traction, hit PMF, go viral, make Money, secure funding and{" "}
                <span className="font-bold text-[#c4b5fd]">
                  scale scale scale.
                </span>
              </p>

              <h5 className="text-xl font-semibold text-white">
                The World needs to feel your impact.
                <br />
                Get the Growth you have always desired.
              </h5>
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
                className="flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-[#9333ea] to-[#a855f7] text-white text-lg font-medium relative overflow-hidden transition-transform hover:from-[#8b5cf6] hover:to-[#a855f7]"
              >
                Watch Demo Video <Play className="ml-2" size={20} />
              </motion.button>
            </motion.div>
          </div>
          
          {/* Visual Section */}
          <div className="relative h-full min-h-[400px]">
            {/* Simple Rocket Illustration */}
            {!showYouTubeVideo && (
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="relative w-64 h-64">
                  {/* Rocket glow */}
                  <div className="absolute inset-0 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(138,79,255,0.4)_0%,transparent_70%)] blur-xl transform scale-150"></div>
                  
                  {/* Rocket body */}
                  <div className="absolute w-3/4 h-3/4 left-[12.5%] bg-gradient-to-br from-[#9b87f5] to-[#A375FF] rounded-t-full shadow-lg transform-gpu"></div>
                  
                  {/* Rocket window */}
                  <div className="absolute w-1/3 h-1/5 left-1/3 top-1/4 bg-[radial-gradient(ellipse_at_center,rgba(210,235,255,0.9)_0%,rgba(120,190,255,0.9)_100%)] rounded-full shadow-inner"></div>
                  
                  {/* Rocket fins */}
                  <div className="absolute w-1/5 h-1/3 left-0 bottom-1/5 bg-gradient-to-br from-[#6030B1] to-[#7340D1] rounded-full"></div>
                  <div className="absolute w-1/5 h-1/3 right-0 bottom-1/5 bg-gradient-to-br from-[#6030B1] to-[#7340D1] rounded-full"></div>
                </div>
              </motion.div>
            )}

            {/* Video section */}
            <div className="relative z-20 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(138,79,255,0.3)] border border-[rgba(138,79,255,0.2)]">
              {showYouTubeVideo ? (
                <div className="relative pt-[56.25%]">
                  <iframe 
                    className="absolute top-0 left-0 w-full h-full border-none"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                    title="YouTube video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div 
                  className="relative pt-[56.25%] cursor-pointer"
                  onClick={toggleVideo}
                >
                  <div 
                    className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: "url(https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg)" }}
                  ></div>
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex justify-center items-center">
                    <motion.div 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-20 h-20 flex items-center justify-center rounded-full bg-[rgba(138,79,255,0.8)] shadow-[0_0_30px_rgba(138,79,255,0.6)]"
                    >
                      <Play size={36} color="white" />
                    </motion.div>
                  </div>
                  
                  {/* Corner elements */}
                  <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-[rgba(138,79,255,0.6)] rounded-tl-2xl"></div>
                  <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-[rgba(138,79,255,0.6)] rounded-tr-2xl"></div>
                  <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-[rgba(138,79,255,0.6)] rounded-bl-2xl"></div>
                  <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-[rgba(138,79,255,0.6)] rounded-br-2xl"></div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <div className="w-10 h-14 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <motion.div 
              className="w-2 h-2 bg-white rounded-full"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <span className="mt-2 text-white/50 text-xs font-medium uppercase tracking-widest">Scroll</span>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
