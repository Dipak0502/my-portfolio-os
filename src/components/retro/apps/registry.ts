import type { ComponentType } from "react";
import { AboutApp } from "./About";
import { EducationApp } from "./Education";
import { SkillsApp } from "./Skills";
import { ProjectsApp } from "./Projects";
import { CertificationsApp } from "./Certifications";
import { ContactApp } from "./Contact";
import { InterestsApp } from "./Interests";
import { ResumeApp } from "./Resume";
import { SnakeGame } from "../games/Snake";
import { MemoryGame } from "../games/MemoryMatch";

export interface AppDef {
  id: string;
  title: string;
  icon: string;
  component: ComponentType;
  w?: number;
  h?: number;
  desktop?: boolean;
}

export const APPS: AppDef[] = [
  { id: "about", title: "About Me.exe", icon: "🧑", component: AboutApp, w: 640, h: 480, desktop: true },
  { id: "education", title: "Education.exe", icon: "🎓", component: EducationApp, w: 620, h: 420, desktop: true },
  { id: "skills", title: "Skills.exe", icon: "🛠️", component: SkillsApp, w: 680, h: 520, desktop: true },
  { id: "projects", title: "Projects.exe", icon: "📁", component: ProjectsApp, w: 780, h: 560, desktop: true },
  { id: "certs", title: "Certifications.exe", icon: "🏆", component: CertificationsApp, w: 600, h: 380, desktop: true },
  { id: "contact", title: "Contact.exe", icon: "✉️", component: ContactApp, w: 560, h: 420, desktop: true },
  { id: "interests", title: "Interests.exe", icon: "🎯", component: InterestsApp, w: 520, h: 380 },
  { id: "resume", title: "Resume.pdf", icon: "📄", component: ResumeApp, w: 520, h: 320, desktop: true },
  { id: "snake", title: "Snake.exe", icon: "🐍", component: SnakeGame, w: 520, h: 620, desktop: true },
  { id: "memory", title: "MemoryMatch.exe", icon: "🎮", component: MemoryGame, w: 640, h: 620, desktop: true },
];

export const APPS_BY_ID = Object.fromEntries(APPS.map((a) => [a.id, a]));
