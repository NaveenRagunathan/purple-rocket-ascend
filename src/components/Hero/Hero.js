import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";
import { styled } from "@mui/material/styles";
import { Box, Typography, Button } from "@mui/material";

// Styled components using MUI
const HeroContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  minHeight: "100vh",
  overflow: "hidden",
  background: "linear-gradient(to bottom right, #0A0A18, #12121E, #1A1A2E)",
}));

const ContentContainer = styled(Box)(({ theme }) => ({
  container: true,
  position: "relative",
  margin: "0 auto",
  padding: "12px 16px",
  [theme.breakpoints.up("md")]: {
    padding: "80px 16px",
  },
  zIndex: 2,
}));

const Grid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "64px",
  alignItems: "center",
  minHeight: "80vh",
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "1fr 1fr",
  },
}));

const ContentSection = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "32px",
}));

const Heading = styled(Typography)(({ theme }) => ({
  fontSize: "2.5rem",
  fontWeight: "bold",
  color: "white",
  lineHeight: "1.2",
  letterSpacing: "-0.5px",
  [theme.breakpoints.up("md")]: {
    fontSize: "3rem",
  },
  [theme.breakpoints.up("lg")]: {
    fontSize: "3.5rem",
  },
}));

const Description = styled(Typography)(({ theme }) => ({
  fontSize: "1.25rem",
  color: "#e4e4e7",
  lineHeight: "1.5",
}));

const HighlightText = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  color: "#c4b5fd",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: "16px 32px",
  borderRadius: "9999px",
  background: "linear-gradient(to right, #9333ea, #a855f7)",
  color: "white",
  fontSize: "1.125rem",
  fontWeight: "500",
  position: "relative",
  overflow: "hidden",
  transition: "transform 0.3s",
  "&:hover": {
    transform: "scale(1.05)",
    background: "linear-gradient(to right, #8b5cf6, #a855f7)",
  },
  "&:active": {
    transform: "scale(0.95)",
  },
}));

const ButtonContent = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
}));

const VideoContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  zIndex: 2,
  borderRadius: "16px",
  overflow: "hidden",
  boxShadow: "0 0 40px rgba(138,79,255,0.3)",
  border: "1px solid rgba(138,79,255,0.2)",
}));

const VideoAspectRatio = styled(Box)(({ theme }) => ({
  position: "relative",
  paddingTop: "56.25%", // 16:9 aspect ratio
}));

const VideoIframe = styled("iframe")(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  border: "none",
}));

const VideoThumbnail = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundSize: "cover",
  backgroundPosition: "center",
  cursor: "pointer",
}));

const VideoOverlay = styled(motion.div)(({ theme }) => ({
  position: "absolute",
  inset: 0,
  backgroundColor: "rgba(0, 0, 0, 0.4)",
  backdropFilter: "blur(2px)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
}));

const PlayButton = styled(motion.div)(({ theme }) => ({
  width: "80px",
  height: "80px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
  background: "rgba(138, 79, 255, 0.8)",
  boxShadow: "0 0 30px rgba(138, 79, 255, 0.6)",
}));

const CornerElement = styled(Box)(({ theme, corner }) => {
  const positions = {
    topLeft: { top: 0, left: 0, borderTop: "2px solid", borderLeft: "2px solid", borderTopLeftRadius: "16px" },
    topRight: { top: 0, right: 0, borderTop: "2px solid", borderRight: "2px solid", borderTopRightRadius: "16px" },
    bottomLeft: { bottom: 0, left: 0, borderBottom: "2px solid", borderLeft: "2px solid", borderBottomLeftRadius: "16px" },
    bottomRight: { bottom: 0, right: 0, borderBottom: "2px solid", borderRight: "2px solid", borderBottomRightRadius: "16px" },
  };

  return {
    position: "absolute",
    width: "48px",
    height: "48px",
    borderColor: "rgba(138, 79, 255, 0.6)",
    ...positions[corner],
  };
});

const GlowEffect = styled(Box)(({ theme }) => ({
  position: "absolute",
  zIndex: -1,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  height: "100%",
  background: "rgba(138, 79, 255, 0.1)",
  borderRadius: "50%",
  filter: "blur(100px)",
}));

