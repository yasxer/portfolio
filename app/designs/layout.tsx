import type { Metadata } from "next";
import "./designs.css";

export const metadata: Metadata = {
  title: "Design Lab | Yasser Haoues",
  description:
    "Brand sites, motion systems and real-time 3D experiences designed and built by Yasser Haoues.",
};

export default function DesignsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
