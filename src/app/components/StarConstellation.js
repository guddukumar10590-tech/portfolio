'use client';

import { useEffect, useRef, useState } from 'react';

export default function StarConstellation() {
  const canvasRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  
  // Animation data refs (using refs instead of state for 60fps performance)
  const starsRef = useRef([]);
  const projectNodesRef = useRef([]);
  const animationFrameRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // CONFIGURATION
    const config = {
      starCount: 50, // Amount of background stars
      canvasWidthRatio: 0.4, // Width of canvas (40% of screen)
      nodeColor: 'rgba(100, 200, 255, 0.9)', // Blueish color for project nodes
      lineColor: 'rgba(255, 255, 255, 0.3)', // Color of the connecting lines
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth * config.canvasWidthRatio;
      canvas.height = window.innerHeight;
    };

    // 1. Initialize Random Background Stars
    const initBackgroundStars = () => {
      const stars = [];
      for (let i = 0; i < config.starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5 + 0.5,
          vx: (Math.random() - 0.5) * 0.1, // Slow movement X
          vy: (Math.random() - 0.5) * 0.1, // Slow movement Y
          opacity: Math.random() * 0.5 + 0.2,
          twinkleSpeed: Math.random() * 0.02 + 0.005,
          twinkleOffset: Math.random() * Math.PI * 2,
        });
      }
      starsRef.current = stars;
    };

    // 2. Scan for Project Images (The "Map")
    const scanProjectImages = () => {
      const projectsSection = document.getElementById('projects');
      if (!projectsSection) {
        setIsVisible(false);
        return;
      }

      // Check if we are currently looking at the projects section
      const sectionRect = projectsSection.getBoundingClientRect();
      const inView = sectionRect.top < window.innerHeight && sectionRect.bottom > 0;
      setIsVisible(inView);

      // 1. Find the specific images we marked earlier
      const images = projectsSection.querySelectorAll('.constellation-node');
      const nodes = [];

      images.forEach((img) => {
        const rect = img.getBoundingClientRect();
        
        // 2. Only map if the image is actually rendered
        if (rect.width > 0) {
          nodes.push({
            element: img,
            // Calculate the center point of the image relative to the viewport
            x: rect.left + (rect.width / 2),
            y: rect.top + (rect.height / 2),
            radius: 5,
            pulse: Math.random() * Math.PI
          });
        }
      });
      
      projectNodesRef.current = nodes;
    };

    // 3. Main Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // --- Draw Background Stars ---
      starsRef.current.forEach(star => {
        star.x += star.vx;
        star.y += star.vy;

        // Wrap around screen edges
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;

        // Twinkle effect
        const opacity = star.opacity + Math.sin(Date.now() * 0.003 + star.twinkleOffset) * 0.2;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, opacity)})`;
        ctx.fill();
      });

      // --- Draw Constellation Map (Project Nodes) ---
      if (isVisible && projectNodesRef.current.length > 0) {
        
        // A. Update positions and convert to canvas coordinates
        projectNodesRef.current.forEach(node => {
          const rect = node.element.getBoundingClientRect();
          const canvasRect = canvas.getBoundingClientRect();
          
          // Convert screen coordinates to canvas coordinates
          node.canvasX = rect.left + (rect.width / 2) - canvasRect.left;
          node.canvasY = rect.top + (rect.height / 2) - canvasRect.top;
        });

        // B. Draw Connecting Lines (Dashed)
        ctx.beginPath();
        ctx.strokeStyle = config.lineColor;
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 5]); // Dashed Line

        let firstNodeDrawn = false;
        
        projectNodesRef.current.forEach((node) => {
          // Only draw lines to nodes that are roughly on screen or just off screen
          if (node.canvasY > -100 && node.canvasY < canvas.height + 100) {
            if (!firstNodeDrawn) {
              ctx.moveTo(node.canvasX, node.canvasY);
              firstNodeDrawn = true;
            } else {
              ctx.lineTo(node.canvasX, node.canvasY);
            }
          }
        });
        ctx.stroke();
        ctx.setLineDash([]); // Reset line style

        // C. Draw The Nodes (Glowing Stars)
        projectNodesRef.current.forEach((node) => {
          // Only draw if visible
          if (node.canvasY > -50 && node.canvasY < canvas.height + 50) {
            // Pulse Animation
            node.pulse += 0.05;
            const glowSize = node.radius + Math.sin(node.pulse) * 2;

            // Outer Glow
            ctx.beginPath();
            ctx.arc(node.canvasX, node.canvasY, glowSize * 2, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(100, 200, 255, 0.15)';
            ctx.fill();

            // Inner Core
            ctx.beginPath();
            ctx.arc(node.canvasX, node.canvasY, node.radius, 0, Math.PI * 2);
            ctx.fillStyle = '#fff';
            ctx.fill();

            // Ring
            ctx.beginPath();
            ctx.arc(node.canvasX, node.canvasY, node.radius + 4, 0, Math.PI * 2);
            ctx.strokeStyle = config.nodeColor;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Setup
    resizeCanvas();
    initBackgroundStars();
    
    // Give the DOM a moment to render images before scanning
    setTimeout(scanProjectImages, 500);
    setTimeout(scanProjectImages, 2000); // Check again later in case images loaded slowly

    animate();

    // Event Listeners
    window.addEventListener('resize', () => {
      resizeCanvas();
      initBackgroundStars();
      scanProjectImages();
    });
    
    window.addEventListener('scroll', scanProjectImages);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', scanProjectImages);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isVisible]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: '40vw', // 40% of viewport width
        height: '100vh',
        pointerEvents: 'none', // Allows clicking through the canvas
        zIndex: 0, // Behind text, but check your container z-index
        opacity: isVisible ? 1 : 0, // Only show when near projects
        transition: 'opacity 0.8s ease-in-out',
      }}
    />
  );
}