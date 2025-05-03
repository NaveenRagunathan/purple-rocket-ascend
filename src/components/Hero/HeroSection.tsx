
import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { PlayCircle } from "lucide-react";
import GradientText from "./GradientText";

// StarField component for creating an animated space background
const StarField = ({ count = 100 }) => {
  const stars = [];

  for (let i = 0; i < count; i++) {
    const size = Math.random() * 2 + 1;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;
    const opacity = Math.random() * 0.7 + 0.3;

    stars.push(
      <motion.div
        key={i}
        style={{
          position: 'absolute',
          width: size,
          height: size,
          borderRadius: '50%',
          backgroundColor: 'white',
          left: `${x}%`,
          top: `${y}%`,
          opacity,
        }}
        animate={{
          opacity: [opacity, opacity * 1.5, opacity],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration,
          repeat: Infinity,
          delay,
        }}
      />
    );
  }

  return <div className="absolute w-full h-full z-0">{stars}</div>;
};

// Particle effect for rocket exhaust
const RocketExhaust = ({ active }) => {
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

// 3D Rocket Component
const Rocket3D = () => {
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

      <style>{`
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

// Space background with WebGL nebula effect
const SpaceBg = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const gl = canvas.getContext("webgl", { alpha: true });
    if (!gl) return;

    // Vertex shader program
    const vsSource = `
      attribute vec4 aVertexPosition;
      attribute vec2 aTextureCoord;
      varying highp vec2 vTextureCoord;
      void main(void) {
        gl_Position = aVertexPosition;
        vTextureCoord = aTextureCoord;
      }
    `;

    // Fragment shader program for nebula effect
    const fsSource = `
      precision mediump float;
      varying highp vec2 vTextureCoord;
      uniform float uTime;
      
      // Noise function
      float noise(vec2 p) {
        return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
      }
      
      // Simplex-like noise
      float fbm(vec2 p) {
        float f = 0.0;
        float w = 0.5;
        for (int i = 0; i < 5; i++) {
          f += w * noise(p);
          p *= 2.0;
          w *= 0.5;
        }
        return f;
      }

      void main(void) {
        vec2 uv = vTextureCoord * 2.0 - 1.0;
        
        // Create nebula-like pattern
        float time = uTime * 0.05;
        vec2 moveDir = vec2(time * 0.1, time * 0.05);
        float d = fbm(uv + moveDir);
        
        // Purple nebula colors
        vec3 color1 = vec3(0.34, 0.15, 0.5); // Deep purple
        vec3 color2 = vec3(0.4, 0.2, 0.6);   // Medium purple
        vec3 color3 = vec3(0.65, 0.3, 1.0);  // Light purple
        
        // Mix colors based on noise
        vec3 color = mix(color1, color2, fbm(uv * 2.0 + vec2(time * -0.1, 0.0)));
        color = mix(color, color3, fbm(uv * 3.0 + vec2(0.0, time * 0.1)) * 0.6);
        
        // Fade out towards edges for vignette effect
        float vignetteAmount = 1.5;
        float vignette = 1.0 - pow(length(uv * 0.8), vignetteAmount);
        color *= vignette;
        
        // Add stars
        float stars = step(0.98, noise(uv * 500.0)) * vignette;
        color += vec3(stars * 0.5);
        
        // Apply opacity for subtle effect
        gl_FragColor = vec4(color, 0.3);
      }
    `;

    // Initialize shaders
    function initShaderProgram(gl, vsSource, fsSource) {
      const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
      const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

      const shaderProgram = gl.createProgram();
      if (!shaderProgram || !vertexShader || !fragmentShader) return null;
      
      gl.attachShader(shaderProgram, vertexShader);
      gl.attachShader(shaderProgram, fragmentShader);
      gl.linkProgram(shaderProgram);

      if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        console.error('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
        return null;
      }

      return shaderProgram;
    }

    function loadShader(gl, type, source) {
      const shader = gl.createShader(type);
      if (!shader) return null;
      
      gl.shaderSource(shader, source);
      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }

      return shader;
    }

    const shaderProgram = initShaderProgram(gl, vsSource, fsSource);
    if (!shaderProgram) return;

    const programInfo = {
      program: shaderProgram,
      attribLocations: {
        vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
        textureCoord: gl.getAttribLocation(shaderProgram, 'aTextureCoord'),
      },
      uniformLocations: {
        uTime: gl.getUniformLocation(shaderProgram, 'uTime'),
      },
    };

    // Create buffers
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = [
      // Full screen quad (two triangles)
      -1.0, -1.0,
       1.0, -1.0,
      -1.0,  1.0,
       1.0,  1.0,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    const textureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);
    const textureCoordinates = [
      0.0,  0.0,
      1.0,  0.0,
      0.0,  1.0,
      1.0,  1.0,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), gl.STATIC_DRAW);

    // Animation loop
    let startTime = Date.now();
    function render() {
      const currentTime = Date.now();
      const elapsedTime = (currentTime - startTime) / 1000; // seconds

      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
      gl.clearColor(0.0, 0.0, 0.0, 0.0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      // Use shader program
      gl.useProgram(programInfo.program);

      // Set time uniform
      gl.uniform1f(programInfo.uniformLocations.uTime, elapsedTime);

      // Set up position attribute
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.vertexAttribPointer(
        programInfo.attribLocations.vertexPosition,
        2, // 2 components per vertex
        gl.FLOAT,
        false,
        0,
        0
      );
      gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);

      // Set up texture coordinate attribute
      gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);
      gl.vertexAttribPointer(
        programInfo.attribLocations.textureCoord,
        2, // 2 components per vertex
        gl.FLOAT,
        false,
        0,
        0
      );
      gl.enableVertexAttribArray(programInfo.attribLocations.textureCoord);

      // Enable blending
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

      // Draw
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      requestAnimationFrame(render);
    }

    render();

    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden z-[1]">
      {/* WebGL nebula effect */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      
      {/* Dark overlay gradient for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent"></div>
    </div>
  );
};

// Main HeroSection component
const HeroSection = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef(null);

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
