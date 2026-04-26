// Components for FAO Lessons Learned deck
// Loaded after React + Babel + data.js

const { useState, useEffect, useMemo, useRef } = React;

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const TYPE_SCALE = { eyebrow: 24, title: 64, subtitle: 44, body: 32, small: 26, micro: 22 };
const SPACING = { paddingTop: 100, paddingBottom: 120, paddingX: 110, titleGap: 52, itemGap: 28 };
const FAO = {
  blue:        "#1F6FB8",
  blueDark:    "#0B3D91",
  blueDeep:    "#08306B",
  blueLight:   "#E5EFF8",
  blueMid:     "#5BA8E0",
  ink:         "#0E1B2C",
  inkSoft:     "#3A4A5E",
  paper:       "#FBFCFE",
  paperWarm:   "#F4F1EA",
  rule:        "#D5DEE8",
  ruleSoft:    "#EAEFF5",
  warn:        "#C77F18",
  warnDeep:    "#8E5A0E",
  alert:       "#B23A2C",
  green:       "#3D8B3D",
};

// ─── SLIDE FRAME ──────────────────────────────────────────────────────────────
function Slide({ children, label, bg = FAO.paper, padded = true, footer = true, style = {} }) {
  return (
    <section data-label={label} style={{
      width: '100%', height: '100%',
      background: bg,
      color: FAO.ink,
      fontFamily: '"Inter", "Helvetica Neue", Helvetica, Arial, sans-serif',
      display: 'flex', flexDirection: 'column',
      padding: padded
        ? `${SPACING.paddingTop}px ${SPACING.paddingX}px ${SPACING.paddingBottom}px`
        : 0,
      position: 'relative',
      overflow: 'hidden',
      ...style
    }}>
      {children}
      {footer && <SlideFooter />}
    </section>
  );
}

function SlideFooter() {
  return (
    <div style={{
      position: 'absolute', left: SPACING.paddingX, right: SPACING.paddingX, bottom: 36,
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      fontSize: 15, color: FAO.inkSoft, letterSpacing: '0.06em',
      textTransform: 'uppercase', fontWeight: 500
    }}>
      <span>FAO Ukraine · Emergency Preparedness</span>
      <span>Lessons Learned · Apr 2026</span>
    </div>
  );
}

// ─── TITLE BLOCK ──────────────────────────────────────────────────────────────
function SlideTitle({ eyebrow, title, sub, accent = FAO.blue, compact = false }) {
  return (
    <div style={{ marginBottom: compact ? 20 : SPACING.titleGap }}>
      {eyebrow && (
        <div style={{
          fontSize: TYPE_SCALE.eyebrow, color: accent, fontWeight: 600,
          letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 10
        }}>{eyebrow}</div>
      )}
      <h1 style={{
        fontSize: compact ? TYPE_SCALE.subtitle : TYPE_SCALE.title, fontWeight: 600, lineHeight: 1.05,
        margin: 0, color: FAO.ink, letterSpacing: '-0.015em', textWrap: 'pretty'
      }}>{title}</h1>
      {sub && (
        <p style={{
          fontSize: compact ? TYPE_SCALE.small : TYPE_SCALE.body, color: FAO.inkSoft,
          marginTop: compact ? 10 : 22, marginBottom: 0,
          lineHeight: 1.4, maxWidth: 1500, textWrap: 'pretty'
        }}>{sub}</p>
      )}
    </div>
  );
}

// ─── SHARED STATE FOR PLANTING WINDOWS (live editable) ────────────────────────
const STORAGE_KEY = 'fao_planting_windows_v1';
function usePlantingWindows() {
  const [windows, setWindows] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return JSON.parse(JSON.stringify(window.DEFAULT_WINDOWS));
  });
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(windows));
    // broadcast to other instances
    window.dispatchEvent(new CustomEvent('planting-windows-changed'));
  }, [windows]);
  useEffect(() => {
    const handler = () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) setWindows(JSON.parse(saved));
      } catch (e) {}
    };
    window.addEventListener('planting-windows-changed', handler);
    window.addEventListener('storage', handler);
    return () => {
      window.removeEventListener('planting-windows-changed', handler);
      window.removeEventListener('storage', handler);
    };
  }, []);
  const update = (key, field, value) => {
    setWindows(w => ({ ...w, [key]: { ...w[key], [field]: value } }));
  };
  const reset = () => setWindows(JSON.parse(JSON.stringify(window.DEFAULT_WINDOWS)));
  return { windows, update, reset };
}

// ─── GANTT BAR ────────────────────────────────────────────────────────────────
function GanttBar({ procurement, axisStart, axisEnd, height = 48, showLabels = true, plantingWindow = null, highlightStage = null, projectStart = null, onStageClick = null, extraMarkers = [] }) {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const totalMs = window.parseISO(axisEnd) - window.parseISO(axisStart);
  const pct = (iso) => ((window.parseISO(iso) - window.parseISO(axisStart)) / totalMs) * 100;
  const stageStart = (stage) => stage.steps[0].date;
  const stageEnd = (stage) => stage.steps[stage.steps.length - 1].date;

  return (
    <div style={{ position: 'relative', width: '100%', height, background: FAO.ruleSoft, borderRadius: 6 }}>
      {/* Planting window overlay */}
      {plantingWindow && (
        <>
          <div style={{
            position: 'absolute',
            left: `${pct(plantingWindow.idealStart)}%`,
            width: `${pct(plantingWindow.idealEnd) - pct(plantingWindow.idealStart)}%`,
            top: -8, bottom: -8,
            background: 'rgba(61, 139, 61, 0.12)',
            border: `2px solid ${FAO.green}`,
            borderRadius: 4,
            pointerEvents: 'none'
          }} />
          <div style={{
            position: 'absolute',
            left: `calc(${pct(plantingWindow.latestAcceptable)}% - 1px)`,
            top: -12, bottom: -12,
            width: 2,
            background: FAO.alert,
            pointerEvents: 'none'
          }} />
        </>
      )}
      {/* Project start marker */}
      {projectStart && (
        <div style={{
          position: 'absolute',
          left: `calc(${pct(projectStart)}% - 1px)`,
          top: -16, bottom: -16,
          width: 2,
          borderLeft: `2px dashed ${FAO.ink}`,
          pointerEvents: 'none'
        }} />
      )}
      {/* Extra date markers (secondary project starts, etc.) */}
      {extraMarkers.map((m, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: `calc(${pct(m.date)}% - 1px)`,
          top: -14, bottom: -14,
          width: 0,
          borderLeft: `2px dashed ${m.color || FAO.blueMid}`,
          pointerEvents: 'none', zIndex: 3
        }}>
          {m.label && (
            <div style={{
              position: 'absolute', top: '100%', marginTop: 4,
              transform: 'translateX(-50%)',
              fontSize: 18, color: m.color || FAO.blueMid,
              fontWeight: 600, whiteSpace: 'nowrap',
              background: FAO.paper, padding: '1px 5px', borderRadius: 3
            }}>{m.label}</div>
          )}
        </div>
      ))}
      {/* Stage segments */}
      {procurement.stages.map((stage, i) => {
        const sStart = stageStart(stage);
        const nextStage = procurement.stages[i + 1];
        const sEnd = nextStage ? nextStage.steps[0].date : stageEnd(stage);
        const left = pct(sStart);
        const width = pct(sEnd) - left;
        if (width <= 0) return null;
        const color = window.STAGE_COLORS[stage.stage] || FAO.blue;
        const isHighlight = highlightStage && stage.stage === highlightStage;
        const isHovered = hoveredIdx === i;
        return (
          <div key={i}
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
            onClick={() => onStageClick && onStageClick(stage, procurement)}
            style={{
              position: 'absolute', left: `${left}%`, width: `${width}%`,
              top: 0, height: '100%',
              background: color,
              opacity: highlightStage && !isHighlight ? 0.3 : 1,
              borderRight: i < procurement.stages.length - 1 ? `1px solid rgba(255,255,255,0.6)` : 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontSize: TYPE_SCALE.micro, fontWeight: 600,
              overflow: 'hidden',
              cursor: onStageClick ? 'pointer' : 'default',
              filter: isHovered ? 'brightness(1.18)' : 'none',
              transition: 'opacity 0.3s, filter 0.12s',
              zIndex: isHovered ? 2 : 1
            }}>
            {showLabels && width > 4 && (
              <span style={{ padding: '0 8px', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                {stage.stage}
              </span>
            )}
          </div>
        );
      })}
      {/* Hover tooltip — rendered as sibling so it escapes segment overflow:hidden */}
      {hoveredIdx !== null && (() => {
        const stage = procurement.stages[hoveredIdx];
        if (!stage) return null;
        const sStart = stageStart(stage);
        const nextStage = procurement.stages[hoveredIdx + 1];
        const sEnd = nextStage ? nextStage.steps[0].date : stageEnd(stage);
        const left = pct(sStart);
        const width = pct(sEnd) - left;
        const centerPct = Math.min(Math.max(left + width / 2, 12), 82);
        return (
          <div style={{
            position: 'absolute',
            left: `${centerPct}%`,
            bottom: '100%',
            transform: 'translateX(-50%)',
            marginBottom: 10,
            background: FAO.ink, color: 'white',
            padding: '7px 16px', borderRadius: 7,
            fontSize: TYPE_SCALE.micro,
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            zIndex: 100,
            boxShadow: '0 4px 18px rgba(0,0,0,0.28)',
            lineHeight: 1.5
          }}>
            <strong>{stage.stage}</strong>
            <span style={{ opacity: 0.7, marginLeft: 10 }}>{stage.workingDays} working days</span>
            {onStageClick && <span style={{ opacity: 0.45, marginLeft: 10, fontSize: TYPE_SCALE.micro - 2 }}>click for steps</span>}
          </div>
        );
      })()}
    </div>
  );
}

