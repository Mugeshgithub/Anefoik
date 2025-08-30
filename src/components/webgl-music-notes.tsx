'use client';

import { useEffect, useRef } from 'react';

export default function WebGLMusicNotes() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    console.log('Starting WebGL Music Notes...');

    // Set canvas size
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      console.log('Canvas size:', rect.width, 'x', rect.height);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create notes data
    const notes: Array<{
      x: number;
      y: number;
      speed: number;
      size: number;
      rotation: number;
      color: string;
    }> = [];
    
    for (let i = 0; i < 15; i++) {
      notes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: 1 + Math.random() * 2,
        size: 20 + Math.random() * 30,
        rotation: Math.random() * Math.PI * 2,
        color: Math.random() > 0.5 ? '#a7c7e7' : '#e1c5c0'
      });
    }

    console.log('Created', notes.length, 'notes');

    // Mouse position
    let mouseX = 0;
    let mouseY = 0;

    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    });

    // Draw a musical note
    const drawNote = (x: number, y: number, size: number, rotation: number, color: string) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.fillStyle = color;
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;

      // Note head (circle)
      ctx.beginPath();
      ctx.arc(0, -size * 0.3, size * 0.15, 0, Math.PI * 2);
      ctx.fill();

      // Note stem
      ctx.fillRect(-size * 0.02, -size * 0.3, size * 0.04, size * 0.6);

      // Note flag
      ctx.beginPath();
      ctx.arc(size * 0.1, size * 0.3, size * 0.08, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    // Animation loop
    let animationId: number;

    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw notes
      notes.forEach((note) => {
        // Move note upward
        note.y -= note.speed;
        note.rotation += 0.02;

        // Wrap around when off screen
        if (note.y < -note.size) {
          note.y = canvas.height + note.size;
          note.x = Math.random() * canvas.width;
        }

        // Mouse interaction
        const dx = mouseX - note.x;
        const dy = mouseY - note.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          note.x += dx * 0.02;
          note.y += dy * 0.02;
        }

        // Draw the note
        drawNote(note.x, note.y, note.size, note.rotation, note.color);
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    console.log('Animation started');

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ 
        zIndex: 1, 
        background: 'rgba(255, 0, 0, 0.1)' // Temporary red background to see if canvas is working
      }}
    />
  );
}