const ScrollIndicator = styled(motion.div)(({ theme }) => ({
  position: "absolute",
  bottom: "40px",
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 10,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const ScrollContainer = styled(Box)(({ theme }) => ({
  width: "40px",
  height: "56px",
  border: "2px solid rgba(255, 255, 255, 0.3)",
  borderRadius: "9999px",
  display: "flex",
  justifyContent: "center",
  paddingTop: "8px",
}));

const ScrollDot = styled(motion.div)(({ theme }) => ({
  width: "8px",
  height: "8px",
  backgroundColor: "white",
  borderRadius: "50%",
}));

const ScrollText = styled(Typography)(({ theme }) => ({
  marginTop: "8px",
  color: "rgba(255, 255, 255, 0.5)",
  fontSize: "0.75rem",
  fontWeight: "500",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
}));

const Background = styled(Box)(({ theme }) => ({
  position: "absolute",
  inset: 0,
  overflow: "hidden",
  zIndex: 1,
}));

const Gradient = styled(Box)(({ theme }) => ({
  position: "absolute",
  inset: 0,
  background: "radial-gradient(circle at center, rgba(138, 79, 255, 0.05), transparent)",
  opacity: 0.8,
  zIndex: 1,
}));

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
      React.createElement(motion.div, {
        key: i,
        style: {
          position: 'absolute',
          width: size,
          height: size,
          borderRadius: '50%',
          backgroundColor: 'white',
          left: `${x}%`,
          top: `${y}%`,
          opacity,
        },
        animate: {
          opacity: [opacity, opacity * 1.5, opacity],
          scale: [1, 1.2, 1],
        },
        transition: {
          duration,
          repeat: Infinity,
          delay,
        }
      })
    );
  }

  return React.createElement(Box, { 
    sx: { position: 'absolute', width: '100%', height: '100%', zIndex: 0 } 
  }, stars);
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

  return React.createElement(
    Box, 
    { sx: { position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 1 } },
    React.createElement('canvas', { 
      ref: canvasRef, 
      style: { position: 'absolute', inset: 0, width: '100%', height: '100%' } 
    }),
    React.createElement(Box, { 
      sx: { position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.4), transparent)' } 
    })
  );
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
        React.createElement(motion.div, {
          key: i,
          style: {
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
          },
          animate: {
            y: [0, 100 + Math.random() * 50],
            opacity: [0.8, 0]
          },
          transition: {
            duration,
            repeat: Infinity,
            delay
          }
        })
      );
    }
    
    return React.createElement(React.Fragment, null, particles);
  };

  return React.createElement(motion.div, {
    style: { 
      position: 'absolute',
      y: rocketY,
      rotate: rotation,
      zIndex: 5,
      width: '100%',
      height: '100%',
    },
    onHoverStart: () => setIsHovered(true),
    onHoverEnd: () => setIsHovered(false),
    whileHover: { scale: 1.05 },
    initial: { opacity: 0, y: 100 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, delay: 0.5 }
  }, React.createElement(
    Box, 
    { sx: { position: "relative", width: "100%", height: "100%" } },
    
    // 3D Rocket with CSS transforms for depth
    React.createElement(
      Box, 
      { 
        sx: { 
          position: "absolute", 
          top: "25%", 
          left: "25%", 
          width: "50%", 
          height: "50%",
          transform: "preserve-3d",
          perspective: "1000px"
        } 
      },
      // Rocket glow effect
      React.createElement(Box, { 
        sx: { 
          position: "absolute", 
          width: "100%", 
          height: "100%", 
          borderRadius: "50%",
          background: "radial-gradient(ellipse at center, rgba(138, 79, 255, 0.4) 0%, transparent 70%)",
          filter: "blur(20px)",
          transform: "translateZ(-20px) scale(1.5)"
        } 
      }),
      
      // Rocket body
      React.createElement(Box, {
        sx: {
          position: "absolute",
          width: "75%",
          height: "75%",
          left: "12.5%",
          background: "linear-gradient(135deg, #9b87f5 0%, #A375FF 100%)",
          borderRadius: "50% 50% 15% 15% / 60% 60% 15% 15%",
          boxShadow: "0 0 30px rgba(138, 79, 255, 0.5), inset 0 10px 20px rgba(255, 255, 255, 0.4), inset 0 -5px 15px rgba(0, 0, 0, 0.3)",
          transform: "translateZ(10px)"
        }
      }),
      
      // Rocket tip with 3D effect
      React.createElement(Box, {
        sx: {
          position: "absolute",
          width: "50%",
          height: "33%",
          left: "25%",
          top: "-10%",
          background: "linear-gradient(135deg, #7340D1 0%, #8A4FFF 100%)",
          borderRadius: "50% 50% 0 0 / 80% 80% 0 0",
          boxShadow: "inset 0 5px 10px rgba(255, 255, 255, 0.4), inset 0 -2px 5px rgba(0, 0, 0, 0.2)",
          transform: "translateZ(15px)"
        }
      }),
      
      // Window with 3D glass effect
      React.createElement(Box, {
        sx: {
          position: "absolute",
          width: "33%",
          height: "20%",
          left: "33.3%",
          top: "25%",
          background: "radial-gradient(ellipse at center, rgba(210, 235, 255, 0.9) 0%, rgba(120, 190, 255, 0.9) 100%)",
          borderRadius: "50%",
          boxShadow: "inset 0 0 8px rgba(255, 255, 255, 0.8), 0 0 15px rgba(173, 216, 230, 0.6)",
          transform: "translateZ(20px)"
        }
      },
      // Window reflection
      React.createElement(Box, {
        sx: {
          position: "absolute",
          width: "50%",
          height: "33%",
          top: "20%",
          left: "25%",
          background: "rgba(255, 255, 255, 0.6)",
          borderRadius: "50%",
          transform: "rotate(-30deg)"
        }
      })
      ),
      
      // Left fin with 3D effect
      React.createElement(Box, {
        sx: {
          position: "absolute",
          width: "20%",
          height: "33%",
          left: "-5%",
          bottom: "20%",
          background: "linear-gradient(135deg, #6030B1 0%, #7340D1 100%)",
          borderRadius: "50% 50% 0 50% / 50% 50% 0 50%",
          boxShadow: "inset 0 5px 10px rgba(255, 255, 255, 0.2), inset 0 -2px 5px rgba(0, 0, 0, 0.3), -5px 5px 15px rgba(0, 0, 0, 0.2)",
          transform: "translateZ(5px) rotate(-20deg)"
        }
      }),
      
      // Right fin with 3D effect
      React.createElement(Box, {
        sx: {
          position: "absolute",
          width: "20%",
          height: "33%",
          right: "-5%",
          bottom: "20%",
          background: "linear-gradient(135deg, #6030B1 0%, #7340D1 100%)",
          borderRadius: "50% 50% 50% 0 / 50% 50% 50% 0",
          boxShadow: "inset 0 5px 10px rgba(255, 255, 255, 0.2), inset 0 -2px 5px rgba(0, 0, 0, 0.3), 5px 5px 15px rgba(0, 0, 0, 0.2)",
          transform: "translateZ(5px) rotate(20deg)"
        }
      }),
      
      // Bottom exhaust
      React.createElement(Box, {
        sx: {
          position: "absolute",
          width: "40%",
          height: "16%",
          left: "30%",
          bottom: "0",
          background: "linear-gradient(to bottom, #444, #222)",
          borderRadius: "0 0 40% 40% / 0 0 100% 100%",
          boxShadow: "inset 0 -5px 10px rgba(255, 165, 0, 0.5)",
          transform: "translateZ(5px)"
        }
      }),
      
      // Metal details - rivets around the body
      [...Array(8)].map((_, i) =>
        React.createElement(Box, {
          key: i,
          sx: {
            position: "absolute",
            width: "4px",
            height: "4px",
            left: "50%",
            top: `${30 + i * 6}%`,
            background: "#d0d0d0",
            borderRadius: "50%",
            transform: `translateX(-50%) translateZ(15px) rotate(${i * 45}deg)`,
            boxShadow: "0 0 2px rgba(255, 255, 255, 0.8)"
          }
        })
      ),
      
      // Holographic details
      React.createElement(Box, {
        sx: {
          position: "absolute",
          width: "100%",
          height: "100%",
          opacity: 0.3,
          background: "linear-gradient(135deg, transparent, rgba(255, 255, 255, 0.1), transparent)",
          animation: "shimmer 3s infinite linear",
          transform: "translateZ(12px)"
        }
      })
    ),
    
    // Rocket exhaust animation
    React.createElement(
      Box, 
      { 
        sx: { 
          position: "absolute", 
          bottom: "25%", 
          left: "50%", 
          transform: "translateX(-50%)",
          width: "100%", 
          height: "32px", 
          overflow: "visible", 
          display: "flex", 
          justifyContent: "center" 
        }
      },
      React.createElement(RocketExhaust, { active: isHovered || scrollY > 50 })
    ),
    
    // Style tag for keyframes
    React.createElement('style', null, `
      @keyframes shimmer {
        0% { background-position: -100% 0; }
        100% { background-position: 200% 0; }
      }
    `)
  ));
};