// ─── STAGE DETAIL PANEL ───────────────────────────────────────────────────────
// Right-side drawer showing all steps for a clicked stage segment.
function StagePanel({ stage, procurement, onClose, note = null }) {
  useEffect(() => {
    const h = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, []);

  const color = window.STAGE_COLORS[stage.stage] || FAO.blue;

  return (
    <div style={{
      position: 'absolute', right: 0, top: 0, bottom: 0,
      width: 560,
      background: FAO.paper,
      borderLeft: `4px solid ${color}`,
      boxShadow: '-16px 0 56px rgba(8,48,107,0.18)',
      display: 'flex', flexDirection: 'column',
      zIndex: 20,
      fontFamily: '"Inter", "Helvetica Neue", Helvetica, Arial, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        padding: '24px 24px 18px',
        borderBottom: `1px solid ${FAO.rule}`,
        background: 'white', flexShrink: 0
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
          <div>
            <div style={{ fontSize: 18, color: color, fontWeight: 700, letterSpacing: '0.13em', textTransform: 'uppercase', marginBottom: 6 }}>
              {procurement.name}
            </div>
            <div style={{ fontSize: TYPE_SCALE.small, fontWeight: 700, color: FAO.ink, marginBottom: 5 }}>
              {stage.stage}
            </div>
            <div style={{ fontSize: 20, color: FAO.inkSoft }}>
              {window.fmtDate(stage.start)} → {window.fmtDate(stage.end)} · <strong style={{ color: FAO.ink }}>{stage.workingDays} working days</strong>
            </div>
            {note && (
              <div style={{ marginTop: 6, fontSize: 18, color: FAO.warn, fontStyle: 'italic' }}>{note}</div>
            )}
          </div>
          <button onClick={onClose} style={{
            border: 'none', background: FAO.blueLight,
            width: 34, height: 34, borderRadius: 999,
            cursor: 'pointer', fontSize: 20, color: FAO.blueDark, fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
          }}>×</button>
        </div>
      </div>
      {/* Steps list */}
      <div style={{ flex: 1, overflow: 'auto', padding: '12px 24px 28px' }}>
        {stage.steps.map((step, i) => (
          <div key={i} style={{
            padding: '11px 0',
            borderBottom: i < stage.steps.length - 1 ? `1px solid ${FAO.ruleSoft}` : 'none',
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <div style={{
                width: 26, height: 26, borderRadius: 999, flexShrink: 0,
                background: step.flag ? FAO.alert + '18' : FAO.blueLight,
                color: step.flag ? FAO.alert : FAO.blue,
                fontSize: 15, fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>{i + 1}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 20, fontWeight: 600, color: FAO.ink, lineHeight: 1.35, marginBottom: 4 }}>
                  {step.desc}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, fontSize: 18, alignItems: 'center' }}>
                  <span style={{ color: FAO.inkSoft }}>{window.fmtDate(step.date)}</span>
                  <span style={{ color: FAO.rule }}>·</span>
                  <span style={{ color: color, fontWeight: 600 }}>{step.actor}</span>
                  {step.workingLead > 0 && (
                    <>
                      <span style={{ color: FAO.rule }}>·</span>
                      <span style={{
                        color: step.flag ? FAO.alert : FAO.inkSoft,
                        fontWeight: step.flag ? 700 : 400
                      }}>
                        {step.workingLead} wd{step.flag ? ' ⚑' : ''}
                      </span>
                    </>
                  )}
                </div>
                {step.note && (
                  <div style={{
                    marginTop: 6, fontSize: 18, color: FAO.inkSoft, fontStyle: 'italic',
                    lineHeight: 1.4, padding: '5px 10px',
                    background: FAO.ruleSoft, borderRadius: 4
                  }}>{step.note}</div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ padding: '10px 24px', borderTop: `1px solid ${FAO.ruleSoft}`, fontSize: 18, color: FAO.inkSoft, background: 'white', flexShrink: 0 }}>
        Press <kbd style={{ background: FAO.blueLight, padding: '2px 6px', borderRadius: 3, fontSize: 16, color: FAO.blueDark }}>Esc</kbd> or click × to close
      </div>
    </div>
  );
}

// ─── MONTH AXIS ───────────────────────────────────────────────────────────────
function MonthAxis({ axisStart, axisEnd, height = 28 }) {
  const ticks = useMemo(() => {
    const start = window.parseISO(axisStart);
    const end = window.parseISO(axisEnd);
    const totalMs = end - start;
    const out = [];
    let d = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), 1));
    if (d < start) d = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 1));
    while (d <= end) {
      const pct = ((d - start) / totalMs) * 100;
      const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
      out.push({
        pct,
        label: `${months[d.getUTCMonth()]} ${String(d.getUTCFullYear()).slice(2)}`
      });
      d = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 1));
    }
    return out;
  }, [axisStart, axisEnd]);

  return (
    <div style={{ position: 'relative', width: '100%', height, color: FAO.inkSoft, fontSize: TYPE_SCALE.micro }}>
      {ticks.map((t, i) => (
        <div key={i} style={{ position: 'absolute', left: `${t.pct}%`, top: 0, transform: 'translateX(-50%)' }}>
          <div style={{ width: 1, height: 8, background: FAO.rule, margin: '0 auto' }} />
          <div style={{ marginTop: 4, fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{t.label}</div>
        </div>
      ))}
    </div>
  );
}

// ─── STAGE LEGEND ─────────────────────────────────────────────────────────────
function StageLegend({ stages }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'center' }}>
      {stages.map((s) => (
        <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 16, height: 16, background: window.STAGE_COLORS[s], borderRadius: 3 }} />
          <span style={{ fontSize: TYPE_SCALE.small, color: FAO.ink }}>{s}</span>
        </div>
      ))}
    </div>
  );
}

