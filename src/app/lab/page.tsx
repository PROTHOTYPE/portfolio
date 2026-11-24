import type { Metadata } from "next";
import { LabView } from "@/components/lab/LabView";

export const metadata: Metadata = {
  title: "PROTHOTYPE Lab — Vitrine Interativa · Pedro Teixeira",
  description:
    "Interactive creative lab and playable sandboxes for Cafofo, Dynamic Island Win11, PRISMA SMEC Touros, and GPU Hunter BR.",
};

export default function LabPage() {
  return <LabView />;
}
