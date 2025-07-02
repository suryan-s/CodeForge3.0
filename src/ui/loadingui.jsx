import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

const LetterGlitch = ({
  glitchColors = ['#861a85', '#512f8d', '#9932cc', '#8a2be2', '#ba55d3', '#da70d6', '#dda0dd'],
  glitchSpeed = 50,
  centerVignette = true,
  outerVignette = true,
  smooth = true,
}) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const letters = useRef([]);
  const grid = useRef({ columns: 0, rows: 0 });
  const context = useRef(null);
  const lastGlitchTime = useRef(Date.now());

  const fontSize = 16;
  const charWidth = 10;
  const charHeight = 20;

  const lettersAndSymbols = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    '!', '@', '#', '$', '&', '*', '(', ')', '-', '_', '+', '=', '/',
    '[', ']', '{', '}', ';', ':', '<', '>', ',', '0', '1', '2', '3',
    '4', '5', '6', '7', '8', '9'
  ];

  const getRandomChar = () => {
    return lettersAndSymbols[Math.floor(Math.random() * lettersAndSymbols.length)];
  };

  const getRandomColor = () => {
    return glitchColors[Math.floor(Math.random() * glitchColors.length)];
  };

  const hexToRgb = (hex) => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => {
      return r + r + g + g + b + b;
    });

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const interpolateColor = (start, end, factor) => {
    const result = {
      r: Math.round(start.r + (end.r - start.r) * factor),
      g: Math.round(start.g + (end.g - start.g) * factor),
      b: Math.round(start.b + (end.b - start.b) * factor),
    };
    return `rgb(${result.r}, ${result.g}, ${result.b})`;
  };

  const calculateGrid = (width, height) => {
    const columns = Math.ceil(width / charWidth);
    const rows = Math.ceil(height / charHeight);
    return { columns, rows };
  };

  const initializeLetters = (columns, rows) => {
    grid.current = { columns, rows };
    const totalLetters = columns * rows;
    letters.current = Array.from({ length: totalLetters }, () => ({
      char: getRandomChar(),
      color: getRandomColor(),
      targetColor: getRandomColor(),
      colorProgress: 1,
    }));
  };
  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const parent = canvas.parentElement;
    if (!parent) return;

    try {
      const dpr = window.devicePixelRatio || 1;
      const rect = parent.getBoundingClientRect();

      // Ensure we have valid dimensions
      if (rect.width === 0 || rect.height === 0) return;

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      if (context.current) {
        context.current.setTransform(dpr, 0, 0, dpr, 0, 0);
      }

      const { columns, rows } = calculateGrid(rect.width, rect.height);
      initializeLetters(columns, rows);

      // Only draw if we have valid letters
      if (letters.current.length > 0) {
        drawLetters();
      }
    } catch (error) {
      console.warn('Canvas resize failed:', error);
    }
  };
  const drawLetters = () => {
    if (!context.current || !canvasRef.current || letters.current.length === 0) return;
    
    const ctx = context.current;
    const canvas = canvasRef.current;
    
    // Check if canvas is mounted and has valid dimensions
    if (!canvas.parentElement) return;
    
    const rect = canvas.getBoundingClientRect();
    if (!rect || rect.width === 0 || rect.height === 0) return;
    
    const { width, height } = rect;
    ctx.clearRect(0, 0, width, height);
    ctx.font = `${fontSize}px monospace`;
    ctx.textBaseline = 'top';

    letters.current.forEach((letter, index) => {
      const x = (index % grid.current.columns) * charWidth;
      const y = Math.floor(index / grid.current.columns) * charHeight;
      ctx.fillStyle = letter.color;
      ctx.fillText(letter.char, x, y);
    });
  };

  const updateLetters = () => {
    if (!letters.current || letters.current.length === 0) return;

    const updateCount = Math.max(1, Math.floor(letters.current.length * 0.05));

    for (let i = 0; i < updateCount; i++) {
      const index = Math.floor(Math.random() * letters.current.length);
      if (!letters.current[index]) continue;

      letters.current[index].char = getRandomChar();
      letters.current[index].targetColor = getRandomColor();

      if (!smooth) {
        letters.current[index].color = letters.current[index].targetColor;
        letters.current[index].colorProgress = 1;
      } else {
        letters.current[index].colorProgress = 0;
      }
    }
  };
  const handleSmoothTransitions = () => {
    if (!letters.current || letters.current.length === 0) return;
    
    let needsRedraw = false;
    letters.current.forEach((letter) => {
      if (letter.colorProgress < 1) {
        letter.colorProgress += 0.05;
        if (letter.colorProgress > 1) letter.colorProgress = 1;

        const startRgb = hexToRgb(letter.color);
        const endRgb = hexToRgb(letter.targetColor);
        if (startRgb && endRgb) {
          letter.color = interpolateColor(startRgb, endRgb, letter.colorProgress);
          needsRedraw = true;
        }
      }
    });

    if (needsRedraw) {
      drawLetters();
    }
  };
  const animate = () => {
    if (!canvasRef.current || !context.current) {
      animationRef.current = requestAnimationFrame(animate);
      return;
    }

    const now = Date.now();
    if (now - lastGlitchTime.current >= glitchSpeed) {
      updateLetters();
      drawLetters();
      lastGlitchTime.current = now;
    }

    if (smooth) {
      handleSmoothTransitions();
    }

    animationRef.current = requestAnimationFrame(animate);
  };
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    context.current = canvas.getContext('2d');
    
    // Use setTimeout to ensure canvas is fully mounted
    const initTimer = setTimeout(() => {
      resizeCanvas();
      animate();
    }, 100);

    let resizeTimeout;

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
        resizeCanvas();
        animate();
      }, 100);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(initTimer);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [glitchSpeed, smooth]);  return (
    <div className="relative w-full h-full bg-black overflow-hidden">
      <canvas ref={canvasRef} className="block w-full h-full opacity-90" />
      {outerVignette && (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none bg-[radial-gradient(circle,_rgba(0,0,0,0)_40%,_rgba(0,0,0,0.92)_100%)]" />
      )}
      {centerVignette && (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none bg-[radial-gradient(circle,_rgba(0,0,0,0.85)_0%,_rgba(0,0,0,0)_40%)]" />
      )}
    </div>
  );
};

