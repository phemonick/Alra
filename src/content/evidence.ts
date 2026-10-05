export type ClientTestimonial = {
  quote: string;
  name: string;
  role: string;
  organisation: string;
};

// Publish only attributable feedback approved by the client in writing.
export const clientTestimonials: ClientTestimonial[] = [];

export const engagementExamples = [
  {
    label: "Graduate technical readiness",
    title: "A structured pathway from induction to supervised practice",
    brief: "For an operator, EPC contractor or service company preparing a graduate or technician intake for technical assignments.",
    approach: "Role mapping, technical foundations, HSE discipline, practical exercises, assessment and a clear handover into supervised workplace learning.",
    evidence: "Baseline and final checks, attendance, practical observation records and a cohort close-out report.",
  },
  {
    label: "Operations and maintenance",
    title: "Multi-discipline development around plant responsibilities",
    brief: "For electrical, instrumentation and mechanical personnel who need a consistent understanding of equipment, procedures and interfaces.",
    approach: "A shared operations foundation followed by discipline modules, equipment-led scenarios, maintenance documentation and troubleshooting practice.",
    evidence: "Module results, observed task performance, participation records and recommendations for workplace reinforcement.",
  },
  {
    label: "Project-based HCD and TIP",
    title: "A workforce plan connected to project milestones",
    brief: "For project teams that need training activity to follow role demand, mobilisation timing and reporting requirements.",
    approach: "Needs analysis, cohort and curriculum planning, delivery scheduling, practical or OJT phases, monitoring and structured close-out.",
    evidence: "Training matrix, delivery records, assessment evidence, progress reporting and an auditable completion pack.",
  },
];

export const outcomeMeasures = [
  {
    value: "01",
    title: "Knowledge movement",
    text: "Compare an agreed baseline with final knowledge or scenario-based assessment results.",
  },
  {
    value: "02",
    title: "Practical performance",
    text: "Record how participants complete defined exercises, demonstrations or observed tasks.",
  },
  {
    value: "03",
    title: "Participation and completion",
    text: "Track attendance, module completion and assessment status by participant and cohort.",
  },
  {
    value: "04",
    title: "Workplace follow-through",
    text: "Where agreed, capture supervisor feedback, OJT progress and actions requiring reinforcement.",
  },
];
