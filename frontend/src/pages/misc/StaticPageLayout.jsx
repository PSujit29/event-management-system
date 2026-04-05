import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

export default function StaticPageLayout({ title, intro, sections = [] }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Navbar />

      <main className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-wider text-orange-500">Campus Events</p>
          <h1 className="mt-3 text-3xl font-bold text-[#1A325E] sm:text-4xl">{title}</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">{intro}</p>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {sections.map((section) => (
              <article key={section.heading} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h2 className="text-lg font-semibold text-[#1A325E]">{section.heading}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{section.body}</p>
              </article>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              to="/explore"
              className="rounded-lg bg-[#1A325E] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#152a4f]"
            >
              Explore Events
            </Link>
            <Link
              to="/register"
              className="rounded-lg bg-[#F49425] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#e0861d]"
            >
              Get Started
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
