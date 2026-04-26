// Slides 1–9 of the Lessons Learned deck
// Uses globals: Slide, SlideTitle, GanttBar, MonthAxis, StageLegend, StepList, StageBars,
// usePlantingWindows, TYPE_SCALE, SPACING, FAO, PROCUREMENT_DATA

const { useState: u1, useEffect: e1, useMemo: m1 } = React;
const _D = window.PROCUREMENT_DATA;

// Common axis covers all three procurements
const GLOBAL_AXIS_START = "2025-07-15";
const GLOBAL_AXIS_END = "2026-05-20";

// ─── Slide 1: Title ───────────────────────────────────────────────────────────
function SlideCover() {
  return (
    <window.Slide label="01 Cover" bg={window.FAO.blueDeep} padded={false} footer={false}>
      <div style={{
        position: 'absolute', top: 0, right: 0, width: 720, height: '100%',
        background: `linear-gradient(135deg, transparent 0%, ${window.FAO.blue}40 60%, ${window.FAO.blue}80 100%)`,
        clipPath: 'polygon(40% 0, 100% 0, 100% 100%, 0 100%)'
      }} />
      <div style={{
        padding: `${window.SPACING.paddingTop}px ${window.SPACING.paddingX}px`,
        height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        position: 'relative', zIndex: 1, color: 'white',
        fontFamily: '"Inter", "Helvetica Neue", Helvetica, Arial, sans-serif'
      }}>
        <div>
          <div style={{
            fontSize: window.TYPE_SCALE.eyebrow, color: window.FAO.blueMid,
            fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 24
          }}>FAO Ukraine · Internal review</div>
          <h1 style={{
            fontSize: 88, fontWeight: 600, lineHeight: 1.05, margin: 0,
            letterSpacing: '-0.02em', maxWidth: 1500
          }}>
            Emergency Preparedness Procurements<br />
            <span style={{ color: window.FAO.blueMid }}>Timeline analysis and lessons learned</span>
          </h1>
          <p style={{
            fontSize: window.TYPE_SCALE.subtitle, marginTop: 36, marginBottom: 0,
            color: '#C8DCEE', maxWidth: 1300, lineHeight: 1.3, textWrap: 'pretty'
          }}>
            Vegetable seed kits · Potato seed tubers · One-day-old chicks
          </p>
        </div>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
          fontSize: window.TYPE_SCALE.small, color: '#9DB6CF', letterSpacing: '0.04em'
        }}>
          <div>
            <div style={{ color: 'white', fontSize: window.TYPE_SCALE.body, fontWeight: 600, marginBottom: 4 }}>
              Programme & Procurement review
            </div>
            <div>OSRO/UKR/047/NOR · OSRO/UKR/046/FLA · OSRO/UKR/048/JPN</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ color: 'white', fontSize: window.TYPE_SCALE.body, fontWeight: 600 }}>April 2026</div>
            <div></div>
          </div>
        </div>
      </div>
    </window.Slide>);

}

// ─── Slide 2: Why this matters ────────────────────────────────────────────────
function SlideWhy() {
  return (
    <window.Slide label="02 Why this matters">
      <window.SlideTitle
        eyebrow="Context"
        title="Procurement timelines must align with planting and brooding calendars."
        sub="All three commodities serve agronomic windows that are fixed by season. Internal lead time directly compresses the time available to beneficiaries." />
      
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32, marginTop: 40
      }}>
        {[
        { name: "Vegetable seed kits", color: _D.vegetableSeeds.color, w: "Feb–Apr", note: "Must reach farmers before spring sowing." },
        { name: "Potato seed tubers", color: _D.potatoSeeds.color, w: "Apr 10–30", note: "Soil temperature dictates the planting window." },
        { name: "One-day-old chicks", color: _D.chicks.color, w: "On readiness", note: "35–45 day broiler cycle starts on arrival day." }].
        map((c, i) =>
        <div key={i} style={{
          background: 'white', border: `1px solid ${window.FAO.rule}`,
          borderTop: `6px solid ${c.color}`, borderRadius: 8,
          padding: 36
        }}>
            <div style={{ fontSize: window.TYPE_SCALE.eyebrow, color: window.FAO.inkSoft,
            fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 14 }}>
              {c.name}
            </div>
            <div style={{ fontSize: 88, fontWeight: 600, lineHeight: 1, color: c.color, fontFeatureSettings: '"tnum"' }}>
              {c.w}
            </div>
            <div style={{ fontSize: window.TYPE_SCALE.small, color: window.FAO.ink,
            marginTop: 24, lineHeight: 1.4, textWrap: 'pretty' }}>
              {c.note}
            </div>
          </div>
        )}
      </div>
      <div style={{ marginTop: 32, padding: '20px 26px', background: window.FAO.blueLight,
        borderLeft: `6px solid ${window.FAO.blueDark}`, borderRadius: 4 }}>
        <div style={{ fontSize: 26, color: window.FAO.ink, lineHeight: 1.4, textWrap: 'pretty' }}>
          The objective of this review is to identify where time accumulated
          across the procurement cycle and to inform the design of the next
          preparedness phase. No individual attribution is included.
        </div>
      </div>
    </window.Slide>);

}

