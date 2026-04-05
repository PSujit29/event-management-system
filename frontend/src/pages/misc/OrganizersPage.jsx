import StaticPageLayout from "./StaticPageLayout";

const sections = [
  {
    heading: "Create impactful events",
    body: "Set up event details with structure and clarity so attendees can understand goals, venue, and participation flow.",
  },
  {
    heading: "Manage registrations",
    body: "Track participants, review attendance demand, and stay informed with a central organizer-friendly management space.",
  },
  {
    heading: "Reuse winning formats",
    body: "Use templates to clone successful event structures and reduce repetitive setup work across semesters.",
  },
  {
    heading: "Coordinate with confidence",
    body: "Keep teams aligned through clear timelines and consolidated event information for smoother execution.",
  },
];

export default function OrganizersPage() {
  return (
    <StaticPageLayout
      title="For Organizers"
      intro="Designed for teachers, admins, and event teams who need a reliable flow from planning to completion without unnecessary overhead."
      sections={sections}
    />
  );
}
