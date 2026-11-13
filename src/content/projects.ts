export type CaseStudy = {
  slug: string
  title: string
  client: string
  discipline: string
  year: string
  description: string
  color: 'coral' | 'ink' | 'sage'
  overview: string
  challenge: string
  approach: { title: string; description: string }[]
  outcome: string
  role: string
  services: string[]
}

// Edit this file to add, remove, or update case studies. No CMS or database is required.
export const projects: CaseStudy[] = [
  {
    slug: 'luma-health',
    title: 'Making care feel coordinated',
    client: 'Luma Health',
    discipline: 'Patient experience · Product design',
    year: '2024',
    description: 'A clearer digital journey that helps people understand what happens next in their care.',
    color: 'coral',
    overview: 'A product-design exploration focused on bringing scattered healthcare touchpoints into a more coherent experience.',
    challenge: 'People often move between appointments, messages, forms, and care teams without a clear picture of the next step. The experience needs to make complex journeys easier to understand.',
    approach: [
      { title: 'Understand the journey', description: 'Map the key moments, questions, and hand-offs across the patient experience before deciding what the interface should do.' },
      { title: 'Create a shared structure', description: 'Bring the most important information and next actions into a consistent, easy-to-scan experience.' },
      { title: 'Refine the details', description: 'Use clear hierarchy, thoughtful interaction states, and accessible patterns to make each step feel predictable.' }
    ],
    outcome: 'A proposed experience direction that makes the journey easier to follow and gives the product team a clearer foundation for future iterations.',
    role: 'Product design',
    services: ['UX strategy', 'User flows', 'Interaction design', 'UI design']
  },
  {
    slug: 'northstar',
    title: 'A calmer way to manage money',
    client: 'Northstar',
    discipline: 'Consumer finance · Product design',
    year: '2023',
    description: 'Reframing financial planning around smaller, clearer decisions instead of dashboard overload.',
    color: 'ink',
    overview: 'A concept for a personal-finance experience that makes everyday money decisions feel more understandable and manageable.',
    challenge: 'Financial dashboards can overwhelm people with numbers without helping them decide what to do. The challenge is to make important information feel relevant, calm, and actionable.',
    approach: [
      { title: 'Prioritise what matters', description: 'Separate essential financial signals from secondary information and give each one a clear place in the hierarchy.' },
      { title: 'Turn data into direction', description: 'Connect balances, goals, and activity to practical next steps rather than presenting disconnected charts.' },
      { title: 'Design for confidence', description: 'Use calm visual language and plain-language explanations to reduce friction around financial decisions.' }
    ],
    outcome: 'A more focused product direction built around clarity, confidence, and useful everyday actions.',
    role: 'Product design',
    services: ['Information architecture', 'UX design', 'Visual design', 'Prototyping']
  },
  {
    slug: 'terrain',
    title: 'A better operating system for field teams',
    client: 'Terrain',
    discipline: 'B2B platform · Product design',
    year: '2022',
    description: 'Bringing operational information into one resilient workspace for teams working in the field.',
    color: 'sage',
    overview: 'A B2B platform concept for teams coordinating work across locations, people, and changing conditions.',
    challenge: 'Field teams often rely on disconnected tools and informal updates. Important context can be hard to find when people need to make decisions quickly.',
    approach: [
      { title: 'Map the operational reality', description: 'Understand the roles, hand-offs, constraints, and moments where teams lose visibility.' },
      { title: 'Unify the workspace', description: 'Bring tasks, status, and key context into a consistent interface that supports quick scanning.' },
      { title: 'Support real conditions', description: 'Prioritise readable layouts, clear states, and resilient interaction patterns for busy environments.' }
    ],
    outcome: 'A structured product direction for making field operations more visible and easier to coordinate.',
    role: 'Product design',
    services: ['Workflow mapping', 'UX architecture', 'Dashboard design', 'Design system']
  }
]

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug)
}