// Main HeroSection component
const Hero = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [showYouTubeVideo, setShowYouTubeVideo] = useState(false);
  const videoRef = useRef(null);

  const toggleVideo = () => {
    setShowYouTubeVideo(true);
    setIsVideoPlaying(true);
  };

  // Inline GradientText component functionality
  const GradientText = ({ text, underlined }) => {
    return React.createElement(
      Box, 
      { component: "span", sx: { position: "relative" } },
      React.createElement(
        Box,
        {
          component: "span",
          sx: {
            backgroundImage: "linear-gradient(to right, #9b87f5, #A375FF)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent"
          }
        },
        text
      ),
      underlined && React.createElement(
        Box,
        {
          component: "span",
          sx: {
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "4px",
            backgroundImage: "linear-gradient(to right, #9b87f5, #A375FF)",
            borderRadius: "4px"
          }
        }
      )
    );
  };

  return React.createElement(
    HeroContainer,
    null,
    // 3D Space Background
    React.createElement(SpaceBg),
    React.createElement(Gradient),
    React.createElement(
      ContentContainer,
      null,
      React.createElement(
        Grid,
        null,
        // Content Section
        React.createElement(
          ContentSection,
          null,
          React.createElement(
            motion.div,
            {
              initial: { opacity: 0, y: 30 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.7 },
              style: { display: "flex", flexDirection: "column", gap: "24px" }
            },
            React.createElement(
              Heading,
              { variant: "h1" },
              "Finally your Startup can ",
              React.createElement(GradientText, { text: "blast off!", underlined: true })
            ),
            React.createElement(
              Description,
              null,
              "Stand out, get Traction, hit PMF, go viral, make Money, secure funding and ",
              React.createElement(
                HighlightText,
                { component: "span" },
                "scale scale scale."
              )
            ),
            React.createElement(
              Typography,
              { variant: "h5", sx: { fontWeight: 600, color: "white" } },
              "The World needs to feel your impact.",
              React.createElement("br"),
              "Get the Growth you have always desired."
            )
          ),
          React.createElement(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.4, duration: 0.7 }
            },
            React.createElement(
              "div",
              null,
              React.createElement(
                StyledButton,
                {
                  onClick: toggleVideo,
                  component: motion.button,
                  whileHover: { scale: 1.05 },
                  whileTap: { scale: 0.95 }
                },
                "Watch Demo Video ",
                React.createElement(Play, { size: 20 })
              )
            )
          )
        ),
        // Visual Section with Rocket
        React.createElement(
          Box,
          { sx: { position: "relative", height: "100%", minHeight: "400px" } },
          React.createElement(Rocket3D),
          showYouTubeVideo ? React.createElement(
            VideoContainer,
            null,
            React.createElement(
              VideoAspectRatio,
              null,
              React.createElement(
                VideoIframe,
                {
                  src: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
                  title: "YouTube video",
                  allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
                  allowFullScreen: true
                }
              )
            )
          ) : React.createElement(
            VideoContainer,
            { onClick: toggleVideo },
            React.createElement(
              VideoAspectRatio,
              null,
              React.createElement(VideoThumbnail, {
                sx: {
                  backgroundImage: "url(https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg)"
                }
              }),
              React.createElement(
                VideoOverlay,
                null,
                React.createElement(
                  PlayButton,
                  {
                    whileHover: { scale: 1.1 },
                    whileTap: { scale: 0.9 }
                  },
                  React.createElement(Play, { size: 36, color: "white" })
                )
              ),
              // Corner decorative elements
              React.createElement(CornerElement, { corner: "topLeft" }),
              React.createElement(CornerElement, { corner: "topRight" }),
              React.createElement(CornerElement, { corner: "bottomLeft" }),
              React.createElement(CornerElement, { corner: "bottomRight" })
            ),
            React.createElement(GlowEffect)
          )
        )
      ),
      // Scroll indicator
      React.createElement(
        ScrollIndicator,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { delay: 1.5, duration: 0.5 }
        },
        React.createElement(
          ScrollContainer,
          null,
          React.createElement(ScrollDot, {
            animate: {
              y: [0, 16, 0]
            },
            transition: {
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }
          })
        ),
        React.createElement(
          ScrollText,
          null,
          "Scroll"
        )
      )
    )
  );
};

export default Hero;
