// Procurement timeline data — extracted from analysis emergency preparedness.xlsx
// Excel serial dates decoded to ISO. Lead time = days from previous step.

window.PROJECT_INFO = {
  "OSRO/UKR/047/NOR": { start: "2025-12-08", end: "2026-12-31", donor: "Norway" },
  "OSRO/UKR/046/FLA": { start: "2026-03-01", end: "2028-02-29", donor: "Flanders" },
  "OSRO/UKR/048/JPN": { start: "2026-03-21", end: "2027-03-20", donor: "Japan" }
};

window.PROCUREMENT_DATA = {
  vegetableSeeds: {
    name: "Vegetable Seed Kits",
    project: "OSRO/UKR/047/NOR · OSRO/UKR/046/FLA",
    projects: ["OSRO/UKR/047/NOR", "OSRO/UKR/046/FLA"],
    earliestStart: "2025-12-08",
    color: "#1F6FB8", // FAO blue
    accent: "#0B3D91",
    steps: [
      { stage: "Pre-solicitation", desc: "TS received for review",                    date: "2025-07-22", lead: 0,  actor: "Programme" },
      { stage: "Pre-solicitation", desc: "1st feedback from Procurement",              date: "2025-08-06", lead: 15, actor: "Procurement" },
      { stage: "Pre-solicitation", desc: "Revised files sent to Procurement",          date: "2025-08-26", lead: 20, actor: "Programme" },
      { stage: "Pre-solicitation", desc: "2nd feedback from Procurement",              date: "2025-09-02", lead: 7,  actor: "Procurement" },
      { stage: "Pre-solicitation", desc: "Files re-sent to Procurement",               date: "2025-09-09", lead: 7,  actor: "Programme" },
      { stage: "Pre-solicitation", desc: "3rd feedback to Programme",                  date: "2025-10-20", lead: 41, actor: "Procurement", flag: true },
      { stage: "Pre-solicitation", desc: "Files re-sent to Procurement",               date: "2025-10-29", lead: 9,  actor: "Programme" },
      { stage: "Pre-solicitation", desc: "Files sent to NSP for review",               date: "2025-10-30", lead: 1,  actor: "Procurement" },
      { stage: "Pre-solicitation", desc: "Follow-up sent to NSP",                      date: "2025-11-14", lead: 15, actor: "Procurement" },
      { stage: "Pre-solicitation", desc: "First feedback from NSP",                    date: "2025-11-24", lead: 10, actor: "NSP" },
      { stage: "Pre-solicitation", desc: "PR raised & approved in GRMS (1 USD)",       date: "2025-12-15", lead: 21, actor: "Programme" },
      { stage: "Solicitation",     desc: "Solicitation issued",                        date: "2025-12-26", lead: 11, actor: "Buyer" },
      { stage: "Solicitation",     desc: "Solicitation closed",                        date: "2026-01-16", lead: 21, actor: "Buyer" },
      { stage: "Evaluation",       desc: "Technical offers shared for evaluation",     date: "2026-01-20", lead: 4,  actor: "Buyer" },
      { stage: "Evaluation",       desc: "Technical evaluation cleared (TCO)",         date: "2026-03-30", lead: 69, actor: "Technical team", flag: true,
        note: "Adjusted after first clearance (19/03) — issues found in authenticity of seed certificates" },
      { stage: "Evaluation",       desc: "Technical evaluation cleared (LTO)",         date: "2026-03-30", lead: 0,  actor: "Technical team" },
      { stage: "Evaluation",       desc: "Commercial evaluation completed",            date: "2026-04-01", lead: 2,  actor: "Buyer",
        note: "Clarifications requested for duplicated offers" },
      { stage: "Evaluation",       desc: "Pre-award inspection completed",             date: "2026-04-14", lead: 13, actor: "Baltic Control + FAO" },
      { stage: "Evaluation",       desc: "LPC meeting & endorsement",                  date: "2026-04-16", lead: 2,  actor: "LPC" },
      { stage: "Contract",         desc: "PO approved by FAO",                         date: "2026-04-20", lead: 4,  actor: "Procurement Authority" },
      { stage: "Contract",         desc: "PO countersigned by Vendor",                 date: "2026-04-21", lead: 1,  actor: "Vendor" },
      { stage: "PSI",              desc: "Inspection requested to Baltic",             date: "2026-04-21", lead: 0,  actor: "Buyer" },
      { stage: "PSI",              desc: "Offer received from Baltic",                 date: "2026-04-22", lead: 1,  actor: "Baltic Control" }
    ]
  },
  potatoSeeds: {
    name: "Potato Seed Tubers",
    project: "OSRO/UKR/047/NOR · OSRO/UKR/046/FLA",
    projects: ["OSRO/UKR/047/NOR", "OSRO/UKR/046/FLA"],
    earliestStart: "2025-12-08",
    color: "#7B4A1E",
    accent: "#5A3514",
    steps: [
      { stage: "Pre-solicitation", desc: "TS received for review",                    date: "2025-07-22", lead: 0,  actor: "Programme" },
      { stage: "Pre-solicitation", desc: "1st feedback from Procurement",              date: "2025-08-06", lead: 15, actor: "Procurement" },
      { stage: "Pre-solicitation", desc: "Revised files sent to Procurement",          date: "2025-08-26", lead: 20, actor: "Programme" },
      { stage: "Pre-solicitation", desc: "2nd feedback from Procurement",              date: "2025-09-02", lead: 7,  actor: "Procurement" },
      { stage: "Pre-solicitation", desc: "Files re-sent to Procurement",               date: "2025-09-09", lead: 7,  actor: "Programme" },
      { stage: "Pre-solicitation", desc: "3rd feedback to Programme",                  date: "2025-10-20", lead: 41, actor: "Procurement", flag: true },
      { stage: "Pre-solicitation", desc: "Files re-sent to Procurement",               date: "2025-10-29", lead: 9,  actor: "Programme" },
      { stage: "Pre-solicitation", desc: "Files sent to NSP for review",               date: "2025-10-30", lead: 1,  actor: "Procurement" },
      { stage: "Pre-solicitation", desc: "Follow-up sent to NSP",                      date: "2025-11-14", lead: 15, actor: "Procurement" },
      { stage: "Pre-solicitation", desc: "First feedback from NSP",                    date: "2025-11-24", lead: 10, actor: "NSP" },
      { stage: "Pre-solicitation", desc: "PR raised & approved in GRMS (1 USD)",       date: "2025-12-15", lead: 21, actor: "Programme" },
      { stage: "Pre-solicitation", desc: "Exchange on ITB requirements — TS cleared", date: "2026-01-05", lead: 21, actor: "Buyer + Tech + Requisitioner", flag: true,
        note: "Issue identified on TS published vs. ones cleared" },
      { stage: "Solicitation",     desc: "Solicitation issued",                        date: "2026-01-07", lead: 2,  actor: "Buyer" },
      { stage: "Solicitation",     desc: "Solicitation closed",                        date: "2026-01-28", lead: 21, actor: "Buyer" },
      { stage: "Evaluation",       desc: "Technical offers shared for evaluation",     date: "2026-01-30", lead: 2,  actor: "Buyer" },
      { stage: "Evaluation",       desc: "Technical evaluation cleared (TCO)",         date: "2026-03-27", lead: 56, actor: "Technical team", flag: true },
      { stage: "Evaluation",       desc: "Technical evaluation cleared (LTO)",         date: "2026-03-30", lead: 3,  actor: "Technical team" },
      { stage: "Evaluation",       desc: "Commercial evaluation completed",            date: "2026-04-01", lead: 2,  actor: "Buyer" },
      { stage: "Evaluation",       desc: "LPC meeting & endorsement",                  date: "2026-04-02", lead: 1,  actor: "LPC" },
      { stage: "Contract",         desc: "PO approved by FAO",                         date: "2026-04-10", lead: 8,  actor: "Procurement Authority" },
      { stage: "Contract",         desc: "PO countersigned by Vendor",                 date: "2026-04-17", lead: 7,  actor: "Vendor" },
      { stage: "PSI",              desc: "Inspection requested to Baltic",             date: "2026-04-20", lead: 3,  actor: "Buyer" },
      { stage: "PSI",              desc: "Offer received from Baltic",                 date: "2026-04-21", lead: 1,  actor: "Baltic Control" },
      { stage: "PSI",              desc: "PO issued to Baltic",                        date: "2026-04-23", lead: 2,  actor: "Buyer + Baltic" }
    ]
  },
  chicks: {
    name: "One-Day-Old Chicks",
    project: "OSRO/UKR/048/JPN · OSRO/UKR/047/NOR",
    projects: ["OSRO/UKR/048/JPN", "OSRO/UKR/047/NOR"],
    earliestStart: "2025-12-08",
    color: "#C77F18",
    accent: "#8E5A0E",
    steps: [
      { stage: "Pre-solicitation",     desc: "PR submitted in GRMS",                            date: "2025-10-21", lead: 0,  actor: "Programme" },
      { stage: "Pre-solicitation",     desc: "PR approved in GRMS",                             date: "2025-11-05", lead: 15, actor: "Programme",
        note: "PR was resubmitted multiple times until finally re-approved on 5/12 while already assigned to buyer" },
      { stage: "Pre-solicitation",     desc: "PR sent for review of Procurement Officer",        date: "2025-11-05", lead: 0,  actor: "Procurement" },
      { stage: "Pre-solicitation",     desc: "PR reviewed — comments shared",                    date: "2025-11-19", lead: 14, actor: "Procurement Officer",
        note: "Missing info on delivery locations; PR assigned anyway not to delay further" },
      { stage: "Pre-solicitation",     desc: "PR assigned to Buyer",                             date: "2025-11-19", lead: 0,  actor: "Procurement" },
      { stage: "Pre-solicitation",     desc: "TCO clearance of inspection protocol confirmed",   date: "2025-12-02", lead: 13, actor: "TCO" },
      { stage: "Pre-solicitation",     desc: "Criteria & requirements shared with focal point",  date: "2025-12-04", lead: 2,  actor: "Buyer" },
      { stage: "Pre-solicitation",     desc: "Exchanges completed on criteria & requirements",   date: "2025-12-08", lead: 4,  actor: "Buyer + Focal point" },
      { stage: "Solicitation",         desc: "Solicitation issued",                              date: "2025-12-12", lead: 4,  actor: "Buyer" },
      { stage: "Solicitation",         desc: "Solicitation closed",                              date: "2026-01-02", lead: 21, actor: "Buyer" },
      { stage: "Technical evaluation", desc: "Offers shared for technical evaluation",           date: "2026-01-07", lead: 5,  actor: "Buyer" },
      { stage: "Technical evaluation", desc: "Technical evaluation process completed",           date: "2026-04-15", lead: 98, actor: "Technical team", flag: true,
        note: "Misunderstanding on admin criteria with technical aspect; clarifications requested; one criterion waived to avoid cancellation" },
      { stage: "Award recommendation", desc: "LPC Meeting",                                      date: "2026-04-16", lead: 1,  actor: "LPC" },
      { stage: "Award recommendation", desc: "Procurement Authority endorsement of LPC",         date: "2026-04-21", lead: 5,  actor: "Procurement Authority" },
      { stage: "Contracting",          desc: "Approval of PR instructions",                      date: "2026-04-23", lead: 2,  actor: "Procurement" },
      { stage: "Contracting",          desc: "Vendor registration",                              date: "2026-04-27", lead: 4,  actor: "Vendor" },
      { stage: "Contracting",          desc: "PO issuance",                                      date: "2026-04-30", lead: 3,  actor: "Buyer" }
    ]
  }
};

