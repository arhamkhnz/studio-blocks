"use client";

import Adobe from "@thesvg/react/adobe";
import Canva from "@thesvg/react/canva";
import Dropbox from "@thesvg/react/dropbox";
import Figma from "@thesvg/react/figma";
import Github from "@thesvg/react/github";
import GoogleDrive from "@thesvg/react/google-drive";
import Linear from "@thesvg/react/linear";
import Notion from "@thesvg/react/notion";
import Slack from "@thesvg/react/slack";
import Spotify from "@thesvg/react/spotify";
import Vercel from "@thesvg/react/vercel";
import Zoom from "@thesvg/react/zoom";

import { List01, type RenewalWeek } from "./list-01";

const exampleWeek: RenewalWeek = {
  rangeLabel: "Oct 25 - 31",
  total: 2209,
  count: 12,
  days: [
    {
      date: "2026-10-25",
      total: 240,
      items: [
        { name: "Figma", icon: Figma, plan: "Professional monthly", amount: 120 },
        { name: "Notion", icon: Notion, plan: "Business monthly", amount: 120 },
      ],
    },
    {
      date: "2026-10-26",
      total: 590,
      items: [
        { name: "Slack", icon: Slack, plan: "Team monthly", amount: 240 },
        { name: "Linear", icon: Linear, plan: "Business monthly", amount: 200 },
        { name: "Vercel", icon: (props) => <Vercel variant="mono" {...props} />, plan: "Pro monthly", amount: 150 },
      ],
    },
    { date: "2026-10-27", total: 0, items: [] },
    {
      date: "2026-10-28",
      total: 129,
      items: [{ name: "GitHub", icon: Github, plan: "Team monthly", amount: 129 }],
    },
    {
      date: "2026-10-29",
      total: 890,
      items: [
        { name: "Dropbox", icon: Dropbox, plan: "Business monthly", amount: 320 },
        { name: "Zoom", icon: Zoom, plan: "Business monthly", amount: 240 },
        { name: "Google Drive", icon: GoogleDrive, plan: "Business monthly", amount: 200 },
        { name: "Adobe", icon: Adobe, plan: "Creative Cloud monthly", amount: 130 },
      ],
    },
    {
      date: "2026-10-30",
      total: 360,
      items: [
        { name: "Canva", icon: Canva, plan: "Business monthly", amount: 180 },
        { name: "Spotify", icon: Spotify, plan: "Annual subscription", amount: 180 },
      ],
    },
    { date: "2026-10-31", total: 0, items: [] },
  ],
};

export default function Example() {
  return <List01 data={exampleWeek} />;
}
