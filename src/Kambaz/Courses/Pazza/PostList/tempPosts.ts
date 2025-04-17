// src/mock/tempPosts.ts
import { subDays, subHours } from "date-fns";

export interface Post {
  _id: string;
  content: string;
  createdAt: string;     // ISO date string
  folders: string[];
}

const now = new Date();

export const tempPosts: Post[] = [
  // Today
  {
    _id: "p1",
    content: "Finish writing the React‑Bootstrap guide",
    createdAt: now.toISOString(),
    folders: ["inbox"],
  },
  {
    _id: "p2",
    content: "Refactor sidebar toggle animation",
    createdAt: subHours(now, 2).toISOString(),
    folders: ["dev"],
  },

  // Yesterday
  {
    _id: "p3",
    content: "Fix 404 page routing bug",
    createdAt: subDays(now, 1).toISOString(),
    folders: ["bugfix"],
  },

  // Last week
  {
    _id: "p4",
    content: "Design new onboarding flow",
    createdAt: subDays(now, 3).toISOString(),
    folders: ["design"],
  },
  {
    _id: "p5",
    content: "Add dark‑mode toggle",
    createdAt: subDays(now, 6).toISOString(),
    folders: ["feature"],
  },

  // Older weeks
  {
    _id: "p6",
    content: "Write unit tests for auth reducer",
    createdAt: subDays(now, 9).toISOString(),
    folders: ["testing"],
  },
  {
    _id: "p7",
    content: "Prepare demo slides",
    createdAt: subDays(now, 15).toISOString(),
    folders: ["presentation"],
  },
  {
    _id: "p8",
    content: "Research WebSocket reconnection strategies",
    createdAt: subDays(now, 23).toISOString(),
    folders: ["research"],
  },
];
