export default function LandingFeature() {
  return (
    <section className="bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-orange-500">Features</p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">Everything you need to run campus events smoothly.</h2>
          <p className="mt-4 text-slate-600">
            Built for students, organizers, and admins so every event runs on time, stays compliant, and keeps participation high.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#1A325E] text-white">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 7V3m8 4V3M4 11h16M6 7h12a2 2 0 012 2v9a2 2 0 01-2 2H6a2 2 0 01-2-2V9a2 2 0 012-2z"
                  />
                </svg>
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-orange-500">Students</p>
                <h3 className="text-lg font-semibold text-slate-900">Discover Events Faster</h3>
              </div>
            </div>

            <ul className="mt-6 space-y-4 text-sm text-slate-600">
              <li className="flex gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-orange-500"></span>
                Centralized event hub for workshops, seminars, and fests.
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-orange-500"></span>
                One-click RSVP with your roll number profile.
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-orange-500"></span>
                Smart notifications for venue and schedule updates.
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#1A325E] text-white">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 10h10M7 14h6m-8 6h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-orange-500">Organizers</p>
                <h3 className="text-lg font-semibold text-slate-900">Manage Participation</h3>
              </div>
            </div>

            <ul className="mt-6 space-y-4 text-sm text-slate-600">
              <li className="flex gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-orange-500"></span>
                Seamless participant tracking with instant exports.
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-orange-500"></span>
                QR-based check-in to speed up entry lines.
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-orange-500"></span>
                Feedback and analytics by department engagement.
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#1A325E] text-white">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3l7 4v5c0 4.418-3.134 7.418-7 9-3.866-1.582-7-4.582-7-9V7l7-4z"
                  />
                </svg>
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-orange-500">Admins</p>
                <h3 className="text-lg font-semibold text-slate-900">Control and Compliance</h3>
              </div>
            </div>

            <ul className="mt-6 space-y-4 text-sm text-slate-600">
              <li className="flex gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-orange-500"></span>
                Role-based access for approving event requests.
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-orange-500"></span>
                Automated e-certificates after events close.
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-orange-500"></span>
                Venue conflict alerts for shared spaces.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
