import { ProjectData } from "@/types";

export const projects: ProjectData[] = [
  {
    id: "project-1",
    title: "Makteb",
    description:
      "A community-driven learning platform built for Tunisia & North Africa. Features real-time messaging, course creation, gamification, and Flouci payment integration. Currently in active development as a startup.",
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
      "A restaurant discovery and review platform with interactive maps, user profiles, and social features. Built as a team project at Université Laval.",
    tech: ["Vue.js", "Bootstrap", "Node.js", "REST API"],
    link: "#",
    github: "https://github.com/MohamedSlim0908",
    color: "#00d4ff",
    image: "/projects/ufood.png",
  },
  {
    id: "project-3",
    title: "UTask",
    description:
      "A real-time collaborative task management app with user authentication, WebSocket live updates, and a full REST API backend. Built as a team project at Université Laval.",
    tech: ["JavaScript", "Node.js", "REST API", "WebSockets", "Auth"],
    link: "#",
    github: "https://github.com/MohamedSlim0908",
    color: "#ff006e",
    image: "/projects/utask.png",
  },
];