// Stage palette — FAO institutional blues + warm accent for "where time accumulated"
window.STAGE_COLORS = {
  "Pre-solicitation":     "#1F6FB8",
  "Solicitation":         "#3A8DD0",
  "Evaluation":           "#5BA8E0",
  "Technical evaluation": "#5BA8E0",
  "Award recommendation": "#7CB8D9",
  "Contract":             "#0B3D91",
  "Contracting":          "#0B3D91",
  "PSI":                  "#9CC4DC"
};

// Default planting / delivery windows (from Perplexity research, editable live)
window.DEFAULT_WINDOWS = {
  vegetableSeeds: {
    label: "Spring sowing",
    idealStart: "2026-02-15",
    idealEnd:   "2026-04-15",
    latestAcceptable: "2026-04-30",
    note: "Seeds must reach farmers before March–April field start. February–April is the urgent window."
  },
  potatoSeeds: {
    label: "Potato planting",
    idealStart: "2026-03-25",
    idealEnd:   "2026-04-30",
    latestAcceptable: "2026-05-15",
    note: "Best planting April 10–30 for most regions; up to May 1–15 in colder/northern areas."
  },
  chicks: {
    label: "Brooding readiness",
    idealStart: "2026-03-15",
    idealEnd:   "2026-05-15",
    latestAcceptable: "2026-06-01",
    note: "Chicks must arrive only when housing, heat, feed, water, biosecurity are ready. 35–45 day broiler cycle."
  }
};

