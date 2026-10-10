import { useEffect, useId, useRef, type CSSProperties } from 'react';
import './GlassSurface.css';

// Adapted from React Bits GlassSurface by David Haz: the SVG renderer only,
// sized for a navigation pill. See licenses/react-bits.txt for the license.
// https://github.com/DavidHDev/react-bits/tree/main/src/ts-default/Components/GlassSurface
export default function GlassSurface() {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const filterId = `nav-glass-${id}`;
  const surfaceRef = useRef<HTMLSpanElement>(null);
  const imageRef = useRef<SVGFEImageElement>(null);

  useEffect(() => {
    const surface = surfaceRef.current;
    const image = imageRef.current;
    if (!surface || !image) return;

    // React Bits uses frosted glass on engines without SVG backdrop filters.
    const isWebkit = /Safari/.test(navigator.userAgent) && !/Chrome|Chromium/.test(navigator.userAgent);
    const isFirefox = /Firefox/.test(navigator.userAgent);
    const supportsRefraction = !isWebkit && !isFirefox && CSS.supports('backdrop-filter', `url(#${filterId})`);
    if (!supportsRefraction) return;

    const updateMap = () => {
      // Layout dimensions stay stable while Motion translates/scales the highlight.
      const width = surface.offsetWidth;
      const height = surface.offsetHeight;
      if (!width || !height) return;
      const radius = Math.min(width, height) / 2;
      const edge = Math.min(width, height) * .035;
      const map = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
        <defs>
          <linearGradient id="r" x1="100%" y1="0%" x2="0%" y2="0%"><stop offset="0%" stop-color="#0000"/><stop offset="100%" stop-color="red"/></linearGradient>
          <linearGradient id="b" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#0000"/><stop offset="100%" stop-color="blue"/></linearGradient>
          <filter id="soft"><feGaussianBlur stdDeviation="2"/></filter>
        </defs>
        <rect width="${width}" height="${height}" fill="black"/>
        <rect width="${width}" height="${height}" rx="${radius}" fill="url(#r)"/>
        <rect width="${width}" height="${height}" rx="${radius}" fill="url(#b)" style="mix-blend-mode:difference"/>
        <rect x="${edge}" y="${edge}" width="${width - edge * 2}" height="${height - edge * 2}" rx="${radius}" fill="hsl(0 0% 50% / .93)" filter="url(#soft)"/>
      </svg>`;
      image.setAttribute('href', `data:image/svg+xml,${encodeURIComponent(map)}`);
      surface.dataset.refraction = 'svg';
    };

    updateMap();
    const observer = new ResizeObserver(updateMap);
    observer.observe(surface);
    return () => {
      observer.disconnect();
      delete surface.dataset.refraction;
    };
  }, [filterId]);

  return (
    <span ref={surfaceRef} className="nav-glass-surface" aria-hidden="true" style={{ '--glass-filter': `url(#${filterId})` } as CSSProperties}>
      <svg className="nav-glass-filter" xmlns="http://www.w3.org/2000/svg" focusable="false">
        <defs>
          <filter id={filterId} colorInterpolationFilters="sRGB" x="0%" y="0%" width="100%" height="100%">
            <feImage ref={imageRef} x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="map" />
            <feDisplacementMap in="SourceGraphic" in2="map" scale="-34" xChannelSelector="R" yChannelSelector="G" result="dispRed" />
            <feColorMatrix in="dispRed" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="red" />
            <feDisplacementMap in="SourceGraphic" in2="map" scale="-32" xChannelSelector="R" yChannelSelector="G" result="dispGreen" />
            <feColorMatrix in="dispGreen" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="green" />
            <feDisplacementMap in="SourceGraphic" in2="map" scale="-30" xChannelSelector="R" yChannelSelector="G" result="dispBlue" />
            <feColorMatrix in="dispBlue" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="blue" />
            <feBlend in="red" in2="green" mode="screen" result="rg" />
            <feBlend in="rg" in2="blue" mode="screen" result="output" />
            <feGaussianBlur in="output" stdDeviation=".4" />
          </filter>
        </defs>
      </svg>
    </span>
  );
}