const LoadingUI = ({ duration = 5000, onComplete, isTransitioning = false }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsLoading(false);
            onComplete && onComplete();
          }, 500);
          return 100;
        }
        return prev + (100 / (duration / 100));
      });
    }, 100);

    return () => clearInterval(interval);
  }, [duration, onComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: isTransitioning ? 1.2 : 1.1,
            filter: isTransitioning ? "blur(40px)" : "blur(10px)",
            rotateY: isTransitioning ? 15 : 0
          }}
          transition={{ 
            duration: isTransitioning ? 1.8 : 1.5,
            ease: isTransitioning ? [0.25, 0.46, 0.45, 0.94] : [0.25, 0.46, 0.45, 0.94]
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center"
        >
          {/* Glitch Background with dissolve effect */}
          <motion.div 
            className="absolute inset-0"
            exit={{
              opacity: 0,
              scale: 1.3,
              filter: "blur(50px) saturate(150%)"
            }}
            transition={{
              duration: isTransitioning ? 2 : 1.5,
              ease: "easeInOut"
            }}
          >
            <LetterGlitch />
          </motion.div>

          {/* Loading Content with morph transition */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{
              opacity: 0,
              y: isTransitioning ? -100 : -50,
              scale: isTransitioning ? 0.8 : 0.9,
              rotateX: isTransitioning ? 45 : 0
            }}
            transition={{ 
              delay: 0.5, 
              duration: 0.8,
              exit: {
                duration: isTransitioning ? 1.2 : 0.8,
                ease: "easeInOut"
              }
            }}
            className="relative z-10 flex flex-col items-center space-y-6 md:space-y-8 px-4"
          >
            {/* Main Title with morphing effect */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{
                opacity: isTransitioning ? 0.3 : 0,
                scale: isTransitioning ? 1.5 : 0.8,
                y: isTransitioning ? -200 : -50,
                filter: isTransitioning ? "blur(30px)" : "blur(10px)"
              }}
              transition={{ 
                delay: 1, 
                duration: 0.8,
                exit: {
                  duration: isTransitioning ? 1.5 : 0.8,
                  ease: [0.4, 0, 0.2, 1]
                }
              }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-purple-300 text-center"
              style={{
                textShadow: '0 0 20px rgba(134, 26, 133, 0.8), 0 0 40px rgba(81, 47, 141, 0.6)',
                fontFamily: 'monospace'
              }}
            >
              CODEFORGE
            </motion.h1>

            {/* Subtitle with particle dissolve */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{
                opacity: 0,
                y: isTransitioning ? -80 : -30,
                filter: isTransitioning ? "blur(20px)" : "blur(5px)"
              }}
              transition={{ 
                delay: 1.5, 
                duration: 0.6,
                exit: {
                  duration: isTransitioning ? 1 : 0.6
                }
              }}
              className="text-lg md:text-xl text-purple-200 text-center font-mono"
            >
              Initializing System...
            </motion.p>

            {/* Progress Bar with transform to navigation elements */}
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "100%" }}
              exit={{
                opacity: 0,
                width: isTransitioning ? "200%" : "120%",
                height: isTransitioning ? 50 : 8,
                y: isTransitioning ? -60 : -20,
                borderRadius: isTransitioning ? "25px" : "9999px"
              }}
              transition={{ 
                delay: 2, 
                duration: 0.8,
                exit: {
                  duration: isTransitioning ? 1.3 : 0.8,
                  ease: "easeInOut"
                }
              }}
              className="relative h-2 bg-purple-900/50 rounded-full overflow-hidden backdrop-blur-sm w-full max-w-xs md:max-w-sm"
            >
              <motion.div
                className="h-full bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 rounded-full"
                style={{
                  width: `${progress}%`,
                  boxShadow: '0 0 20px rgba(134, 26, 133, 0.8)'
                }}
                exit={{
                  background: isTransitioning ? 
                    "linear-gradient(90deg, rgba(134,26,133,0.2), rgba(81,47,141,0.2), rgba(153,50,204,0.2))" :
                    "linear-gradient(90deg, rgba(134,26,133,0.5), rgba(81,47,141,0.5))"
                }}
                transition={{ 
                  duration: 0.3,
                  exit: { duration: isTransitioning ? 1 : 0.5 }
                }}
              />
            </motion.div>

            {/* Progress Text with number morph */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{
                opacity: 0,
                scale: isTransitioning ? 2 : 0.5,
                filter: isTransitioning ? "blur(15px)" : "blur(5px)"
              }}
              transition={{ 
                delay: 2.5, 
                duration: 0.6,
                exit: {
                  duration: isTransitioning ? 1.1 : 0.6
                }
              }}
              className="text-purple-300 font-mono text-base md:text-lg"
            >
              {Math.round(progress)}%
            </motion.span>

            {/* Animated Loading Dots with burst effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{
                opacity: 0,
                scale: isTransitioning ? 3 : 0.5,
                rotate: isTransitioning ? 360 : 0
              }}
              transition={{ 
                delay: 3, 
                duration: 0.6,
                exit: {
                  duration: isTransitioning ? 1.4 : 0.6,
                  ease: "easeOut"
                }
              }}
              className="flex space-x-2"
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 md:w-3 md:h-3 bg-purple-400 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  exit={{
                    scale: isTransitioning ? [1, 3, 0] : [1, 0.5, 0],
                    opacity: [0.5, 1, 0]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: isLoading ? Infinity : 0,
                    delay: i * 0.2,
                    exit: {
                      duration: isTransitioning ? 1.2 : 0.8,
                      delay: i * 0.1
                    }
                  }}
                  style={{
                    boxShadow: '0 0 10px rgba(134, 26, 133, 0.8)'
                  }}
                />
              ))}
            </motion.div>
          </motion.div>

          {/* Particle Overlay with burst effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{
              opacity: 0,
              scale: isTransitioning ? 2 : 1.2,
              rotate: isTransitioning ? 45 : 0
            }}
            transition={{ 
              delay: 1, 
              duration: 2,
              exit: {
                duration: isTransitioning ? 1.6 : 1.2
              }
            }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                radial-gradient(2px 2px at 20px 30px, rgba(134, 26, 133, 0.8), transparent),
                radial-gradient(2px 2px at 40px 70px, rgba(81, 47, 141, 0.6), transparent),
                radial-gradient(1px 1px at 90px 40px, rgba(153, 50, 204, 0.8), transparent),
                radial-gradient(1px 1px at 130px 80px, rgba(138, 43, 226, 0.6), transparent),
                radial-gradient(2px 2px at 160px 30px, rgba(186, 85, 211, 0.8), transparent)
              `,
              backgroundRepeat: 'repeat',
              backgroundSize: '200px 100px',
              animation: 'particle-float 20s linear infinite'
            }}
          />

          {/* Transition overlay for smooth blend */}
          {isTransitioning && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-purple-800/30 to-black/40 pointer-events-none"
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingUI;