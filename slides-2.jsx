// Slides 6+ — full step lists, planting overlay, lessons, recommendations
const _D2 = window.PROCUREMENT_DATA;

// ─── Step list slide for one commodity (full table) ───────────────────────────
function StepListSlide({ procKey, label, eyebrow }) {
  const p = _D2[procKey];
  // Two columns when > 14 steps
  const split = p.steps.length > 14;
  const half = Math.ceil(p.steps.length / 2);
  const colA = split ? p.steps.slice(0, half) : p.steps;
  const colB = split ? p.steps.slice(half) : [];

  const renderCol = (steps) => (
    <div style={{ background: 'white', borderRadius: 6, border: `1px solid ${window.FAO.rule}`,
      padding: '4px 16px', flex: 1 }}>
      <div style={{
        display: 'grid', gridTemplateColumns: '90px 1fr 60px',
        gap: 10, padding: '8px 0',
        borderBottom: `2px solid ${window.FAO.rule}`,
        fontSize: 13, color: window.FAO.inkSoft,
        textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600
      }}>
        <div>Date</div><div>Milestone</div><div style={{ textAlign: 'right' }}>Lead</div>
      </div>
      {steps.map((step, i) => {
        const flagged = step.flag || step.lead >= 30;
        return (
          <div key={i} style={{
            display: 'grid', gridTemplateColumns: '90px 1fr 60px', gap: 10,
            padding: '4px 0',
            borderBottom: i < steps.length - 1 ? `1px solid ${window.FAO.ruleSoft}` : 'none',
            fontSize: 14, alignItems: 'baseline'
          }}>
            <div style={{ color: window.FAO.inkSoft, fontFeatureSettings: '"tnum"', fontWeight: 500, fontSize: 13 }}>
              {window.fmtDateShort(step.date)} {window.parseISO(step.date).getUTCFullYear() !== 2026 ? "'25" : ''}
            </div>
            <div style={{ color: flagged ? window.FAO.warnDeep : window.FAO.ink, fontWeight: flagged ? 600 : 400, lineHeight: 1.2, fontSize: 14 }}>
              {step.desc}
              <div style={{ fontSize: 11, color: window.FAO.inkSoft, fontWeight: 400, marginTop: 1 }}>
                {step.stage} · {step.actor}
              </div>
            </div>
            <div style={{
              fontFeatureSettings: '"tnum"', fontWeight: 600, textAlign: 'right', fontSize: 13,
              color: flagged ? 'white' : window.FAO.inkSoft,
              background: flagged ? window.FAO.warn : 'transparent',
              padding: flagged ? '2px 6px' : '2px 0',
              borderRadius: 4
            }}>
              +{step.workingLead}w <span style={{ opacity: 0.75, fontWeight: 500 }}>({step.lead} cal)</span>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <window.Slide label={label} bg={window.FAO.paper}>
      <window.SlideTitle
        eyebrow={eyebrow}
        title={p.name + " — detailed milestone register"}
        sub={"Highlighted rows: lead time ≥ 30 calendar days or flagged as a contributing event. Lead times shown as calendar days (working days in parentheses)."}
        accent={p.color}
      />
      <div style={{ display: 'flex', gap: 20, marginTop: 8, maxHeight: 700, overflow: 'hidden' }}>
        {renderCol(colA)}
        {split && renderCol(colB)}
      </div>
    </window.Slide>
  );
}

// ─── Slide: Stage-by-stage comparison heatmap ─────────────────────────────────
function SlideHeatmap() {
  const procs = ['vegetableSeeds', 'potatoSeeds', 'chicks'];
  const stageList = ['Pre-solicitation', 'Solicitation', 'Evaluation', 'Technical evaluation', 'Award recommendation', 'Contract', 'Contracting', 'PSI'];
  // collapse equivalent stages
  const groups = [
    { name: "Pre-solicitation", keys: ['Pre-solicitation'] },
    { name: "Solicitation", keys: ['Solicitation'] },
    { name: "Evaluation", keys: ['Evaluation', 'Technical evaluation'] },
    { name: "Award & Contract", keys: ['Award recommendation', 'Contract', 'Contracting'] },
    { name: "PSI", keys: ['PSI'] }
  ];
  function getDays(procKey, group) {
    const p = _D2[procKey];
    return p.stages.filter(s => group.keys.includes(s.stage)).reduce((a, b) => a + b.workingDays, 0);
  }
  // max for color scaling
  const allValues = [];
  for (const pk of procs) for (const g of groups) allValues.push(getDays(pk, g));
  const max = Math.max(...allValues);

  return (
    <window.Slide label="12 Stage comparison">
      <window.SlideTitle
        eyebrow="Stage comparison"
        title="Working and calendar days by stage."
        sub="Each cell shows working days, with calendar days below. Darker shading indicates longer duration."
      />
      <div style={{
        marginTop: 28, background: 'white', borderRadius: 8,
        border: `1px solid ${window.FAO.rule}`, padding: 32
      }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '320px repeat(5, 1fr)', gap: 12,
          marginBottom: 12
        }}>
          <div></div>
          {groups.map((g, i) => (
            <div key={i} style={{
              fontSize: window.TYPE_SCALE.small, fontWeight: 600,
              color: window.FAO.inkSoft, textAlign: 'center',
              textTransform: 'uppercase', letterSpacing: '0.06em'
            }}>{g.name}</div>
          ))}
        </div>
        {procs.map((pk, ri) => {
          const p = _D2[pk];
          return (
            <div key={pk} style={{
              display: 'grid', gridTemplateColumns: '320px repeat(5, 1fr)', gap: 12,
              marginBottom: 12, alignItems: 'stretch'
            }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '20px 16px', background: window.FAO.blueLight, borderRadius: 6
              }}>
                <div style={{ width: 12, height: 36, background: p.color, borderRadius: 2 }} />
                <div>
                  <div style={{ fontSize: window.TYPE_SCALE.small, fontWeight: 600 }}>{p.name}</div>
                  <div style={{ fontSize: window.TYPE_SCALE.micro, color: window.FAO.inkSoft, fontFeatureSettings: '"tnum"' }}>
                    {p.totalWorkingDays} working days total
                  </div>
                </div>
              </div>
              {groups.map((g, gi) => {
                const v = getDays(pk, g);
                const vCalendar = window.PROCUREMENT_DATA[pk].stages.filter(s => g.keys.includes(s.stage)).reduce((a, b) => a + b.days, 0);
                const intensity = v / max;
                const bg = `rgba(11, 61, 145, ${0.08 + intensity * 0.85})`;
                const textColor = intensity > 0.45 ? 'white' : window.FAO.ink;
                return (
                  <div key={gi} style={{
                    background: bg, borderRadius: 6,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    padding: '20px 8px', minHeight: 92
                  }}>
                    <div style={{ fontSize: 48, fontWeight: 600, color: textColor,
                      fontFeatureSettings: '"tnum"', lineHeight: 1 }}>{v ? v + 'w' : '—'}</div>
                    <div style={{ fontSize: 16, color: textColor, opacity: 0.85, marginTop: 6, fontFeatureSettings: '"tnum"' }}>
                      {v ? `${vCalendar} cal` : ''}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </window.Slide>
  );
}

// ─── Slide: Top time consumers across all three ───────────────────────────────
function SlideTopConsumers() {
  // Build consolidated list — top 7 lead times across all 3 procurements
  const all = [];
  for (const k of Object.keys(_D2)) {
    for (const s of _D2[k].steps) {
      if (s.lead > 0) all.push({ ...s, procKey: k, procName: _D2[k].name, color: _D2[k].color });
    }
  }
  all.sort((a, b) => b.lead - a.lead);
  const top = all.slice(0, 7);
  const max = top[0].lead;

  return (
    <window.Slide label="13 Top time consumers">
      <window.SlideTitle
        eyebrow="Highest lead-time events"
        title="Seven milestones account for most of the elapsed time."
        sub={`Together these ${top.length} steps represent ${top.reduce((a,b)=>a+b.workingLead,0)} working days (${top.reduce((a,b)=>a+b.lead,0)} calendar) across the three procurements.`}
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 18 }}>
        {top.map((s, i) => (
          <div key={i} style={{
            background: 'white', borderRadius: 8, border: `1px solid ${window.FAO.rule}`,
            padding: '12px 22px',
            display: 'grid', gridTemplateColumns: '80px 260px 1fr 130px',
            alignItems: 'center', gap: 22
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 38, fontWeight: 600, color: window.FAO.blueDark, fontFeatureSettings: '"tnum"', lineHeight: 1 }}>{s.workingLead}w</div>
              <div style={{ fontSize: 13, color: window.FAO.inkSoft, fontFeatureSettings: '"tnum"', marginTop: 2 }}>{s.lead} calendar</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 8, height: 30, background: s.color, borderRadius: 2 }} />
              <div>
                <div style={{ fontSize: 16, fontWeight: 600 }}>{s.procName}</div>
                <div style={{ fontSize: 13, color: window.FAO.inkSoft }}>{s.stage}</div>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 4 }}>
                {s.desc}
              </div>
              <div style={{
                height: 8, background: window.FAO.ruleSoft, borderRadius: 4, position: 'relative'
              }}>
                <div style={{
                  position: 'absolute', inset: 0, width: `${(s.lead / max) * 100}%`,
                  background: s.color, borderRadius: 4
                }} />
              </div>
            </div>
            <div style={{
              fontSize: window.TYPE_SCALE.micro, color: window.FAO.inkSoft,
              padding: '4px 10px', background: window.FAO.blueLight,
              borderRadius: 4, justifySelf: 'start',
              border: `1px solid ${window.FAO.rule}`, textAlign: 'center'
            }}>
              {s.actor}
            </div>
          </div>
        ))}
      </div>
    </window.Slide>
  );
}

// ─── Slide: Planting calendar overlay (live editor inline) ────────────────────
function SlidePlantingCalendar() {
  return (
    <window.Slide label="14 Planting calendar">
      <window.SlideTitle
        eyebrow="Planting calendar"
        title="Critical delivery windows by commodity."
        sub="Default values reflect publicly available agronomic guidance for Ukraine. Dates may be revised in this panel or in the floating editor; all slides update accordingly."
      />
      <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 1fr', gap: 32, marginTop: 8 }}>
        <window.PlantingEditor floating={false} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{
            background: window.FAO.blueDark, color: 'white',
            borderRadius: 8, padding: '20px 24px'
          }}>
            <div style={{ fontSize: window.TYPE_SCALE.eyebrow, color: window.FAO.blueMid,
              fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 10 }}>
              Sequencing principle
            </div>
            <div style={{ fontSize: 26, lineHeight: 1.35, textWrap: 'pretty' }}>
              Vegetable seeds should be ordered first, followed by potato tubers, and
              one-day-old chicks scheduled last. Each commodity has a distinct planting
              or brooding window that must be respected at delivery.
            </div>
          </div>
          {[
            { name: "Vegetable seeds", body: "Active sowing months are March and April. Deliveries arriving after mid-April compress the spring window.", color: _D2.vegetableSeeds.color },
            { name: "Potato seed tubers", body: "Best planting April 10–30 in central/western regions; up to May 1–15 in colder areas.", color: _D2.potatoSeeds.color },
            { name: "Day-old chicks", body: "Delivery is preparedness-bound, not season-bound. Brooding setup must be ready on arrival day.", color: _D2.chicks.color }
          ].map((c, i) => (
            <div key={i} style={{
              background: 'white', border: `1px solid ${window.FAO.rule}`,
              borderLeft: `5px solid ${c.color}`, borderRadius: 6,
              padding: '12px 20px'
            }}>
              <div style={{ fontSize: 24, fontWeight: 600, marginBottom: 3 }}>
                {c.name}
              </div>
              <div style={{ fontSize: 22, color: window.FAO.inkSoft, lineHeight: 1.4 }}>
                {c.body}
              </div>
            </div>
          ))}
        </div>
      </div>
    </window.Slide>
  );
}

// ─── Slide: Gap to delivery — live readout ────────────────────────────────────
function SlideGapToDelivery() {
  const { windows, update } = window.usePlantingWindows();
  const items = [
    { key: 'vegetableSeeds', proc: _D2.vegetableSeeds },
    { key: 'potatoSeeds',    proc: _D2.potatoSeeds    },
    { key: 'chicks',         proc: _D2.chicks         },
  ];

  const dateInputStyle = {
    border: `1px solid ${window.FAO.rule}`, borderRadius: 4,
    padding: '4px 8px', fontSize: window.TYPE_SCALE.small,
    fontFamily: 'inherit', color: window.FAO.ink, background: 'white',
    fontFeatureSettings: '"tnum"', cursor: 'pointer', width: '100%'
  };

  return (
    <window.Slide label="15 Gap to delivery">
      <window.SlideTitle
        eyebrow="Gap analysis"
        title="Actual delivery readiness against the planting calendar."
        sub="Edit ideal end and latest acceptable dates directly — the gap updates live."
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28, marginTop: 36 }}>
        {items.map(({ key, proc }) => {
          const w = windows[key];
          const actualEnd = proc.steps[proc.steps.length - 1].date;
          const gapLatest = window.daysBetween(w.latestAcceptable, actualEnd);
          const gapIdeal = window.daysBetween(w.idealEnd, actualEnd);
          const past = gapLatest > 0;
          const color = past ? window.FAO.alert : (gapIdeal > 0 ? window.FAO.warn : window.FAO.green);
          return (
            <div key={key} style={{
              background: 'white', border: `1px solid ${window.FAO.rule}`,
              borderTop: `8px solid ${proc.color}`, borderRadius: 8,
              padding: 32, display: 'flex', flexDirection: 'column', gap: 18
            }}>
              <div style={{ fontSize: window.TYPE_SCALE.body, fontWeight: 600, lineHeight: 1.2 }}>
                {proc.name}
              </div>
              <div>
                <div style={{ fontSize: window.TYPE_SCALE.micro, color: window.FAO.inkSoft, marginBottom: 4,
                  textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
                  Actual readiness
                </div>
                <div style={{ fontSize: 36, fontWeight: 600, color: window.FAO.ink, fontFeatureSettings: '"tnum"' }}>
                  {window.fmtDate(actualEnd)}
                </div>
              </div>
              <div style={{ borderTop: `1px solid ${window.FAO.ruleSoft}`, paddingTop: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span style={{ fontSize: window.TYPE_SCALE.micro, color: window.FAO.inkSoft,
                    textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
                    Ideal end
                  </span>
                  <input type="date" value={w.idealEnd}
                    onChange={e => update(key, 'idealEnd', e.target.value)}
                    style={dateInputStyle} />
                </label>
                <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span style={{ fontSize: window.TYPE_SCALE.micro, color: window.FAO.inkSoft,
                    textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
                    Latest acceptable
                  </span>
                  <input type="date" value={w.latestAcceptable}
                    onChange={e => update(key, 'latestAcceptable', e.target.value)}
                    style={dateInputStyle} />
                </label>
              </div>
              <div style={{
                marginTop: 'auto', padding: '16px 20px',
                background: color + '15', borderRadius: 6,
                borderLeft: `4px solid ${color}`
              }}>
                <div style={{ fontSize: window.TYPE_SCALE.micro, color: window.FAO.inkSoft, marginBottom: 4 }}>
                  vs. latest acceptable
                </div>
                <div style={{ fontSize: 48, fontWeight: 600, color, fontFeatureSettings: '"tnum"', lineHeight: 1 }}>
                  {gapLatest > 0 ? `+${gapLatest}d` : `${gapLatest}d`}
                </div>
                <div style={{ fontSize: window.TYPE_SCALE.small, color, fontWeight: 600, marginTop: 6 }}>
                  {gapLatest > 0 ? "Past the season cutoff" : (gapIdeal > 0 ? `${gapIdeal}d past ideal` : "Within window")}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </window.Slide>
  );
}

// ─── Slide: Common patterns ───────────────────────────────────────────────────
function SlidePatterns() {
  const patterns = [
    { num: "01", title: "Multi-cycle TS reviews", body: "Three feedback rounds across Programme and Procurement before NSP review even started. Each loop added 1–6 weeks." },
    { num: "02", title: "Late-stage TE issues", body: "Authenticity of seed certificates and ITB-vs-cleared TE divergence surfaced after solicitation, forcing re-evaluation." },
    { num: "03", title: "Evaluation criteria interpretation", body: "Misalignment on whether administrative criteria carry technical content delayed chicks evaluation by months." },
    { num: "04", title: "PR rework loops", body: "PR resubmitted multiple times in GRMS; reviewed and assigned in parallel rather than sequentially settled." },
  ];
  return (
    <window.Slide label="16 Common patterns">
      <window.SlideTitle
        eyebrow="Root-cause analysis"
        title="Four recurring patterns observed across the three procurements."
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18, marginTop: 24 }}>
        {patterns.map((p, i) => (
          <div key={i} style={{
            background: 'white', border: `1px solid ${window.FAO.rule}`, borderRadius: 8,
            padding: 26, display: 'flex', flexDirection: 'column', gap: 14
          }}>
            <div style={{
              fontSize: 44, fontWeight: 600, color: window.FAO.blue,
              fontFeatureSettings: '"tnum"', lineHeight: 1
            }}>{p.num}</div>
            <div style={{ fontSize: window.TYPE_SCALE.body, fontWeight: 600, lineHeight: 1.2, color: window.FAO.ink }}>
              {p.title}
            </div>
            <div style={{ fontSize: window.TYPE_SCALE.small, color: window.FAO.inkSoft, lineHeight: 1.4, textWrap: 'pretty' }}>
              {p.body}
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 28, padding: '20px 26px', background: window.FAO.paperWarm, borderRadius: 6 }}>
        <div style={{ fontSize: 22, color: window.FAO.inkSoft, fontWeight: 600,
          letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>
          What unites them
        </div>
        <div style={{ fontSize: 26, color: window.FAO.ink, lineHeight: 1.35, textWrap: 'pretty' }}>
          The common factor is the handoff: each pattern reflects a point where two
          functions required a shared understanding that had not been established
          in advance.
        </div>
      </div>
    </window.Slide>
  );
}

// ─── Slide: Lessons learned (live-editable in tweaks) ─────────────────────────
function SlideLessons() {
  // Computed top stage from current data
  const ranked = [];
  for (const k of Object.keys(_D2)) {
    for (const s of _D2[k].stages) ranked.push({ ...s, procName: _D2[k].name });
  }
  ranked.sort((a, b) => b.days - a.days);
  const topStage = ranked[0];
  const topProc = topStage.procName;

  const [lessons, setLessons] = u1(() => {
    try {
      const saved = localStorage.getItem('fao_lessons_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [
      `${topStage.stage} consumed the most days (${topStage.days} on ${topProc}). Tighten clearance protocol up front.`,
      "Run NSP review and TS finalisation in parallel, not in sequence.",
      "Lock evaluation criteria before solicitation issuance — and clarify admin-vs-technical scope with evaluators.",
      "Treat the planting calendar as the procurement deadline, not as context.",
    ];
  });
  e1(() => {
    localStorage.setItem('fao_lessons_v1', JSON.stringify(lessons));
  }, [lessons]);

  function update(i, v) { setLessons(L => L.map((x, j) => j === i ? v : x)); }
  function add() { setLessons(L => [...L, "New lesson — click to edit"]); }
  function remove(i) { setLessons(L => L.filter((_, j) => j !== i)); }

  return (
    <window.Slide label="17 Lessons learned">
      <window.SlideTitle
        eyebrow="Lessons learned"
        title="Findings to be consolidated in this meeting."
        sub="Each item is editable. The first lesson is auto-proposed based on the longest stage observed in the data and may be revised."
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 16 }}>
        {lessons.map((l, i) => (
          <div key={i} style={{
            background: 'white', border: `1px solid ${window.FAO.rule}`,
            borderRadius: 8, padding: '18px 24px',
            display: 'grid', gridTemplateColumns: '60px 1fr 40px',
            alignItems: 'center', gap: 18
          }}>
            <div style={{
              fontSize: 36, fontWeight: 600, color: window.FAO.blueDark,
              fontFeatureSettings: '"tnum"', textAlign: 'center'
            }}>{String(i + 1).padStart(2, '0')}</div>
            <textarea value={l} onChange={(e) => update(i, e.target.value)}
              style={{
                fontSize: window.TYPE_SCALE.small, color: window.FAO.ink,
                lineHeight: 1.4, fontFamily: 'inherit', border: 'none', outline: 'none',
                width: '100%', resize: 'none', background: 'transparent',
                padding: 0, minHeight: 50
              }}
              rows={2}
            />
            <button onClick={() => remove(i)} style={{
              border: 'none', background: 'transparent', color: window.FAO.inkSoft,
              fontSize: 22, cursor: 'pointer'
            }}>×</button>
          </div>
        ))}
        <button onClick={add} style={{
          border: `2px dashed ${window.FAO.rule}`, background: 'transparent',
          padding: 18, borderRadius: 8, cursor: 'pointer',
          fontSize: window.TYPE_SCALE.small, color: window.FAO.inkSoft,
          fontFamily: 'inherit', fontWeight: 500
        }}>+ Add a lesson</button>
      </div>
    </window.Slide>
  );
}

// ─── Slide: Recommendations ───────────────────────────────────────────────────
const REC_DEFAULTS = [
  { phase: "Before the next preparedness cycle starts", items: [
    "Issue a calendar-anchored procurement plan, working backwards from each commodity's planting / brooding window.",
    "Pre-clear standard TS and inspection protocols for the recurring commodities so each cycle starts from a cleared baseline.",
    "Issue a country-level expression of interest to survey the Ukrainian market for best suppliers in specific categories and establish a list of pre-qualified vendors.",
  ]},
  { phase: "During pre-solicitation", items: [
    "Cap Programme ↔ Procurement TS feedback at two rounds before escalation.",
    "Lock evaluation criteria with the evaluator before issuance; explicitly classify each criterion (admin / technical).",
  ]},
  { phase: "During evaluation & contracting", items: [
    "Request seed certificates only for the lots the company is planning to supply, and verify them for authenticity at offer-receipt.",
    "Standing LPC slot for emergency-preparedness POs to avoid scheduling delays.",
  ]},
];

function SlideRecommendations() {
  const [recs, setRecs] = u1(() => {
    try {
      const saved = localStorage.getItem('fao_recs_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return REC_DEFAULTS;
  });
  e1(() => { localStorage.setItem('fao_recs_v1', JSON.stringify(recs)); }, [recs]);

  function updatePhase(i, v) {
    setRecs(R => R.map((r, ri) => ri === i ? { ...r, phase: v } : r));
  }
  function updateItem(i, j, v) {
    setRecs(R => R.map((r, ri) => ri === i
      ? { ...r, items: r.items.map((it, ji) => ji === j ? v : it) }
      : r));
  }
  function addItem(i) {
    setRecs(R => R.map((r, ri) => ri === i ? { ...r, items: [...r.items, "New recommendation — click to edit"] } : r));
  }
  function removeItem(i, j) {
    setRecs(R => R.map((r, ri) => ri === i ? { ...r, items: r.items.filter((_, ji) => ji !== j) } : r));
  }
  function addPhase() {
    setRecs(R => [...R, { phase: "New phase — click to edit", items: ["New recommendation — click to edit"] }]);
  }
  function removePhase(i) {
    setRecs(R => R.filter((_, ri) => ri !== i));
  }
  function reset() { setRecs(REC_DEFAULTS); }

  return (
    <window.Slide label="18 Recommendations">
      <window.SlideTitle
        eyebrow="Recommendations"
        title="Proposed adjustments for the next preparedness cycle."
        sub="Each item is editable. Changes are stored locally."
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 12 }}>
        {recs.map((r, i) => (
          <div key={i} style={{
            background: 'white', border: `1px solid ${window.FAO.rule}`, borderRadius: 8,
            padding: '20px 28px', display: 'grid',
            gridTemplateColumns: '300px 1fr', gap: 24
          }}>
            <div style={{ borderRight: `1px solid ${window.FAO.ruleSoft}`, paddingRight: 20, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 10 }}>
              <textarea value={r.phase} onChange={e => updatePhase(i, e.target.value)}
                rows={2} style={{
                  fontSize: window.TYPE_SCALE.small, color: window.FAO.blueDark,
                  fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em',
                  fontFamily: 'inherit', border: 'none', outline: 'none',
                  resize: 'none', background: 'transparent', width: '100%', padding: 0
                }} />
              <button onClick={() => removePhase(i)} style={{
                border: 'none', background: 'transparent', color: window.FAO.inkSoft,
                fontSize: 12, cursor: 'pointer', textAlign: 'left', padding: 0
              }}>Remove phase</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {r.items.map((it, j) => (
                <div key={j} style={{ display: 'grid', gridTemplateColumns: '1fr 32px', alignItems: 'start', gap: 8 }}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <span style={{ marginTop: 12, width: 12, height: 2, background: window.FAO.blue, flexShrink: 0, display: 'inline-block' }} />
                    <textarea value={it} onChange={e => updateItem(i, j, e.target.value)}
                      rows={2} style={{
                        fontSize: window.TYPE_SCALE.small, color: window.FAO.ink,
                        lineHeight: 1.4, fontFamily: 'inherit', border: 'none', outline: 'none',
                        resize: 'none', background: 'transparent', width: '100%', padding: 0
                      }} />
                  </div>
                  <button onClick={() => removeItem(i, j)} style={{
                    border: 'none', background: 'transparent', color: window.FAO.inkSoft,
                    fontSize: 20, cursor: 'pointer', marginTop: 2
                  }}>×</button>
                </div>
              ))}
              <button onClick={() => addItem(i)} style={{
                border: `1px dashed ${window.FAO.rule}`, background: 'transparent',
                padding: '6px 14px', borderRadius: 6, cursor: 'pointer',
                fontSize: 13, color: window.FAO.inkSoft, fontFamily: 'inherit', marginTop: 4
              }}>+ Add item</button>
            </div>
          </div>
        ))}
        <div style={{ display: 'flex', gap: 12 }}>
          <button onClick={addPhase} style={{
            border: `2px dashed ${window.FAO.rule}`, background: 'transparent',
            padding: '14px 24px', borderRadius: 8, cursor: 'pointer',
            fontSize: window.TYPE_SCALE.small, color: window.FAO.inkSoft,
            fontFamily: 'inherit', fontWeight: 500
          }}>+ Add phase</button>
          <button onClick={reset} style={{
            border: `1px solid ${window.FAO.rule}`, background: 'white',
            padding: '14px 24px', borderRadius: 8, cursor: 'pointer',
            fontSize: window.TYPE_SCALE.small, color: window.FAO.inkSoft,
            fontFamily: 'inherit'
          }}>Reset to defaults</button>
        </div>
      </div>
    </window.Slide>
  );
}

// ─── Slide: Closing / discussion ──────────────────────────────────────────────
function SlideClosing() {
  return (
    <window.Slide label="19 Discussion" bg={window.FAO.blueDeep} padded={false} footer={false}>
      <div style={{
        padding: `${window.SPACING.paddingTop}px ${window.SPACING.paddingX}px`,
        height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center',
        color: 'white', fontFamily: '"Inter", "Helvetica Neue", Helvetica, Arial, sans-serif',
        position: 'relative'
      }}>
        <div style={{
          fontSize: window.TYPE_SCALE.eyebrow, color: window.FAO.blueMid,
          fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 24
        }}>Open discussion</div>
        <div style={{
          fontSize: 80, fontWeight: 600, lineHeight: 1.05, letterSpacing: '-0.02em',
          maxWidth: 1500, marginBottom: 48
        }}>
          Discussion and<br/>
          <span style={{ color: window.FAO.blueMid }}>next steps.</span>
        </div>
      </div>
    </window.Slide>
  );
}

Object.assign(window, {
  StepListSlide, SlideHeatmap, SlideTopConsumers, SlidePlantingCalendar,
  SlideGapToDelivery, SlidePatterns, SlideLessons, SlideRecommendations, SlideClosing
});
