/**
 * Fallback architectural SVG data URIs and reliable images for Dubai properties, rooms and areas.
 * Hand-crafted with luxury Dubai palettes (emerald, sand travertine, midnight slate, gold brass accents).
 */

function createSvgPlaceholder(title: string, sub: string, bg1: string, bg2: string, accent: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${bg1}"/>
        <stop offset="100%" stop-color="${bg2}"/>
      </linearGradient>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
      </pattern>
    </defs>
    <rect width="800" height="600" fill="url(#g)"/>
    <rect width="800" height="600" fill="url(#grid)"/>
    
    <!-- Architectural Silhouette -->
    <g opacity="0.35" transform="translate(100, 180)">
      <rect x="50" y="80" width="80" height="240" fill="${accent}" rx="4"/>
      <rect x="150" y="40" width="110" height="280" fill="${accent}" rx="4"/>
      <polygon points="205,10 160,40 250,40" fill="${accent}"/>
      <rect x="280" y="110" width="90" height="210" fill="${accent}" rx="4"/>
      <rect x="390" y="60" width="120" height="260" fill="${accent}" rx="4"/>
      <circle cx="530" cy="50" r="35" fill="none" stroke="${accent}" stroke-width="4"/>
    </g>

    <!-- Bottom Scrim -->
    <rect y="380" width="800" height="220" fill="black" opacity="0.45"/>

    <!-- Text -->
    <text x="40" y="490" font-family="system-ui, -apple-system, sans-serif" font-size="28" font-weight="700" fill="#ffffff" letter-spacing="-0.5">${title}</text>
    <text x="40" y="530" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="500" fill="rgba(255,255,255,0.85)">${sub}</text>
    <circle cx="730" cy="510" r="22" fill="${accent}" opacity="0.8"/>
    <text x="724" y="516" font-family="system-ui" font-size="16" font-weight="bold" fill="#000000">DXB</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const FALLBACK_IMAGES = {
  hero: createSvgPlaceholder('Dubai Skyline Waterfront', 'Luxury Residential Architecture', '#042f2e', '#0f172a', '#2dd4bf'),
  apartment: createSvgPlaceholder('Modern Dubai Apartment', 'Floor-to-ceiling glass & marina vistas', '#1e293b', '#0f172a', '#38bdf8'),
  penthouse: createSvgPlaceholder('Skyline Luxury Penthouse', 'Panoramic Dubai views & private terrace', '#064e3b', '#022c22', '#34d399'),
  villa: createSvgPlaceholder('Beachfront Villa', 'Private pool & palm sanctuary', '#1c1917', '#292524', '#f59e0b'),
  room: createSvgPlaceholder('Executive Private Suite', 'Bills included · High-rise luxury', '#1e1b4b', '#0f172a', '#818cf8'),
  area: createSvgPlaceholder('Dubai Community', 'Prime location & lifestyle amenities', '#111827', '#0f172a', '#10b981'),
  project: createSvgPlaceholder('Off-Plan Development', 'Handover 2026-2028 · Emaar & Sobha', '#0f172a', '#022c22', '#6ee7b7'),
  agent: createSvgPlaceholder('RERA Verified Agent', 'Dar Dubai Specialist', '#1e293b', '#334155', '#38bdf8'),
};