// ─── Slide 3: Methodology ─────────────────────────────────────────────────────
function SlideMethodology() {
  const items = [
  { num: "1", title: "Trace each milestone", body: "Every email, GRMS event and clearance was logged with date and actor role." },
  { num: "2", title: "Compute lead times", body: "Days between consecutive milestones — not idle vs. active distinction." },
  { num: "3", title: "Group into stages", body: "Pre-solicitation → Solicitation → Evaluation → Contracting → PSI." },
  { num: "4", title: "Compare to season", body: "Map actual delivery readiness against the planting / brooding window." }];

  return (
    <window.Slide label="03 Methodology">
      <window.SlideTitle
        eyebrow="Methodology"
        title="Milestone-level reconstruction of three procurement cycles."
        sub="Source: email threads, GRMS records and evaluation files. Lead times are reported in working days (Mon–Fri, excluding UN-Ukraine 2026 holidays) with calendar days as a secondary reference." />
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, marginTop: 30 }}>
        {items.map((it, i) =>
        <div key={i} style={{
          background: 'white', borderRadius: 8, padding: 32,
          border: `1px solid ${window.FAO.rule}`,
          display: 'flex', flexDirection: 'column', gap: 16
        }}>
            <div style={{
            fontSize: 56, fontWeight: 600, color: window.FAO.blue, lineHeight: 1,
            fontFeatureSettings: '"tnum"'
          }}>{it.num}</div>
            <div style={{ fontSize: window.TYPE_SCALE.body, fontWeight: 600, color: window.FAO.ink, lineHeight: 1.2 }}>
              {it.title}
            </div>
            <div style={{ fontSize: window.TYPE_SCALE.small, color: window.FAO.inkSoft, lineHeight: 1.4, textWrap: 'pretty' }}>
              {it.body}
            </div>
          </div>
        )}
      </div>
      <div style={{
        marginTop: 36, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24
      }}>
        {[
        { label: "Procurements analysed", value: "3" },
        { label: "Discrete milestones logged", value: _D.vegetableSeeds.steps.length + _D.potatoSeeds.steps.length + _D.chicks.steps.length },
        { label: "Months of activity covered", value: "9" }].
        map((s, i) =>
        <div key={i} style={{
          padding: '20px 28px', background: window.FAO.paperWarm, borderRadius: 6,
          display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'
        }}>
            <span style={{ fontSize: window.TYPE_SCALE.small, color: window.FAO.inkSoft }}>{s.label}</span>
            <span style={{ fontSize: 48, fontWeight: 600, color: window.FAO.blueDark, fontFeatureSettings: '"tnum"' }}>{s.value}</span>
          </div>
        )}
      </div>
    </window.Slide>);

}

