"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";

export function CobeGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phiRef = useRef(0);

  useEffect(() => {
    const onResize = () => {
      if (!canvasRef.current) return;
      const size = canvasRef.current.offsetWidth;
      canvasRef.current.width = size * 2;
      canvasRef.current.height = size * 2;
    };

    onResize();
    window.addEventListener("resize", onResize);

    const globe = createGlobe(canvasRef.current!, {
      devicePixelRatio: 2,
      width: 1200,
      height: 1200,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 3,
      baseColor: [0.15, 0.15, 0.15],
      markerColor: [0.98, 0.45, 0.12],
      glowColor: [1, 1, 1],
      markers: [
        { location: [43.6532, -79.3832], size: 0.08 },
        { location: [45.5017, -73.5673], size: 0.07 },
        { location: [49.2827, -123.1207], size: 0.07 },
        { location: [51.0447, -114.0719], size: 0.06 },
      ],
      onRender: (state) => {
        phiRef.current += 0.005;
        state.phi = phiRef.current;
      },
    });

    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="h-full w-full" />;
}
