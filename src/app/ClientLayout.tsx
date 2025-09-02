"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/ui/Navbar/Navbar";
import Footer from "@/components/ui/Footer/Footer";
import Aurora from "@/components/Aurora/Aurora";
import { ClientLayoutProps } from "@/types";

export default function ClientLayout({ children }: ClientLayoutProps) {
  const pathname = usePathname();
  const isDashboard =
    pathname?.startsWith("/dashboard") || pathname?.startsWith("/preview");

  if (isDashboard) {
    return <>{children}</>;
  }

  return (
    <>
      {/* Aurora Background */}
      <div className="fixed inset-0 z-0">
        <Aurora
          colorStops={["#8B5CF6", "#A855F7", "#C084FC"]}
          blend={0.5}
          amplitude={1.0}
          speed={1.0}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        {children}
        <Footer />
      </div>
    </>
  );
}