// Helpers
window.parseISO = (s) => { const [y,m,d] = s.split('-').map(Number); return new Date(Date.UTC(y, m-1, d)); };
window.daysBetween = (a, b) => Math.round((window.parseISO(b) - window.parseISO(a)) / 86400000);

// UN-Ukraine 2026 holidays + relevant 2025 holidays
window.UN_HOLIDAYS = new Set([
  // 2025 (covers procurement period)
  "2025-08-24", // Independence Day
  "2025-10-01", // Defender of Ukraine Day (observed Wed)
  "2025-12-25", // Christmas
  // 2026
  "2026-01-01", // New Year
  "2026-03-09", // Women's Day observed (Mon)
  "2026-03-20", // Eid al-Fitr
  "2026-04-13", // Easter observed (Mon)
  "2026-05-26", // Eid al-Adha
  "2026-06-01", // Holy Trinity observed (Mon)
  "2026-06-29", // Constitution Day observed (Mon)
  "2026-08-24", // Independence Day
  "2026-10-01", // Defender of Ukraine Day
  "2026-12-25"  // Christmas
]);

window.isWorkingDay = (date) => {
  const dow = date.getUTCDay();
  if (dow === 0 || dow === 6) return false; // Sun, Sat
  const iso = date.toISOString().slice(0, 10);
  if (window.UN_HOLIDAYS.has(iso)) return false;
  return true;
};