// ─── STEP-BY-STEP LIST ────────────────────────────────────────────────────────
function StepList({ steps, maxLeadHighlight = 30, compact = false }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {steps.map((step, i) => {
        const flagged = step.flag || step.lead >= maxLeadHighlight;
        return (
          <div key={i} style={{
            display: 'grid',
            gridTemplateColumns: '140px 1fr 90px 90px 220px',
            alignItems: 'center', gap: 16,
            padding: compact ? '10px 0' : '14px 0',
            borderBottom: `1px solid ${FAO.ruleSoft}`,
            fontSize: compact ? TYPE_SCALE.micro : TYPE_SCALE.small,
          }}>
            <div style={{ color: FAO.inkSoft, fontFeatureSettings: '"tnum"', fontWeight: 500 }}>
              {window.fmtDate(step.date)}
            </div>
            <div style={{ color: flagged ? FAO.warnDeep : FAO.ink, fontWeight: flagged ? 600 : 400 }}>
              {step.desc}
              {step.note && (
                <div style={{ fontSize: TYPE_SCALE.micro, color: FAO.inkSoft, marginTop: 4, fontStyle: 'italic' }}>
                  {step.note}
                </div>
              )}
            </div>
            <div style={{
              fontFeatureSettings: '"tnum"', fontWeight: 600, textAlign: 'right',
              color: flagged ? 'white' : FAO.inkSoft,
              background: flagged ? FAO.warn : 'transparent',
              padding: flagged ? '4px 10px' : '4px 0',
              borderRadius: 4
            }}>
              +{step.workingLead}w
            </div>
            <div style={{
              fontFeatureSettings: '"tnum"', fontWeight: 500, textAlign: 'right',
              color: FAO.inkSoft, fontSize: TYPE_SCALE.micro
            }}>
              ({step.lead} cal)
            </div>
            <div style={{
              fontSize: TYPE_SCALE.micro, color: FAO.inkSoft,
              padding: '3px 10px', background: FAO.blueLight,
              borderRadius: 4, justifySelf: 'start',
              border: `1px solid ${FAO.rule}`
            }}>
              {step.actor}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── STAGE BAR CHART (horizontal) ─────────────────────────────────────────────
function StageBars({ stages, max }) {
  const realMax = max || Math.max(...stages.map(s => s.days));
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, width: '100%' }}>
      {stages.map((s, i) => (
        <div key={i} style={{ display: 'grid', gridTemplateColumns: '260px 1fr 130px', alignItems: 'center', gap: 16 }}>
          <div style={{ fontSize: TYPE_SCALE.small, color: FAO.ink, fontWeight: 500 }}>{s.stage}</div>
          <div style={{ position: 'relative', height: 36, background: FAO.ruleSoft, borderRadius: 4 }}>
            <div style={{
              position: 'absolute', left: 0, top: 0, bottom: 0,
              width: `${Math.max((s.days / realMax) * 100, 0.5)}%`,
              background: window.STAGE_COLORS[s.stage] || FAO.blue,
              borderRadius: 4,
              transition: 'width 0.6s ease-out'
            }} />
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: TYPE_SCALE.body, color: FAO.ink, fontWeight: 600, fontFeatureSettings: '"tnum"', lineHeight: 1 }}>
              {s.workingDays}<span style={{ fontSize: TYPE_SCALE.small, color: FAO.inkSoft, fontWeight: 500 }}>w</span>
            </div>
            <div style={{ fontSize: TYPE_SCALE.micro, color: FAO.inkSoft, fontFeatureSettings: '"tnum"', marginTop: 2 }}>
              {s.days} cal
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Export to global
Object.assign(window, {
  Slide, SlideTitle, GanttBar, StagePanel, MonthAxis, StageLegend, StepList, StageBars,
  usePlantingWindows, TYPE_SCALE, SPACING, FAO
});
