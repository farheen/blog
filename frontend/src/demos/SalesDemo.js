import React, { useMemo, useState } from "react";
import data from "./data/sales.json";

const W = 760;
const H = 300;
const PAD = { top: 16, right: 16, bottom: 30, left: 56 };
const COLORS = { actual: "#0ea5e9", forecast: "#f59e0b", band: "rgba(245, 158, 11, 0.18)", grid: "#e5e7eb" };

const money = (v) => (v >= 1e6 ? `£${(v / 1e6).toFixed(2)}M` : `£${Math.round(v / 1000)}k`);
const dayLabel = (d) => new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
const monthLabel = (m) => new Date(`${m}-01`).toLocaleDateString("en-GB", { month: "short", year: "2-digit" });

const Kpi = ({ label, value, note }) => (
  <div className="col-6 col-md-3 mb-3">
    <div className="p-3 h-100" style={{ background: "#f8fafc", borderRadius: 12, border: "1px solid #e2e8f0" }}>
      <div className="text-secondary" style={{ fontSize: "0.8rem" }}>{label}</div>
      <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#0f172a" }}>{value}</div>
      {note && <div className="text-secondary" style={{ fontSize: "0.75rem" }}>{note}</div>}
    </div>
  </div>
);

const SalesDemo = () => {
  const [hover, setHover] = useState(null);
  const { kpi, monthly } = data;

  // One combined series: actual days first, then forecast days
  const points = useMemo(
    () => [
      ...data.actual.map(([d, y]) => ({ d, y, kind: "actual" })),
      ...data.forecast.map(([d, y, lo, hi]) => ({ d, y, lo, hi, kind: "forecast" })),
    ],
    []
  );

  const t0 = new Date(points[0].d).getTime();
  const t1 = new Date(points[points.length - 1].d).getTime();
  const yMax = Math.max(...points.map((p) => p.hi ?? p.y)) * 1.05;
  const x = (d) => PAD.left + ((new Date(d).getTime() - t0) / (t1 - t0)) * (W - PAD.left - PAD.right);
  const y = (v) => PAD.top + (1 - Math.max(v, 0) / yMax) * (H - PAD.top - PAD.bottom);

  const line = (pts) => pts.map((p, i) => `${i ? "L" : "M"}${x(p.d).toFixed(1)},${y(p.y).toFixed(1)}`).join("");
  const actual = points.filter((p) => p.kind === "actual");
  const forecast = points.filter((p) => p.kind === "forecast");
  const band =
    forecast.map((p, i) => `${i ? "L" : "M"}${x(p.d).toFixed(1)},${y(p.hi).toFixed(1)}`).join("") +
    [...forecast].reverse().map((p) => `L${x(p.d).toFixed(1)},${y(p.lo).toFixed(1)}`).join("") +
    "Z";
  const ticks = [0, 25000, 50000, 75000, 100000, 125000].filter((v) => v < yMax);
  const monthTicks = monthly.map(([m]) => m).filter((_, i) => i % 2 === 0);

  const inspect = (clientX, el) => {
    const rect = el.getBoundingClientRect();
    const px = ((clientX - rect.left) / rect.width) * W;
    let best = points[0];
    for (const p of points) if (Math.abs(x(p.d) - px) < Math.abs(x(best.d) - px)) best = p;
    setHover(best);
  };

  const maxMonth = Math.max(...monthly.map(([, v]) => v));

  return (
    <div>
      <div className="row">
        <Kpi label="Revenue analysed" value={money(kpi.revenue)} note={`${kpi.days} trading days, UK`} />
        <Kpi label="Average day" value={money(kpi.avgDaily)} />
        <Kpi label="Best month" value={money(kpi.bestMonthRevenue)} note={monthLabel(kpi.bestMonth)} />
        <Kpi label="Next 90 days (forecast)" value={money(kpi.forecast90)} note="Prophet estimate" />
      </div>

      <h6 className="mt-2 mb-1">Daily revenue and 90-day forecast</h6>
      <div className="text-secondary mb-2" style={{ fontSize: "0.85rem" }}>
        Hover or tap the chart to inspect any day.
        <span style={{ color: COLORS.actual, fontWeight: 600 }}> ━ Actual</span>
        <span style={{ color: COLORS.forecast, fontWeight: 600 }}> ━ Forecast</span>
        <span style={{ color: "#b45309" }}> ▒ Uncertainty range</span>
      </div>
      <div style={{ position: "relative" }}>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          style={{ width: "100%", height: "auto", touchAction: "none" }}
          onMouseMove={(e) => inspect(e.clientX, e.currentTarget)}
          onTouchMove={(e) => inspect(e.touches[0].clientX, e.currentTarget)}
          onMouseLeave={() => setHover(null)}
          role="img"
          aria-label="Line chart of daily UK revenue with a 90-day forecast"
        >
          {ticks.map((v) => (
            <g key={v}>
              <line x1={PAD.left} x2={W - PAD.right} y1={y(v)} y2={y(v)} stroke={COLORS.grid} />
              <text x={PAD.left - 8} y={y(v) + 4} textAnchor="end" fontSize="11" fill="#64748b">
                {money(v)}
              </text>
            </g>
          ))}
          {monthTicks.map((m) => (
            <text key={m} x={x(`${m}-01`)} y={H - 8} textAnchor="middle" fontSize="11" fill="#64748b">
              {monthLabel(m)}
            </text>
          ))}
          <path d={band} fill={COLORS.band} />
          <path d={line(actual)} fill="none" stroke={COLORS.actual} strokeWidth="1.6" />
          <path d={line(forecast)} fill="none" stroke={COLORS.forecast} strokeWidth="1.6" />
          <line x1={x(forecast[0].d)} x2={x(forecast[0].d)} y1={PAD.top} y2={H - PAD.bottom} stroke="#94a3b8" strokeDasharray="4 4" />
          {hover && (
            <g>
              <line x1={x(hover.d)} x2={x(hover.d)} y1={PAD.top} y2={H - PAD.bottom} stroke="#334155" strokeWidth="1" />
              <circle cx={x(hover.d)} cy={y(hover.y)} r="5" fill={hover.kind === "actual" ? COLORS.actual : COLORS.forecast} stroke="#fff" strokeWidth="2" />
            </g>
          )}
        </svg>
        {hover && (
          <div
            style={{
              position: "absolute",
              top: 8,
              left: `${(x(hover.d) / W) * 100}%`,
              transform: x(hover.d) > W * 0.6 ? "translateX(-105%)" : "translateX(8px)",
              background: "#0f172a",
              color: "#fff",
              padding: "6px 10px",
              borderRadius: 8,
              fontSize: "0.8rem",
              pointerEvents: "none",
              whiteSpace: "nowrap",
            }}
          >
            <div style={{ opacity: 0.75 }}>{dayLabel(hover.d)}</div>
            <div style={{ fontWeight: 700 }}>
              {hover.kind === "actual" ? "Actual" : "Forecast"}: £{hover.y.toLocaleString("en-GB")}
            </div>
            {hover.kind === "forecast" && (
              <div style={{ opacity: 0.75 }}>
                Range £{hover.lo.toLocaleString("en-GB")} – £{hover.hi.toLocaleString("en-GB")}
              </div>
            )}
          </div>
        )}
      </div>

      <h6 className="mt-4 mb-2">Revenue by month</h6>
      <div className="d-flex align-items-end" style={{ gap: 6, height: 140 }}>
        {monthly.map(([m, v], i) => (
          <div key={m} className="text-center" style={{ flex: 1, minWidth: 0 }} title={`${monthLabel(m)}: £${v.toLocaleString("en-GB")}`}>
            <div
              style={{
                height: `${(v / maxMonth) * 110}px`,
                background: m === kpi.bestMonth ? COLORS.forecast : COLORS.actual,
                opacity: i === monthly.length - 1 ? 0.45 : 1,
                borderRadius: "4px 4px 0 0",
              }}
            />
            <div style={{ fontSize: "0.65rem", color: "#64748b", marginTop: 4, overflow: "hidden" }}>{monthLabel(m)}</div>
          </div>
        ))}
      </div>
      <div className="text-secondary mt-2" style={{ fontSize: "0.75rem" }}>
        December 2010 is a partial month (data ends 9 December). Data: Online Retail II, UK transactions. Forecast: Prophet with weekly and yearly seasonality.
      </div>
    </div>
  );
};

export default SalesDemo;
