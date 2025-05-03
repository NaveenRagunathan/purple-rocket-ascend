
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

const Hero = () => {
  const [showYouTubeVideo, setShowYouTubeVideo] = useState(false);

  const toggleVideo = () => {
    setShowYouTubeVideo(true);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Space background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A18] via-[#12121E] to-[#1A1A2E]"></div>
      
      {/* Purple glow effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(138,79,255,0.05),transparent)] opacity-80"></div>
      
      <div className="container relative mx-auto px-4 md:px-6 py-12 md:py-20 z-10">
        <div className="flex flex-col md:flex-row items-center md:justify-between gap-12 pt-24">
          
          {/* Content Section */}
          <div className="flex flex-col gap-8 max-w-xl">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-6">
                Finally your Startup can{" "}
                <span className="relative">
                  <span className="bg-gradient-to-r from-[#9b87f5] to-[#A375FF] bg-clip-text text-transparent">
                    blast off!
                  </span>
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#9b87f5] to-[#A375FF] rounded-full"></span>
                </span>
              </h1>

              <p className="text-xl text-[#e4e4e7] leading-relaxed mb-6">
                Stand out, get Traction, hit PMF, go viral, make Money, secure funding and{" "}
                <span className="font-bold text-[#c4b5fd]">
                  scale scale scale.
                </span>
              </p>

              <h5 className="text-xl font-semibold text-white mb-10">
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
                className="flex items-center gap-2 px-8 py-4 rounded-full bg-purple-600 hover:bg-purple-700 text-white text-lg font-medium"
              >
                <Play size={20} className="mr-2" />
                Watch the video
              </motion.button>
              <p className="text-sm text-gray-400 mt-2">
                Watch the video below to find out if this is for you.
              </p>
            </motion.div>
          </div>
          
          {/* Video/Rocket Section */}
          <div className="relative w-full md:w-1/2 lg:w-2/5">
            {showYouTubeVideo ? (
              <div className="relative rounded-xl overflow-hidden shadow-2xl">
                <div className="aspect-w-16 aspect-h-9">
                  <iframe 
                    className="absolute top-0 left-0 w-full h-full border-none"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                    title="YouTube video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            ) : (
              <div className="relative rounded-xl overflow-hidden shadow-2xl cursor-pointer" onClick={toggleVideo}>
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg" 
                    alt="Video thumbnail" 
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-purple-600 bg-opacity-90 flex items-center justify-center shadow-lg">
                      <Play size={36} color="white" />
                    </div>
                  </div>
                </div>
                
                {/* Video player UI elements */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-white overflow-hidden mr-3">
                      <img 
                        src="public/lovable-uploads/311dde78-bc6e-4fa4-b4fb-2cdc9d23e829.png" 
                        alt="Channel logo" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-white font-medium">Retro Roast | Plip Plip</span>
                  </div>
                  <div className="ml-auto flex items-center space-x-4">
                    <div className="h-1 w-32 bg-gray-600 rounded-full overflow-hidden">
                      <div className="h-full w-1/4 bg-red-600"></div>
                    </div>
                    <span className="text-white text-xs">0:13 / 13:21</span>
                  </div>
                </div>
              </div>
            )}
            
            {/* Rocket illustration */}
            <div className="absolute -right-20 -bottom-10 w-64 h-64 transform -rotate-12">
              <img 
                src="public/lovable-uploads/d77c7ba9-0bd0-4b60-96f0-19a85022a119.png" 
                alt="Rocket" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
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
          <span className="mt-2 text-white/50 text-xs font-medium uppercase tracking-widest">SCROLL</span>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
