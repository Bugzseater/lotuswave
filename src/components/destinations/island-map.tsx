import { cn } from "@/lib/utils";
import type { Destination } from "@/types";

/*
 * A stylised outline of Sri Lanka, plotted from real coastline points
 * (longitude, latitude) and smoothed into curves. Pins use the same
 * projection, so they land where the places are. Mannar Island and the Jaffna
 * lagoon are left out on purpose — this is an atlas sketch, not a chart.
 */
const COAST: [number, number][] = [
  [80.24, 9.83], // Point Pedro
  [80.42, 9.6],
  [80.62, 9.4],
  [80.82, 9.27], // Mullaitivu
  [81.0, 8.95],
  [81.13, 8.75], // Nilaveli
  [81.23, 8.57], // Trincomalee
  [81.36, 8.33],
  [81.52, 8.03],
  [81.7, 7.72], // Batticaloa
  [81.82, 7.38],
  [81.86, 6.95], // Pottuvil
  [81.73, 6.56], // Kumana
  [81.46, 6.3], // Yala coast
  [81.12, 6.12], // Hambantota
  [80.8, 5.99], // Tangalle
  [80.59, 5.92], // Dondra Head
  [80.4, 5.96], // Weligama
  [80.22, 6.03], // Galle
  [80.05, 6.24],
  [79.98, 6.45], // Bentota
  [79.92, 6.7],
  [79.85, 6.93], // Colombo
  [79.83, 7.24], // Negombo
  [79.8, 7.6], // Chilaw
  [79.8, 7.98],
  [79.72, 8.26], // Kalpitiya
  [79.86, 8.56],
  [79.93, 8.86],
  [79.92, 9.02], // Mannar shore
  [80.06, 9.26],
  [80.1, 9.5], // Pooneryn
  [79.96, 9.66], // Kayts
  [80.05, 9.81], // Kankesanthurai
];

const LNG0 = 79.6;
const LAT0 = 10;
const SCALE = 100;
const WIDTH = 260;
const HEIGHT = 420;

const project = (lng: number, lat: number) =>
  [(lng - LNG0) * SCALE, (LAT0 - lat) * SCALE] as const;

/**
 * Where a place falls on the map, as percentages of its width and height —
 * for laying HTML (a callout card) over the SVG at the pin.
 */
export function pinPosition({ lat, lng }: { lat: number; lng: number }) {
  const [x, y] = project(lng, lat);
  return { left: (x / WIDTH) * 100, top: (y / HEIGHT) * 100 };
}

/** Closed Catmull-Rom spline through the points, as cubic Béziers. */
function smoothPath(points: readonly (readonly [number, number])[]) {
  const n = points.length;
  const at = (i: number) => points[(i + n) % n];
  const r = (v: number) => Math.round(v * 10) / 10;
  let d = `M${r(points[0][0])},${r(points[0][1])}`;
  for (let i = 0; i < n; i++) {
    const [x0, y0] = at(i - 1);
    const [x1, y1] = at(i);
    const [x2, y2] = at(i + 1);
    const [x3, y3] = at(i + 2);
    d += `C${r(x1 + (x2 - x0) / 6)},${r(y1 + (y2 - y0) / 6)} ${r(x2 - (x3 - x1) / 6)},${r(y2 - (y3 - y1) / 6)} ${r(x2)},${r(y2)}`;
  }
  return `${d}Z`;
}

const ISLAND_PATH = smoothPath(COAST.map(([lng, lat]) => project(lng, lat)));
const LATITUDES = [6, 7, 8, 9];

export type MapPin = Pick<Destination, "slug" | "name" | "coordinates"> & { number: number };

const TONES = {
  /** On brand or a brand-dark image overlay. */
  onBrand: {
    island: "fill-white/[0.07] stroke-white/60",
    grid: "stroke-white/15",
    gridText: "fill-white/50",
    pin: "fill-white",
    pinText: "fill-brand",
    active: "fill-accent-gold",
    halo: "stroke-accent-gold",
    dot: "fill-white/45",
    label: "fill-white",
    labelText: "fill-brand",
  },
  /** On white or brand-light. */
  light: {
    island: "fill-brand-light stroke-brand/50",
    grid: "stroke-brand/10",
    gridText: "fill-muted",
    pin: "fill-brand",
    pinText: "fill-white",
    active: "fill-brand",
    halo: "stroke-brand",
    dot: "fill-brand/35",
    label: "fill-brand",
    labelText: "fill-white",
  },
} as const;

/**
 * The island with its destinations pinned. With `linked`, every pin is a link
 * to that guide and shows its name on hover or focus. With `activeSlug`, that
 * pin is drawn large with a pulsing halo and the others shrink to dots — the
 * "you are here" view on a guide page. With `focus`, only those pins keep
 * their numbers — one region lit on the full island.
 */