// ─── Slide 4: At a glance — table ─────────────────────────────────────────────
function SlideAtGlance() {
  const rows = [
  { p: _D.vegetableSeeds, ps: "Spring sowing" },
  { p: _D.potatoSeeds, ps: "Apr planting" },
  { p: _D.chicks, ps: "Brooding-ready" }];

  return (
    <window.Slide label="04 At a glance">
      <window.SlideTitle
        eyebrow="Summary"
        title="Overview of the three procurement cycles."
        sub="Working days exclude weekends and UN-Ukraine 2026 holidays. Calendar days are shown as a secondary reference." />
      
      <div style={{
        background: 'white', borderRadius: 8, border: `1px solid ${window.FAO.rule}`,
        overflow: 'hidden', marginTop: 12
      }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '2fr 1.8fr 1fr 1fr 1fr',
          background: window.FAO.blueDark, color: 'white',
          padding: '20px 28px', fontSize: window.TYPE_SCALE.small, fontWeight: 600,
          letterSpacing: '0.06em', textTransform: 'uppercase'
        }}>
          <div>Commodity</div>
          <div>Funded projects · dates</div>
          <div>Proc. start</div>
          <div>Proc. end</div>
          <div style={{ textAlign: 'right' }}>Working / Calendar</div>
        </div>
        {rows.map(({ p, ps }, i) =>
        <div key={i} style={{
          display: 'grid', gridTemplateColumns: '2fr 1.8fr 1fr 1fr 1fr',
          padding: '24px 28px',
          borderBottom: i < rows.length - 1 ? `1px solid ${window.FAO.ruleSoft}` : 'none',
          alignItems: 'center', fontSize: window.TYPE_SCALE.body
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 14, height: 44, background: p.color, borderRadius: 3 }} />
              <div>
                <div style={{ fontWeight: 600 }}>{p.name}</div>
                <div style={{ fontSize: window.TYPE_SCALE.micro, color: window.FAO.inkSoft }}>{ps}</div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {p.projects.map(code => {
                const proj = window.PROJECT_INFO[code];
                const donor = code.split('/').pop();
                return (
                  <div key={code} style={{ display: 'flex', alignItems: 'baseline', gap: 8, fontFeatureSettings: '"tnum"' }}>
                    <span style={{ fontWeight: 700, color: p.color, fontSize: window.TYPE_SCALE.small, minWidth: 32 }}>{donor}</span>
                    <span style={{ fontSize: window.TYPE_SCALE.micro, color: window.FAO.inkSoft }}>
                      {window.fmtDateShort(proj.start)} – {window.fmtDateShort(proj.end)}
                    </span>
                  </div>
                );
              })}
            </div>
            <div style={{ fontFeatureSettings: '"tnum"', fontSize: window.TYPE_SCALE.small }}>{window.fmtDate(p.start)}</div>
            <div style={{ fontFeatureSettings: '"tnum"', fontSize: window.TYPE_SCALE.small }}>{window.fmtDate(p.end)}</div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 48, fontWeight: 600, color: window.FAO.blueDark, fontFeatureSettings: '"tnum"', lineHeight: 1 }}>{p.totalWorkingDays}<span style={{ fontSize: 22, color: window.FAO.inkSoft, fontWeight: 500 }}> / {p.totalDays}</span></div>
              <div style={{ fontSize: 14, color: window.FAO.inkSoft, marginTop: 4, letterSpacing: '0.05em', textTransform: 'uppercase' }}>wkg / cal</div>
            </div>
          </div>
        )}
      </div>
    </window.Slide>);

}

// Per-procurement secondary project start markers for slide 5 & 6
const EXTRA_MARKERS = {
  vegetableSeeds: [{ date: '2026-03-01', label: 'FLA · 1 Mar', color: '#5BA8E0' }],
  potatoSeeds:    [{ date: '2026-03-01', label: 'FLA · 1 Mar', color: '#5BA8E0' }],
  chicks:         [{ date: '2026-03-21', label: 'JPN · 21 Mar', color: '#C77F18' }],
};