// Count working days BETWEEN two ISO dates (excluding the start date, including the end date)
// Mirrors how lead time is computed: days elapsed since previous milestone.
window.workingDaysBetween = (aIso, bIso) => {
  if (!aIso || !bIso) return 0;
  const start = window.parseISO(aIso);
  const end = window.parseISO(bIso);
  if (end <= start) return 0;
  let count = 0;
  const cur = new Date(start.getTime());
  cur.setUTCDate(cur.getUTCDate() + 1);
  while (cur <= end) {
    if (window.isWorkingDay(cur)) count++;
    cur.setUTCDate(cur.getUTCDate() + 1);
  }
  return count;
};
window.fmtDate = (s) => {
  if (!s) return "—";
  const d = window.parseISO(s);
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${d.getUTCDate()} ${months[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
};
window.fmtDateShort = (s) => {
  if (!s) return "—";
  const d = window.parseISO(s);
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${d.getUTCDate()} ${months[d.getUTCMonth()]}`;
};

// Compute aggregates
(function() {
  const data = window.PROCUREMENT_DATA;
  for (const key of Object.keys(data)) {
    const p = data[key];
    p.start = p.steps[0].date;
    p.end = p.steps[p.steps.length - 1].date;
    p.totalDays = window.daysBetween(p.start, p.end);
    p.totalWorkingDays = window.workingDaysBetween(p.start, p.end);
    // attach workingLead per step
    for (let i = 0; i < p.steps.length; i++) {
      const s = p.steps[i];
      const prev = i === 0 ? s.date : p.steps[i - 1].date;
      s.workingLead = window.workingDaysBetween(prev, s.date);
    }
    // by stage
    const stages = {};
    for (const s of p.steps) {
      if (!stages[s.stage]) stages[s.stage] = { stage: s.stage, days: 0, workingDays: 0, start: s.date, end: s.date, steps: [] };
      stages[s.stage].days += s.lead;
      stages[s.stage].workingDays += s.workingLead;
      stages[s.stage].end = s.date;
      stages[s.stage].steps.push(s);
    }
    p.stages = Object.values(stages);

    // ─── Counterfactual: "no preparedness" ──────────────────────────
    // Shift entire timeline so that step 0 (TS received / first action)
    // happens on or after the earliest funded project start date.
    // This represents what would have happened if procurement had only
    // started after project signature, with no advance tendering.
    if (p.earliestStart) {
      const realStart = window.parseISO(p.start);
      const projectStart = window.parseISO(p.earliestStart);
      const offsetDays = Math.round((projectStart - realStart) / (1000*60*60*24));
      const shiftDate = (iso) => {
        const d = window.parseISO(iso);
        d.setUTCDate(d.getUTCDate() + offsetDays);
        return d.toISOString().slice(0, 10);
      };
      p.advanceDays = offsetDays; // days the actual run preceded project start
      p.advanceWorkingDays = window.workingDaysBetween(p.start, p.earliestStart);
      p.counterfactual = {
        start: shiftDate(p.start),
        end: shiftDate(p.end),
        deliveryReady: shiftDate(p.steps[p.steps.length - 1].date),
        offsetDays
      };
    }
  }
})();
