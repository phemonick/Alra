export type Programme = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  audience: string[];
  objectives: string[];
  topics: string[];
  prerequisites: string;
  duration: string;
  deliveryMode: string;
  venue: string;
  certification: string;
  dates: string;
  fees: string;
  image: string;
};

export const categories = [
  "Digital & ICT",
  "Drilling & Wells",
  "Subsea & Offshore",
  "Automation & Control",
  "Operations & Maintenance",
  "Project & Document Management",
  "HSE & Quality",
] as const;

const TBD = "Contact us for details";

export const programmes: Programme[] = [
  {
    slug: "digital-skills-ict",
    title: "Digital Skills and ICT",
    category: "Digital & ICT",
    summary:
      "Applied digital skills for oil and gas office and field-support roles: spreadsheets, data handling, collaboration tools and safe everyday ICT practice, taught with energy-industry examples.",
    audience: ["Graduate trainees", "Administrative and support staff", "Early-career engineers and technicians", "Professionals moving into digital workflows"],
    objectives: [
      "Use spreadsheets confidently for data entry, checking and basic reporting",
      "Organise files, collaborate and communicate effectively in a modern workplace",
      "Apply good practice for passwords, data protection and safe browsing",
      "Prepare clear work documents and short presentations",
    ],
    topics: [
      "Computer fundamentals and professional productivity habits",
      "Spreadsheets: formulas, sorting, filtering, charts and print-ready reports",
      "Documents and presentations for technical and commercial audiences",
      "Cloud collaboration, email etiquette and version control basics",
      "Cyber hygiene, backups and responsible use of company devices",
      "Practical mini-project using oil and gas sample datasets",
    ],
    prerequisites: "Basic computer literacy. No programming experience required.",
    duration: TBD, deliveryMode: TBD, venue: TBD, certification: TBD, dates: TBD, fees: TBD,
    image: "/images/alra-technical-workshop.jpg",
  },
  {
    slug: "drilling-engineering",
    title: "Drilling Engineering",
    category: "Drilling & Wells",
    summary:
      "Foundations of drilling operations: well planning concepts, rig systems, drilling fluids, well control awareness and the roles that keep drilling safe and efficient.",
    audience: ["Graduate and trainee drilling engineers", "Wellsite support personnel", "Contractor staff requiring drilling awareness", "Career changers entering drilling"],
    objectives: [
      "Describe the drilling system, rig types and key wellsite roles",
      "Explain well planning steps, casing concepts and drilling-fluid functions",
      "Recognise well-control fundamentals and why procedures matter",
      "Interpret common drilling reports and operational terminology",
    ],
    topics: [
      "Rotary drilling systems, rigs and wellsite organisation",
      "Well planning, casing strings and directional concepts",
      "Drilling fluids, hydraulics and solids control awareness",
      "Well control awareness: kicks, barriers and shut-in principles",
      "Measurement-while-drilling (MWD) and logging-while-drilling (LWD) awareness",
      "Drilling reports, KPIs and practical case exercises",
    ],
    prerequisites: "Engineering, geoscience or technical background recommended; motivated non-engineers accepted.",
    duration: TBD, deliveryMode: TBD, venue: TBD, certification: TBD, dates: TBD, fees: TBD,
    image: "/images/alra-training-hero.jpg",
  },
  {
    slug: "subsea-engineering",
    title: "Subsea Engineering",
    category: "Subsea & Offshore",
    summary:
      "Overview of subsea production systems — trees, manifolds, flowlines, umbilicals and controls — and how subsea interfaces with topsides, drilling and operations.",
    audience: ["Graduate engineers", "EPC and operations support staff", "Project team members interfacing with subsea scopes", "Professionals targeting offshore roles"],
    objectives: [
      "Describe subsea field architecture and main equipment",
      "Explain subsea controls, umbilicals and flow-assurance basics",
      "Identify interfaces between subsea, topside and drilling activities",
      "Discuss installation, intervention and integrity considerations",
    ],
    topics: [
      "Subsea field architecture: trees, manifolds, jumpers, PLEMs and flowlines",
      "Subsea control systems, umbilicals and power distribution",
      "Flow assurance awareness and production chemistry basics",
      "Installation vessels, ROV intervention and remote operations",
      "Subsea integrity, inspection and maintenance concepts",
      "Deepwater project case discussion",
    ],
    prerequisites: "Engineering or technical background recommended.",
    duration: TBD, deliveryMode: TBD, venue: TBD, certification: TBD, dates: TBD, fees: TBD,
    image: "/images/alra-training-hero.jpg",
  },
  {
    slug: "automation-control",
    title: "Automation and Control",
    category: "Automation & Control",
    summary:
      "Practical introduction to instrumentation, PLCs, control loops and SCADA as used in oil and gas facilities — built for operations, maintenance and project staff.",
    audience: ["Electrical, instrumentation and mechanical technicians", "Control-room and operations trainees", "Graduate engineers", "Project staff coordinating automation scopes"],
    objectives: [
      "Explain control loops, sensors, actuators and signal types",
      "Describe PLC/DCS/SCADA architecture at an applied level",
      "Read basic loop drawings and control narratives",
      "Apply safe working practice around live control systems",
    ],
    topics: [
      "Measurement principles: pressure, temperature, level and flow",
      "Final control elements: valves, actuators and drives",
      "Control loops, PID concepts and alarm thinking",
      "PLC/DCS/SCADA architecture and networks awareness",
      "Loop drawings, cause-and-effect basics and documentation",
      "Bench exercises and simulated control scenarios",
    ],
    prerequisites: "Basic electrical or technical knowledge helpful but not essential.",
    duration: TBD, deliveryMode: TBD, venue: TBD, certification: TBD, dates: TBD, fees: TBD,
    image: "/images/alra-technical-workshop.jpg",
  },
  {
    slug: "electrical-maintenance",
    title: "Operations and Maintenance: Electrical Engineering",
    category: "Operations & Maintenance",
    summary:
      "Electrical systems in oil and gas plants: generation and distribution awareness, protection basics, hazardous-area discipline and maintenance practice for safe operations.",
    audience: ["Electrical technicians and craft personnel", "Maintenance planners", "Graduate electrical engineers", "Operations staff working near electrical plant"],
    objectives: [
      "Describe plant electrical distribution and key equipment",
      "Apply safe isolation, lockout/tagout and permit awareness",
      "Explain protection, earthing and hazardous-area discipline",
      "Plan routine inspection and first-line fault finding",
    ],
    topics: [
      "Generation, transformers, switchgear and distribution layouts",
      "Motors, variable-speed drives and standby systems awareness",
      "Protection, earthing, discrimination and power quality basics",
      "Hazardous-area classification awareness and Ex discipline",
      "Isolation, LOTO, permits to work and electrical safety",
      "Preventive maintenance routines and fault-finding practice",
    ],
    prerequisites: "Electrical or related technical background recommended for hands-on modules.",
    duration: TBD, deliveryMode: TBD, venue: TBD, certification: TBD, dates: TBD, fees: TBD,
    image: "/images/alra-technical-workshop.jpg",
  },
  {
    slug: "instrumentation-maintenance",
    title: "Operations and Maintenance: Instrumentation",
    category: "Operations & Maintenance",
    summary:
      "Field instrumentation and control-room interfaces: calibration awareness, loop checking, troubleshooting logic and maintenance routines that protect production and safety.",
    audience: ["Instrument technicians", "Control-room trainees", "Graduate engineers", "Maintenance supervisors"],
    objectives: [
      "Identify common instruments and their process functions",
      "Describe calibration, loop checks and function testing",
      "Apply structured troubleshooting for instrument faults",
      "Handle documentation: datasheets, loop drawings and records",
    ],
    topics: [
      "Pressure, temperature, level and flow instruments in the field",
      "Transmitters, smart instruments and HART awareness",
      "Calibration principles and workshop practice",
      "Loop checking, function testing and fault isolation",
      "Control valves and shutdown-system interfaces",
      "Records, datasheets and handover quality",
    ],
    prerequisites: "Technical background helpful; safety induction required for practical sessions.",
    duration: TBD, deliveryMode: TBD, venue: TBD, certification: TBD, dates: TBD, fees: TBD,
    image: "/images/alra-technical-workshop.jpg",
  },
  {
    slug: "mechanical-maintenance",
    title: "Operations and Maintenance: Mechanical Engineering",
    category: "Operations & Maintenance",
    summary:
      "Rotating and static equipment essentials: pumps, compressors, turbines awareness, valves, piping and integrity-minded maintenance for plant reliability.",
    audience: ["Mechanical technicians and fitters", "Maintenance planners", "Graduate mechanical engineers", "Operations staff"],
    objectives: [
      "Describe major rotating and static equipment and their duties",
      "Apply preventive maintenance thinking and inspection routines",
      "Recognise common failure modes and first-line responses",
      "Use work permits, procedures and handover discipline",
    ],
    topics: [
      "Pumps, compressors, turbines and drivers: operating principles",
      "Valves, piping, vessels and heat exchangers awareness",
      "Lubrication, alignment, vibration awareness and condition monitoring",
      "Bolting, gaskets, seals and leak prevention",
      "Permits, isolation and mechanical safety practice",
      "Work planning, spares awareness and maintenance records",
    ],
    prerequisites: "Mechanical or general technical background recommended.",
    duration: TBD, deliveryMode: TBD, venue: TBD, certification: TBD, dates: TBD, fees: TBD,
    image: "/images/alra-training-hero.jpg",
  },
  {
    slug: "project-management",
    title: "Project Management",
    category: "Project & Document Management",
    summary:
      "Project delivery for oil, gas and EPC environments: scope, schedule, cost, risk, procurement interfaces and stakeholder communication — with African project realities in view.",
    audience: ["Project engineers and coordinators", "Package leads and supervisors", "Graduate trainees", "Professionals preparing for project roles"],
    objectives: [
      "Structure scope, work breakdown and delivery responsibilities",
      "Plan schedules, track progress and manage change",
      "Identify and manage risk, issues and interfaces",
      "Communicate clearly with clients, contractors and site teams",
    ],
    topics: [
      "Project lifecycles in oil, gas and EPC contexts",
      "Scope definition, WBS and responsibility mapping",
      "Scheduling, critical path awareness and progress measurement",
      "Cost awareness, variations and claims interfaces",
      "Risk, interface and stakeholder management",
      "Reporting, meetings and practical project simulation",
    ],
    prerequisites: "None. Workplace experience helpful for case exercises.",
    duration: TBD, deliveryMode: TBD, venue: TBD, certification: TBD, dates: TBD, fees: TBD,
    image: "/images/alra-hcd-planning.jpg",
  },
  {
    slug: "document-control",
    title: "Document Control",
    category: "Project & Document Management",
    summary:
      "The discipline behind successful EPC delivery: numbering, review cycles, master document registers, handover dossiers and practical EDMS habits.",
    audience: ["Document controllers and project administrators", "QA/QC and engineering support staff", "Graduate trainees", "Contractor admin teams"],
    objectives: [
      "Run a master document register with revisions and status",
      "Manage review, approval and distribution cycles",
      "Apply numbering, templates and filing discipline",
      "Prepare handover and as-built documentation packs",
    ],
    topics: [
      "Document types: drawings, procedures, ITPs, MDRs and dossiers",
      "Numbering, revision control and status codes",
      "Review and approval workflows with engineers and clients",
      "EDMS practice, access control and audit trails",
      "As-built collation and handover packs",
      "Hands-on register and transmittal exercises",
    ],
    prerequisites: "Good written English and basic ICT skills.",
    duration: TBD, deliveryMode: TBD, venue: TBD, certification: TBD, dates: TBD, fees: TBD,
    image: "/images/alra-hcd-planning.jpg",
  },
  {
    slug: "hse",
    title: "Health, Safety and Environment (HSE)",
    category: "HSE & Quality",
    summary:
      "Workplace HSE foundations for oil and gas: hazard recognition, risk assessment, permits, emergency response awareness and environmental responsibility.",
    audience: ["All oil and gas personnel", "New entrants and graduate trainees", "Contractor and site staff", "Supervisors refreshing HSE basics"],
    objectives: [
      "Recognise common oil and gas hazards and controls",
      "Contribute to risk assessments, toolbox talks and permits",
      "Respond correctly to alarms, spills and first-aid situations",
      "Apply environmental awareness in daily tasks",
    ],
    topics: [
      "HSE law, policy and personal responsibility awareness",
      "Hazard identification, risk assessment and hierarchy of controls",
      "Permits to work, LOTO, working at height and confined spaces awareness",
      "Fire awareness, emergency response and basic first aid awareness",
      "Waste management, spill prevention and environmental care",
      "Incident reporting, investigation awareness and safety culture",
    ],
    prerequisites: "None.",
    duration: TBD, deliveryMode: TBD, venue: TBD, certification: TBD, dates: TBD, fees: TBD,
    image: "/images/alra-training-hero.jpg",
  },
  {
    slug: "ndt-levels-1-2-3",
    title: "Non-Destructive Testing (NDT), Levels 1, 2 and 3",
    category: "HSE & Quality",
    summary:
      "Progressive NDT training across visual, penetrant, magnetic-particle, ultrasonic and radiographic methods — preparing candidates for externally assessed certification routes.",
    audience: ["QA/QC trainees and inspectors", "Welding and fabrication personnel", "Maintenance and integrity staff", "Graduates targeting inspection careers"],
    objectives: [
      "Explain NDT principles, capabilities and limits per method",
      "Perform supervised inspections at the appropriate level",
      "Interpret and report indications to procedures",
      "Prepare for independent, externally administered certification",
    ],
    topics: [
      "Visual testing (VT): technique, aids and reporting",
      "Liquid penetrant testing (PT): process control and interpretation",
      "Magnetic particle testing (MT): magnetisation and indications",
      "Ultrasonic testing (UT): equipment, calibration and flaw sizing awareness",
      "Radiographic testing (RT) and film interpretation awareness",
      "Codes, procedures, ethics and examination preparation by level",
    ],
    prerequisites:
      "Secondary education minimum; eyesight requirements apply for inspection practice. Level 2 requires prior Level 1 knowledge plus experience; Level 3 requires extensive experience.",
    duration: TBD, deliveryMode: TBD, venue: TBD,
    certification:
      "External certification is assessed and awarded by independent certifying bodies, not by ALRA. Contact us for details on routes and requirements.",
    dates: TBD, fees: TBD,
    image: "/images/alra-technical-workshop.jpg",
  },
];

