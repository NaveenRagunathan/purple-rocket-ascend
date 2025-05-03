
import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";

const SpaceBg: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Generate stars with depth
  const createStars = () => {
    const stars = [];
    for (let i = 0; i < 150; i++) {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const size = Math.random() * 2 + 1;
      const opacity = Math.random() * 0.7 + 0.3;
      const duration = Math.random() * 20 + 10;
      const delay = Math.random() * 5;

      stars.push(
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: size,
            height: size,
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
    return stars;
  };

  // WebGL nebula effect
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
    function initShaderProgram(gl: WebGLRenderingContext, vsSource: string, fsSource: string) {
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

    function loadShader(gl: WebGLRenderingContext, type: number, source: string) {
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
      
      {/* Star field */}
      <div className="absolute inset-0">{createStars()}</div>
      
      {/* Dark overlay gradient for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent"></div>
    </div>
  );
};

export default SpaceBg;