export function IslandMap({
  pins,
  activeSlug,
  focus,
  linked = false,
  minimal = false,
  labelScale = 1,
  tone = "onBrand",
  label,
  className,
}: {
  /** Outline and pins only — no grid, compass or pulse. For thumbnail sizes. */
  minimal?: boolean;
  /** Enlarges the hover name labels — for a map drawn small. */
  labelScale?: number;
  pins: MapPin[];
  activeSlug?: string;
  focus?: readonly string[];
  linked?: boolean;
  tone?: keyof typeof TONES;
  /** Accessible name for the map. */
  label: string;
  className?: string;
}) {
  const t = TONES[tone];

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      role={linked ? "group" : "img"}
      aria-label={label}
      className={cn("h-auto w-full overflow-visible", className)}
    >
      {/* Latitude lines — the atlas grid. */}
      {!minimal && LATITUDES.map((lat) => {
        const [, y] = project(LNG0, lat);
        return (
          <g key={lat} aria-hidden="true">
            <line x1="0" x2={WIDTH} y1={y} y2={y} strokeDasharray="2 4" className={cn("stroke-1", t.grid)} />
            <text x={WIDTH} y={y - 4} textAnchor="end" className={cn("text-[8px] tracking-widest", t.gridText)}>
              {lat}°N
            </text>
          </g>
        );
      })}

      <path
        d={ISLAND_PATH}
        aria-hidden="true"
        strokeWidth="1.25"
        strokeLinejoin="round"
        vectorEffect={minimal ? "non-scaling-stroke" : undefined}
        className={t.island}
      />

      {/* Compass mark, top left. */}
      {!minimal && (
        <g aria-hidden="true" transform="translate(18 24)" className={t.gridText}>
          <path d="M0,-12 L4,2 L0,-1 L-4,2 Z" />
          <text y="14" textAnchor="middle" className="text-[8px] font-semibold">
            N
          </text>
        </g>
      )}

      {pins.map((pin) => {
        const [x, y] = project(pin.coordinates.lng, pin.coordinates.lat);
        const isActive = pin.slug === activeSlug;
        const dimmed = focus
          ? !focus.includes(pin.slug)
          : activeSlug !== undefined && !isActive;

        if (dimmed) {
          return <circle key={pin.slug} cx={x} cy={y} r="2.5" aria-hidden="true" className={t.dot} />;
        }

        if (isActive) {
          return (
            <g key={pin.slug} aria-hidden="true">
              {!minimal && (
                <circle
                  cx={x}
                  cy={y}
                  r="14"
                  fill="none"
                  strokeWidth="1.5"
                  className={cn(t.halo, "origin-center animate-ping [transform-box:fill-box] motion-reduce:hidden")}
                />
              )}
              <circle
                cx={x}
                cy={y}
                r={minimal ? 22 : 14}
                fill="none"
                strokeWidth={minimal ? 6 : 1}
                className={cn(t.halo, "opacity-60")}
              />
              <circle cx={x} cy={y} r={minimal ? 14 : 6} className={t.active} />
            </g>
          );
        }

        // Labels flip to the left on the east side so they stay on the canvas.
        const flip = x > WIDTH * 0.62;
        const s = labelScale;
        const labelWidth = (pin.name.length * 4.9 + 14) * s;
        const labelX = flip ? x - 11 - labelWidth : x + 11;

        const marker = (
          <>
            <circle
              cx={x}
              cy={y}
              r="7"
              className={cn(
                t.pin,
                "origin-center transition-transform duration-200 ease-out [transform-box:fill-box] group-hover:scale-125 group-focus-visible:scale-125",
              )}
            />
            <text
              x={x}
              y={y + 2.6}
              textAnchor="middle"
              className={cn("pointer-events-none text-[7.5px] font-bold", t.pinText)}
            >
              {pin.number}
            </text>
            <g className="pointer-events-none opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100 group-focus-visible:opacity-100">
              <rect
                x={labelX}
                y={y - 8 * s}
                width={labelWidth}
                height={16 * s}
                rx={8 * s}
                className={t.label}
              />
              <text
                x={labelX + labelWidth / 2}
                y={y + 3 * s}
                textAnchor="middle"
                fontSize={8.5 * s}
                className={cn("font-semibold", t.labelText)}
              >
                {pin.name}
              </text>
            </g>
          </>
        );

        return linked ? (
          <a
            key={pin.slug}
            href={`/destinations/${pin.slug}`}
            aria-label={`${pin.number}. ${pin.name}`}
            className="group outline-none"
          >
            {marker}
          </a>
        ) : (
          <g key={pin.slug} aria-hidden="true" className="group">
            {marker}
          </g>
        );
      })}
    </svg>
  );
}