// ─── Slide 5: Side-by-side Gantt ──────────────────────────────────────────────
function SlideGantt() {
  const { windows } = window.usePlantingWindows();
  const [selected, setSelected] = React.useState(null); // {stage, procurement}
  const procs = [
    { p: _D.vegetableSeeds, w: windows.vegetableSeeds, key: 'vegetableSeeds' },
    { p: _D.potatoSeeds,    w: windows.potatoSeeds,    key: 'potatoSeeds'    },
    { p: _D.chicks,         w: windows.chicks,         key: 'chicks'         },
  ];
  const stagesUsed = [...new Set([
    ..._D.vegetableSeeds.stages.map(s => s.stage),
    ..._D.potatoSeeds.stages.map(s => s.stage),
    ..._D.chicks.stages.map(s => s.stage),
  ])];

  const totalMs = window.parseISO(GLOBAL_AXIS_END) - window.parseISO(GLOBAL_AXIS_START);
  const norPct = ((window.parseISO('2025-12-08') - window.parseISO(GLOBAL_AXIS_START)) / totalMs) * 100;

  return (
    <window.Slide label="05 Side-by-side Gantt">
      <window.SlideTitle
        eyebrow="Comparative timeline"
        title="Three procurements mapped against the planting calendar."
        sub="Green band: ideal delivery window. Red line: latest acceptable date. Click any stage bar to see its steps."
        compact />

      <div style={{ marginTop: 8 }}>
        <window.MonthAxis axisStart={GLOBAL_AXIS_START} axisEnd={GLOBAL_AXIS_END} />
      </div>

      {/* Cards with shared NOR dashed line */}
      <div style={{ position: 'relative', marginTop: 20 }}>
        {/* NOR dashed line behind cards */}
        <div style={{
          position: 'absolute',
          left: `calc(${norPct}% + 0px)`,
          top: 0, bottom: 0, width: 0,
          borderLeft: `2px dashed ${window.FAO.inkSoft}`,
          pointerEvents: 'none', zIndex: 10
        }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {procs.map(({ p, w, key }) => {
            const actualEnd = p.steps[p.steps.length - 1].date;
            const gap = window.daysBetween(w.latestAcceptable, actualEnd);
            const inWindow = window.daysBetween(w.idealEnd, actualEnd);
            let badge, badgeColor;
            if (gap > 0) { badge = `+${gap}d past latest acceptable`; badgeColor = window.FAO.alert; }
            else if (inWindow > 0) { badge = `+${inWindow}d past ideal window`; badgeColor = window.FAO.warn; }
            else { badge = 'Within window'; badgeColor = window.FAO.green; }
            return (
              <div key={key} style={{
                background: 'white',
                border: `1px solid ${window.FAO.rule}`,
                borderLeft: `5px solid ${p.color}`,
                borderRadius: 8,
                padding: '16px 20px 18px 20px',
              }}>
                {/* Card header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{ fontSize: window.TYPE_SCALE.body, fontWeight: 700, color: window.FAO.ink }}>{p.name}</div>
                    <div style={{ fontSize: window.TYPE_SCALE.small, color: window.FAO.inkSoft, fontFeatureSettings: '"tnum"' }}>
                      {window.fmtDate(p.start)} → {window.fmtDate(p.end)}
                    </div>
                    <div style={{
                      fontSize: window.TYPE_SCALE.small, fontWeight: 700,
                      color: window.FAO.ink, background: window.FAO.paperWarm,
                      padding: '2px 10px', borderRadius: 4, fontFeatureSettings: '"tnum"'
                    }}>{p.totalWorkingDays} wd</div>
                  </div>
                  <div style={{
                    fontSize: window.TYPE_SCALE.small, fontWeight: 600,
                    color: badgeColor, padding: '3px 14px',
                    background: badgeColor + '15', borderRadius: 4, whiteSpace: 'nowrap'
                  }}>{badge}</div>
                </div>
                <window.GanttBar
                  procurement={p} axisStart={GLOBAL_AXIS_START} axisEnd={GLOBAL_AXIS_END}
                  height={52} plantingWindow={w} projectStart={null}
                  extraMarkers={EXTRA_MARKERS[key]}
                  onStageClick={(stage, proc) => setSelected({ stage, proc })}
                />
              </div>
            );
          })}
        </div>

        {/* NOR label at top */}
        <div style={{
          position: 'absolute',
          left: `calc(${norPct}% + 6px)`,
          top: 0,
          fontSize: window.TYPE_SCALE.micro, color: window.FAO.inkSoft,
          fontWeight: 600, whiteSpace: 'nowrap',
          background: window.FAO.paper, padding: '0 4px', borderRadius: 2,
          pointerEvents: 'none', zIndex: 11
        }}>NOR · 8 Dec</div>
      </div>

      <div style={{ marginTop: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <window.StageLegend stages={stagesUsed} />
        <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 22, height: 11, background: 'rgba(61,139,61,0.18)', border: `2px solid ${window.FAO.green}`, borderRadius: 2 }} />
            <span style={{ fontSize: window.TYPE_SCALE.small }}>Ideal window</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 3, height: 16, background: window.FAO.alert }} />
            <span style={{ fontSize: window.TYPE_SCALE.small }}>Latest acceptable</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 18, borderTop: `2px dashed ${window.FAO.inkSoft}` }} />
            <span style={{ fontSize: window.TYPE_SCALE.small }}>Project start (NOR)</span>
          </div>
        </div>
      </div>

      {selected && (
        <window.StagePanel
          stage={selected.stage}
          procurement={selected.proc}
          onClose={() => setSelected(null)}
        />
      )}
    </window.Slide>
  );
}

// ─── Slide 6: Counterfactual ──────────────────────────────────────────────────
function SlideCounterfactual() {
  const { windows } = window.usePlantingWindows();
  const [selected, setSelected] = React.useState(null);
  const procs = [
    { p: _D.vegetableSeeds, w: windows.vegetableSeeds, key: 'vegetableSeeds' },
    { p: _D.potatoSeeds,    w: windows.potatoSeeds,    key: 'potatoSeeds'    },
    { p: _D.chicks,         w: windows.chicks,         key: 'chicks'         },
  ];

  const cfAxisStart = "2025-12-01";
  const cfAxisEnd   = "2026-09-30";

  const shifted = (p) => {
    const off = p.counterfactual.offsetDays;
    const shift = (iso) => {
      const d = window.parseISO(iso);
      d.setUTCDate(d.getUTCDate() + off);
      return d.toISOString().slice(0, 10);
    };
    return {
      ...p,
      stages: p.stages.map(s => ({
        ...s,
        steps: s.steps.map(step => ({ ...step, date: shift(step.date) }))
      }))
    };
  };

  // Per-row secondary project starts in counterfactual axis
  const CF_EXTRA_MARKERS = {
    vegetableSeeds: [{ date: '2026-03-01', label: 'FLA · 1 Mar', color: '#5BA8E0' }],
    potatoSeeds:    [{ date: '2026-03-01', label: 'FLA · 1 Mar', color: '#5BA8E0' }],
    chicks:         [{ date: '2026-03-21', label: 'JPN · 21 Mar', color: '#C77F18' }],
  };

  return (
    <window.Slide label="06 Counterfactual — no preparedness">
      <window.SlideTitle
        eyebrow="What if we had waited?"
        title="If procurement had only started after project signature, none of the three would have made the planting window."
        sub={`Same duration, same effort — but each timeline shifted to begin on ${window.fmtDateShort('2025-12-08')}, the earliest funded project start. Click any stage to inspect its steps.`}
        compact
      />

      <div style={{ marginTop: 8 }}>
        <window.MonthAxis axisStart={cfAxisStart} axisEnd={cfAxisEnd} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28, marginTop: 24 }}>
        {procs.map(({ p, w, key }) => {
          const cfEnd = p.counterfactual.deliveryReady;
          const cfGap = window.daysBetween(w.latestAcceptable, cfEnd);
          const cfInWindow = window.daysBetween(w.idealEnd, cfEnd);
          let cfBadge, cfBadgeColor;
          if (cfGap > 0) { cfBadge = `+${cfGap}d late`; cfBadgeColor = window.FAO.alert; }
          else if (cfInWindow > 0) { cfBadge = `+${cfInWindow}d past ideal`; cfBadgeColor = window.FAO.warn; }
          else { cfBadge = 'Within window'; cfBadgeColor = window.FAO.green; }

          const sp = shifted(p);
          return (
            <div key={key} style={{ paddingBottom: 18 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
                  <div style={{ width: 13, height: 13, background: p.color, borderRadius: 3, alignSelf: 'center' }} />
                  <div style={{ fontSize: window.TYPE_SCALE.body, fontWeight: 600 }}>{p.name}</div>
                  <div style={{ fontSize: window.TYPE_SCALE.small, color: window.FAO.inkSoft, fontFeatureSettings: '"tnum"' }}>
                    Would have ended {window.fmtDate(cfEnd)} · still {p.totalWorkingDays} wd
                  </div>
                </div>
                <div style={{
                  fontSize: window.TYPE_SCALE.small, fontWeight: 600,
                  color: cfBadgeColor, padding: '3px 12px',
                  background: cfBadgeColor + '15', borderRadius: 4, whiteSpace: 'nowrap'
                }}>{cfBadge}</div>
              </div>
              <window.GanttBar
                procurement={sp} axisStart={cfAxisStart} axisEnd={cfAxisEnd}
                height={46} plantingWindow={w} projectStart={p.earliestStart}
                extraMarkers={CF_EXTRA_MARKERS[key]}
                onStageClick={(stage, proc) => setSelected({ stage, proc })}
              />
            </div>
          );
        })}
      </div>

      <div style={{
        marginTop: 12, padding: '12px 20px',
        background: window.FAO.alert + '10',
        borderLeft: `4px solid ${window.FAO.alert}`,
        borderRadius: 4
      }}>
        <div style={{ fontSize: window.TYPE_SCALE.eyebrow, color: window.FAO.alert, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 4 }}>
          The bottom line
        </div>
        <div style={{ fontSize: window.TYPE_SCALE.small, lineHeight: 1.4, color: window.FAO.ink, maxWidth: 1500 }}>
          The advance procurement work was not extra effort. It was the only reason any of this landed in time for the season.
        </div>
      </div>

      {selected && (
        <window.StagePanel
          stage={selected.stage}
          procurement={selected.proc}
          note="Dates shown are hypothetical — shifted to project start."
          onClose={() => setSelected(null)}
        />
      )}
    </window.Slide>
  );
}


function CommoditySlide({ procKey, label, eyebrow }) {
  const p = _D[procKey];
  const { windows } = window.usePlantingWindows();
  const w = windows[procKey];
  const actualEnd = p.steps[p.steps.length - 1].date;
  const gap = window.daysBetween(w.latestAcceptable, actualEnd);
  const inWindow = window.daysBetween(w.idealEnd, actualEnd);
  let badge, badgeColor;
  if (gap > 0) {badge = `+${gap}d past latest acceptable`;badgeColor = window.FAO.alert;} else
  if (inWindow > 0) {badge = `+${inWindow}d past ideal`;badgeColor = window.FAO.warn;} else
  {badge = "Within window";badgeColor = window.FAO.green;}

  return (
    <window.Slide label={label}>
      <window.SlideTitle
        eyebrow={eyebrow}
        title={p.name + " — " + p.totalWorkingDays + " working days (" + p.totalDays + " calendar)."}
        sub={p.project + " · From " + window.fmtDate(p.start) + " to " + window.fmtDate(p.end) + "."}
        accent={p.color} />
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 48, marginTop: 12 }}>
        <div>
          <div style={{ fontSize: window.TYPE_SCALE.eyebrow, color: window.FAO.inkSoft,
            fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 16 }}>
            Stage breakdown
          </div>
          <window.StageBars stages={p.stages} />
          <div style={{ marginTop: 28, padding: '16px 20px',
            background: badgeColor + '12', borderLeft: `4px solid ${badgeColor}`,
            borderRadius: 4
          }}>
            <div style={{ fontSize: window.TYPE_SCALE.small, color: window.FAO.inkSoft, marginBottom: 4 }}>
              vs. {w.label.toLowerCase()} window ({window.fmtDateShort(w.idealStart)} – {window.fmtDateShort(w.idealEnd)}, latest {window.fmtDateShort(w.latestAcceptable)})
            </div>
            <div style={{ fontSize: window.TYPE_SCALE.body, fontWeight: 600, color: badgeColor }}>
              {badge}
            </div>
          </div>
        </div>
        <div>
          <div style={{ fontSize: window.TYPE_SCALE.eyebrow, color: window.FAO.inkSoft,
            fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 16 }}>
            Where time accumulated
          </div>
          {(() => {
            const top = [...p.steps].filter((s) => s.lead > 0).sort((a, b) => b.lead - a.lead).slice(0, 5);
            const max = top[0].lead;
            return (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {top.map((s, i) =>
                <div key={i} style={{
                  background: 'white', border: `1px solid ${window.FAO.rule}`,
                  borderRadius: 6, padding: '14px 18px',
                  display: 'grid', gridTemplateColumns: '70px 1fr 100px',
                  alignItems: 'center', gap: 16
                }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 32, fontWeight: 600, color: window.FAO.blueDark, fontFeatureSettings: '"tnum"', lineHeight: 1 }}>{s.workingLead}w</div>
                      <div style={{ fontSize: 13, color: window.FAO.inkSoft, fontFeatureSettings: '"tnum"', marginTop: 2 }}>{s.lead} cal</div>
                    </div>
                    <div>
                      <div style={{ fontSize: window.TYPE_SCALE.small, fontWeight: 600 }}>{s.desc}</div>
                      <div style={{ fontSize: window.TYPE_SCALE.micro, color: window.FAO.inkSoft }}>
                        {s.stage} · {s.actor}
                      </div>
                    </div>
                    <div style={{
                    height: 8, background: window.FAO.ruleSoft, borderRadius: 4, position: 'relative'
                  }}>
                      <div style={{
                      position: 'absolute', inset: 0,
                      width: `${s.lead / max * 100}%`,
                      background: p.color, borderRadius: 4
                    }} />
                    </div>
                  </div>
                )}
              </div>);

          })()}
        </div>
      </div>
    </window.Slide>);

}

Object.assign(window, {
  SlideCover, SlideWhy, SlideMethodology, SlideAtGlance, SlideGantt, CommoditySlide,
  SlideCounterfactual,
  GLOBAL_AXIS_START, GLOBAL_AXIS_END
});