export const programmeBySlug = (slug: string) =>
  programmes.find((p) => p.slug === slug);

/** Drafts kept unpublished pending confirmation. Not listed publicly. */
export type DraftProgramme = {
  slug: string;
  title: string;
  note: string;
  summary: string;
};

export const draftProgrammes: DraftProgramme[] = [
  {
    slug: "draft-aws-cloud",
    title: "AWS certification preparation and cloud skills",
    note: "Requires confirmation before presenting as an ALRA offering. External certification, if pursued, is awarded by the external provider, not ALRA.",
    summary: "Cloud concepts and guided preparation for external AWS certification routes, with hands-on labs.",
  },
  {
    slug: "draft-m365-ict",
    title: "Microsoft 365 and basic ICT",
    note: "Requires confirmation before presenting as an ALRA offering.",
    summary: "Everyday productivity with Microsoft 365 apps for office and project teams.",
  },
  {
    slug: "draft-entrepreneurship",
    title: "Entrepreneurship and Business Management",
    note: "Requires confirmation before presenting as an ALRA offering.",
    summary: "Business planning, costing, marketing and managing a small enterprise in and around the energy value chain.",
  },
  {
    slug: "draft-clarity4d",
    title: "Clarity4D soft skills",
    note: "Requires confirmation; third-party profile tool. Requires licensed facilitation.",
    summary: "Communication and teamwork development built around personality preferences.",
  },
  {
    slug: "draft-nc-awareness",
    title: "Nigerian Content Awareness and Introduction to Nigeria's Oil and Gas Industry",
    note: "Requires confirmation. Present factually without implying regulatory approval or accreditation.",
    summary: "How Nigeria's oil and gas industry is organised and what Nigerian Content means for workforce participation.",
  },
  {
    slug: "draft-supply-chain-cips",
    title: "Supply Chain Management and CIPS qualification preparation",
    note: "Requires confirmation. External CIPS qualifications are awarded by CIPS, not ALRA.",
    summary: "Procurement and supply essentials with guided preparation for external CIPS study routes.",
  },
  {
    slug: "draft-communication",
    title: "Effective Communication and Presentation Skills",
    note: "Requires confirmation before presenting as an ALRA offering.",
    summary: "Clear workplace writing, meetings, and confident technical presentations.",
  },
];

export const enquirySubjects = [
  ...programmes.map((p) => ({ value: p.slug, label: p.title })),
  { value: "hcd-tip", label: "HCD / Training Implementation Plan (project-specific)" },
  { value: "corporate", label: "Corporate / graduate-trainee programme" },
  { value: "other", label: "Other enquiry" },
];
