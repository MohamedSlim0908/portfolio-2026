import { ProjectData } from "@/types";

export const projects: ProjectData[] = [
  {
    id: "project-1",
    title: "Makteb",
    description:
      "Co-building a full-stack learning community platform (Skool-style) targeting Tunisia & North Africa — combines courses, community forums, gamification, and payments (Flouci gateway). Architected a REST API + WebSocket backend with Prisma ORM, PostgreSQL, Redis/BullMQ and built the React/TypeScript frontend with TanStack Query, Zustand, and real-time features via Socket.IO.",
    tech: ["React", "TypeScript", "Express", "Prisma", "PostgreSQL", "Redis", "Socket.IO"],
    link: "#",
    github: "https://github.com/MohamedSlim0908/makteb",
    color: "#39ff14",
    image: "/projects/makteb.png",
  },
  {
    id: "project-2",
    title: "UFood",
    description:
      "Built a responsive restaurant discovery app with search and filtering by price, cuisine, and location using Vue.js and Bootstrap. Consumed a Node.js REST API with form validation, error handling, and loading states; tested across desktop, iPad, and iPhone.",
    tech: ["Vue.js", "Bootstrap", "Node.js", "REST API"],
    link: "#",
    github: "https://github.com/GLO3102/ufood-a2025-team-01",
    color: "#00d4ff",
    image: "/projects/ufood.png",
  },
  {
    id: "project-3",
    title: "UTask",
    description:
      "Built a full task management UI (boards, lists, cards) with complete CRUD flows against a REST API documented with Swagger/OpenAPI. Added drag-and-drop with WebSocket real-time sync and optimistic UI updates for smooth, low-latency interactions.",
    tech: ["JavaScript", "Node.js", "REST API", "WebSockets", "Auth"],
    link: "#",
    github: "https://github.com/GLO3102/utasks-a2025-utask-a2025-team-15",
    color: "#ff006e",
    image: "/projects/utask.png",
  },
];
