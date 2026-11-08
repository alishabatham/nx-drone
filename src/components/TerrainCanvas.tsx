import React, { useEffect, useRef, useState } from 'react';
import { RefreshCw } from 'lucide-react';

interface TerrainCanvasProps {
  className?: string;
  activeLayerName?: string;
}

export const TerrainCanvas: React.FC<TerrainCanvasProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [renderMode, setRenderMode] = useState<'wireframe' | 'contours' | 'pointcloud'>('wireframe');
  const [isRotating, setIsRotating] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let angle = 0.35;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    const cols = 36;
    const rows = 28;
    const cellSpacing = 16;
    let time = 0;

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      // Clean background
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, 0, width, height);

      // Subtle architectural grid lines
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.12)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 36) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 36) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      if (isRotating) {
        angle += 0.003;
      }
      time += 0.015;

      const centerX = width * 0.5;
      const centerY = height * 0.56;
      const pitch = 0.85;

      const points: { x: number; y: number; z: number; projX: number; projY: number }[][] = [];

      for (let r = 0; r < rows; r++) {
        points[r] = [];
        for (let c = 0; c < cols; c++) {
          const x0 = (c - cols / 2) * cellSpacing;
          const y0 = (r - rows / 2) * cellSpacing;

          const distFromCenter = Math.sqrt(x0 * x0 + y0 * y0) * 0.012;
          const hill1 = Math.sin(c * 0.22 + time * 0.5) * Math.cos(r * 0.25) * 32;
          const hill2 = Math.cos(c * 0.15 - time * 0.3) * Math.sin(r * 0.35 + distFromCenter) * 24;
          const canyon = Math.sin((c + r) * 0.18) * 16;
          const elevation = hill1 + hill2 + canyon - Math.pow(distFromCenter, 1.8) * 12;

          const cosA = Math.cos(angle);
          const sinA = Math.sin(angle);
          const rotX = x0 * cosA - y0 * sinA;
          const rotY = x0 * sinA + y0 * cosA;

          const projX = centerX + rotX;
          const projY = centerY + rotY * pitch - elevation;

          points[r][c] = { x: rotX, y: rotY, z: elevation, projX, projY };
        }
      }

      if (renderMode === 'wireframe') {
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const p = points[r][c];
            const elevRatio = Math.max(0, Math.min(1, (p.z + 40) / 80));
            const strokeColor = `rgba(${Math.floor(2 + elevRatio * 20)}, ${Math.floor(132 + elevRatio * 60)}, ${Math.floor(199 + elevRatio * 40)}, ${0.4 + elevRatio * 0.45})`;

            if (c < cols - 1) {
              const pNext = points[r][c + 1];
              ctx.beginPath();
              ctx.moveTo(p.projX, p.projY);
              ctx.lineTo(pNext.projX, pNext.projY);
              ctx.strokeStyle = strokeColor;
              ctx.lineWidth = 1.2;
              ctx.stroke();
            }

            if (r < rows - 1) {
              const pBelow = points[r + 1][c];
              ctx.beginPath();
              ctx.moveTo(p.projX, p.projY);
              ctx.lineTo(pBelow.projX, pBelow.projY);
              ctx.strokeStyle = strokeColor;
              ctx.lineWidth = 1.2;
              ctx.stroke();
            }

            if (p.z > 22 && c % 2 === 0) {
              ctx.beginPath();
              ctx.arc(p.projX, p.projY, 2, 0, Math.PI * 2);
              ctx.fillStyle = '#0284c7';
              ctx.fill();
            }
          }
        }
      } else if (renderMode === 'contours') {
        for (let r = 0; r < rows; r += 2) {
          ctx.beginPath();
          for (let c = 0; c < cols; c++) {
            const p = points[r][c];
            if (c === 0) ctx.moveTo(p.projX, p.projY);
            else ctx.lineTo(p.projX, p.projY);
          }
          ctx.strokeStyle = '#0284c7';
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      } else {
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const p = points[r][c];
            const elevRatio = Math.max(0, Math.min(1, (p.z + 40) / 80));
            ctx.beginPath();
            ctx.arc(p.projX, p.projY, 1.6, 0, Math.PI * 2);
            ctx.fillStyle = `rgb(${Math.floor(14 + (1 - elevRatio) * 30)}, ${Math.floor(130 + elevRatio * 90)}, ${Math.floor(210 + elevRatio * 40)})`;
            ctx.fill();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [renderMode, isRotating]);

  return (
    <div className={`relative rounded-2xl overflow-hidden bg-slate-50 ${className}`}>
      {/* Main Canvas */}
      <canvas ref={canvasRef} className="w-full h-[360px] sm:h-[400px] block cursor-grab active:cursor-grabbing" />

      {/* Clean Bottom Controls */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
        <div className="flex items-center gap-1 p-1 bg-white/90 backdrop-blur-xs border border-slate-200 rounded-lg text-xs">
          <button
            type="button"
            onClick={() => setRenderMode('wireframe')}
            className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
              renderMode === 'wireframe' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Wireframe
          </button>
          <button
            type="button"
            onClick={() => setRenderMode('contours')}
            className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
              renderMode === 'contours' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Contours
          </button>
          <button
            type="button"
            onClick={() => setRenderMode('pointcloud')}
            className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
              renderMode === 'pointcloud' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Points
          </button>
        </div>

        <button
          type="button"
          onClick={() => setIsRotating(!isRotating)}
          className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-white/90 backdrop-blur-xs border border-slate-200 rounded-lg hover:text-slate-900"
          title="Toggle rotation"
        >
          <RefreshCw className={`w-3 h-3 ${isRotating ? 'animate-spin text-sky-600' : 'text-slate-400'}`} />
          <span className="hidden sm:inline">{isRotating ? 'Pause' : 'Rotate'}</span>
        </button>
      </div>
    </div>
  );
};
