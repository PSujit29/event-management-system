import StaticPageLayout from "./StaticPageLayout";

const sections = [
  {
    heading: "Discover by category",
    body: "Browse technical, cultural, sports, and academic events in one place with clear timelines and eligibility details.",
  },
  {
    heading: "Smart filters",
    body: "Use department, date, venue, and role-based filters to quickly find events that match your interests and availability.",
  },
  {
    heading: "One-click registration",
    body: "Register instantly and track confirmation status from your dashboard so you never miss an important event.",
  },
  {
    heading: "Calendar-ready planning",
    body: "Stay organized with start and end schedules, event overviews, and reminder-friendly details before event day.",
  },
];

export default function ExploreEventsPage() {
  return (
    <StaticPageLayout
      title="Explore Events"
      intro="Find the right events faster. The platform is designed to help students discover opportunities and organizers showcase experiences that matter."
      sections={sections}
    />
  );
}
