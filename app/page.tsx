import type { Metadata } from "next";
import { CareerDashboard } from "./career-dashboard";

export const metadata: Metadata = {
  title: "猫猫王求职 · 每日职位雷达",
  description: "本地优先的智能职位筛选与申请工作台",
};

export default function Home() {
  return <CareerDashboard />;
}
