import { Suspense, lazy } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { HeroSection } from "../../components/Hero/HeroSection";

const LandingFeature = lazy(() => import("../../components/feature/LandingFeature"));
const Footer = lazy(() => import("../../components/Footer/Footer"));

function LandingSectionLoader() {
  return (
    <div className="bg-slate-50">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-16 sm:px-6 lg:px-8">
        <div className="h-4 w-28 animate-pulse rounded-full bg-slate-200" />
        <div className="h-9 w-full max-w-2xl animate-pulse rounded-2xl bg-slate-200" />
        <div className="h-5 w-full max-w-3xl animate-pulse rounded-full bg-slate-200" />
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="h-56 animate-pulse rounded-2xl bg-white shadow-sm" />
          <div className="h-56 animate-pulse rounded-2xl bg-white shadow-sm" />
          <div className="h-56 animate-pulse rounded-2xl bg-white shadow-sm" />
        </div>
      </div>
      <div className="h-80 animate-pulse bg-[#07152fc4]" />
    </div>
  );
}

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <Suspense fallback={<LandingSectionLoader />}>
        <LandingFeature />
        <Footer />
      </Suspense>
    </>
  );
}
