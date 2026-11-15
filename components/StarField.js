// Fixed starry background drawn behind all content.
// Star positions come from a seeded generator, so the server-rendered HTML and
// the browser render are identical (no hydration mismatch), and three layers of
// box-shadows replace the 150 separate <div>s the site used before.

function seededRandom(seed) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const random = seededRandom(42);

function starShadows(count) {
  return Array.from({ length: count }, () => {
    const x = (random() * 100).toFixed(2);
    const y = (random() * 100).toFixed(2);
    const alpha = (0.3 + random() * 0.7).toFixed(2);
    return `${x}vw ${y}vh rgba(255,255,255,${alpha})`;
  }).join(", ");
}

const LAYERS = [
  { size: 1, shadows: starShadows(70), className: "star-layer star-layer-1" },
  { size: 2, shadows: starShadows(50), className: "star-layer star-layer-2" },
  { size: 3, shadows: starShadows(30), className: "star-layer star-layer-3" },
];

export default function StarField() {
  return (
    <div aria-hidden="true" className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
      {LAYERS.map((layer) => (
        <div
          key={layer.size}
          className={layer.className}
          style={{ width: layer.size, height: layer.size, boxShadow: layer.shadows }}
        />
      ))}
    </div>
  );
}
