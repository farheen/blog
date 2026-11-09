import React, { useState } from "react";
import data from "./data/titanic.json";

const CLASSES = [
  { value: 1, label: "1st class", note: "Upper decks, closest to the lifeboats" },
  { value: 2, label: "2nd class", note: "Middle decks" },
  { value: 3, label: "3rd class", note: "Lower decks, furthest from the boats" },
];

const Choice = ({ active, onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    className={`btn btn-sm me-2 mb-2 ${active ? "btn-dark" : "btn-outline-secondary"}`}
    style={{ borderRadius: 20, marginRight: 8 }}
  >
    {children}
  </button>
);

const Stepper = ({ label, value, onChange }) => (
  <div className="d-flex align-items-center justify-content-between mb-2">
    <span>{label}</span>
    <div className="d-flex align-items-center">
      <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => onChange(Math.max(0, value - 1))} aria-label={`Fewer ${label}`}>
        −
      </button>
      <span style={{ width: 32, textAlign: "center", fontWeight: 700 }}>{value}</span>
      <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => onChange(Math.min(5, value + 1))} aria-label={`More ${label}`}>
        +
      </button>
    </div>
  </div>
);

const TitanicDemo = () => {
  const [pclass, setPclass] = useState(3);
  const [sex, setSex] = useState("m");
  const [sib, setSib] = useState(0);
  const [par, setPar] = useState(0);

  const row = data.grid.find((r) => r.c === pclass && r.s === sex && r.sib === sib && r.par === par);
  const pct = Math.round(row.p * 100);
  const survives = row.p >= 0.5;
  const color = survives ? "#059669" : "#dc2626";

  return (
    <div className="row">
      <div className="col-md-6 mb-3">
        <h6>Board the Titanic</h6>
        <div className="text-secondary mb-2" style={{ fontSize: "0.85rem" }}>Ticket class</div>
        {CLASSES.map((c) => (
          <Choice key={c.value} active={pclass === c.value} onClick={() => setPclass(c.value)}>
            {c.label}
          </Choice>
        ))}
        <div className="text-secondary mb-3" style={{ fontSize: "0.8rem" }}>
          {CLASSES.find((c) => c.value === pclass).note}
        </div>

        <div className="text-secondary mb-2" style={{ fontSize: "0.85rem" }}>Passenger</div>
        <Choice active={sex === "f"} onClick={() => setSex("f")}>Woman</Choice>
        <Choice active={sex === "m"} onClick={() => setSex("m")}>Man</Choice>

        <div className="text-secondary mt-3 mb-2" style={{ fontSize: "0.85rem" }}>Travelling with</div>
        <Stepper label="Siblings or spouse" value={sib} onChange={setSib} />
        <Stepper label="Parents or children" value={par} onChange={setPar} />
      </div>

      <div className="col-md-6 mb-3">
        <div className="p-4 text-center h-100" style={{ background: "#f8fafc", borderRadius: 16, border: `2px solid ${color}` }}>
          <div className="text-secondary" style={{ fontSize: "0.85rem" }}>The model's prediction</div>
          <div style={{ fontSize: "1.8rem", fontWeight: 800, color }}>{survives ? "You survive" : "You don't survive"}</div>

          <div className="mx-auto my-3" style={{ position: "relative", width: 160, height: 160 }}>
            <svg viewBox="0 0 36 36" style={{ width: 160, height: 160, transform: "rotate(-90deg)" }}>
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e5e7eb" strokeWidth="3.2" />
              <circle
                cx="18"
                cy="18"
                r="15.9"
                fill="none"
                stroke={color}
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeDasharray={`${pct} 100`}
                style={{ transition: "stroke-dasharray 0.5s ease" }}
              />
            </svg>
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ fontSize: "2rem", fontWeight: 800 }}>{pct}%</div>
              <div className="text-secondary" style={{ fontSize: "0.75rem" }}>chance of survival</div>
            </div>
          </div>

          <div style={{ fontSize: "0.85rem" }} className="text-secondary">
            {row.n > 0 ? (
              <>
                In the real passenger list, <strong>{row.n}</strong> {row.n === 1 ? "person" : "people"} matched this profile, and{" "}
                <strong>{Math.round(row.actual * 100)}%</strong> of them survived.
              </>
            ) : (
              <>No real passenger matched this exact profile, so the model is extrapolating from similar ones.</>
            )}
          </div>
        </div>
      </div>

      <div className="col-12 text-secondary" style={{ fontSize: "0.75rem" }}>
        Predictions come from the project's Random Forest (100 trees, depth 5), trained on {data.passengers} passengers using class, sex and
        family aboard. Training accuracy: {Math.round(data.accuracy * 1000) / 10}%.
      </div>
    </div>
  );
};

export default TitanicDemo;
