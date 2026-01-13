import { Header } from "@/components/Header";
import { LandingHero } from "@/components/LandingHero";
import { Footer } from "@/components/Footer";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Suspense fallback={<div>Loading...</div>}>
        <Header />
        <LandingHero />
        <Footer />
      </Suspense>
    </main>
  );
}
