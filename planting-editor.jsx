// Live planting calendar editor — floating panel + readouts
const { useState: useState_p, useEffect: useEffect_p } = React;

function PlantingEditor({ floating = true, onClose }) {
  const { windows, update, reset } = window.usePlantingWindows();
  const data = window.PROCUREMENT_DATA;
  const items = [
    { key: 'vegetableSeeds', proc: data.vegetableSeeds },
    { key: 'potatoSeeds',    proc: data.potatoSeeds    },
    { key: 'chicks',         proc: data.chicks         },
  ];

  const panelStyle = floating ? {
    position: 'fixed', right: 24, bottom: 24, width: 460, zIndex: 1000,
    background: 'white', boxShadow: '0 24px 64px rgba(8, 48, 107, 0.25)',
    borderRadius: 12, border: `1px solid ${window.FAO.rule}`,
    padding: 22, fontFamily: '"Inter", "Helvetica Neue", Helvetica, Arial, sans-serif',
    color: window.FAO.ink, fontSize: 14
  } : {
    width: '100%', background: 'white',
    borderRadius: 8, border: `1px solid ${window.FAO.rule}`,
    padding: 28, fontFamily: '"Inter", "Helvetica Neue", Helvetica, Arial, sans-serif',
    color: window.FAO.ink, fontSize: 18
  };

  return (
    <div style={panelStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <div>
          <div style={{
            fontSize: floating ? 11 : 16, color: window.FAO.blue, fontWeight: 700,
            letterSpacing: '0.16em', textTransform: 'uppercase'
          }}>Planting calendar</div>
          <div style={{ fontSize: floating ? 16 : 24, fontWeight: 600, marginTop: 2 }}>
            Edit critical delivery dates
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <button onClick={reset} title="Reset to research defaults" style={{
            border: `1px solid ${window.FAO.rule}`, background: 'white',
            padding: '6px 10px', borderRadius: 6, cursor: 'pointer',
            fontSize: 12, color: window.FAO.inkSoft
          }}>Reset</button>
          {floating && onClose && (
            <button onClick={onClose} style={{
              border: 'none', background: window.FAO.blueLight,
              padding: '6px 10px', borderRadius: 6, cursor: 'pointer',
              fontSize: 14, color: window.FAO.blueDark, fontWeight: 600
            }}>×</button>
          )}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {items.map(({ key, proc }) => {
          const w = windows[key];
          const actualEnd = proc.steps[proc.steps.length - 1].date;
          const gap = window.daysBetween(w.latestAcceptable, actualEnd);
          const inWindow = window.daysBetween(w.idealEnd, actualEnd);
          let status, statusColor;
          if (gap > 0) { status = `${gap}d past latest acceptable`; statusColor = window.FAO.alert; }
          else if (inWindow > 0) { status = `${inWindow}d past ideal window`; statusColor = window.FAO.warn; }
          else { status = `Within window`; statusColor = window.FAO.green; }
          return (
            <div key={key} style={{
              border: `1px solid ${window.FAO.ruleSoft}`,
              borderRadius: 8, padding: floating ? 12 : 18,
              background: window.FAO.paper
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 14, height: 14, background: proc.color, borderRadius: 3 }} />
                  <div style={{ fontWeight: 600, fontSize: floating ? 14 : 20 }}>{proc.name}</div>
                </div>
                <div style={{
                  fontSize: floating ? 11 : 14, fontWeight: 600,
                  color: statusColor, padding: '2px 8px',
                  background: statusColor + '15', borderRadius: 4
                }}>{status}</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 8 }}>
                <DateField label="Ideal start" value={w.idealStart}
                  onChange={(v) => update(key, 'idealStart', v)} small={floating} />
                <DateField label="Ideal end" value={w.idealEnd}
                  onChange={(v) => update(key, 'idealEnd', v)} small={floating} />
                <DateField label="Latest acceptable" value={w.latestAcceptable}
                  onChange={(v) => update(key, 'latestAcceptable', v)} small={floating} />
              </div>
              <div style={{ fontSize: floating ? 11 : 14, color: window.FAO.inkSoft, fontStyle: 'italic' }}>
                Actual delivery readiness: <strong style={{ color: window.FAO.ink }}>{window.fmtDate(actualEnd)}</strong>
              </div>
            </div>
          );
        })}
      </div>
      {floating && (
        <div style={{ marginTop: 12, fontSize: 11, color: window.FAO.inkSoft, fontStyle: 'italic' }}>
          Changes propagate live to every slide. Stored locally.
        </div>
      )}
    </div>
  );
}

function DateField({ label, value, onChange, small }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <span style={{
        fontSize: small ? 10 : 12, color: window.FAO.inkSoft,
        textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600
      }}>{label}</span>
      <input type="date" value={value} onChange={(e) => onChange(e.target.value)} style={{
        border: `1px solid ${window.FAO.rule}`, borderRadius: 4,
        padding: small ? '4px 6px' : '8px 10px', fontSize: small ? 12 : 16,
        fontFamily: 'inherit', color: window.FAO.ink, background: 'white'
      }} />
    </label>
  );
}

// Floating dock that lives outside the deck-stage so it's always visible
function PlantingDock() {
  const [open, setOpen] = useState_p(false);
  return (
    <>
      {!open && (
        <button onClick={() => setOpen(true)} style={{
          position: 'fixed', right: 24, bottom: 24, zIndex: 1000,
          background: window.FAO.blueDark, color: 'white',
          border: 'none', borderRadius: 999,
          padding: '14px 22px', fontSize: 14, fontWeight: 600,
          cursor: 'pointer',
          boxShadow: '0 12px 32px rgba(8, 48, 107, 0.4)',
          fontFamily: '"Inter", "Helvetica Neue", Helvetica, Arial, sans-serif',
          letterSpacing: '0.04em', display: 'flex', alignItems: 'center', gap: 10
        }}>
          <span style={{
            display: 'inline-block', width: 7, height: 7, borderRadius: 999,
            background: window.FAO.warn
          }} />
          Edit planting dates

        </button>
      )}
      {open && <PlantingEditor floating onClose={() => setOpen(false)} />}
    </>
  );
}

Object.assign(window, { PlantingEditor, PlantingDock });
