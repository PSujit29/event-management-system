import StaticPageLayout from "./StaticPageLayout";

const sections = [
  {
    heading: "Step 1: Sign in",
    body: "Create an account or log in to unlock personalized event recommendations and role-based dashboard access.",
  },
  {
    heading: "Step 2: Browse and choose",
    body: "Review event details, requirements, and timelines before selecting events that fit your goals and schedule.",
  },
  {
    heading: "Step 3: Register and track",
    body: "Complete registration in a few clicks and monitor your participation status from your personal event area.",
  },
  {
    heading: "Step 4: Attend and engage",
    body: "Show up prepared, participate actively, and build your learning and networking journey through campus events.",
  },
];

export default function HowItWorksPage() {
  return (
    <StaticPageLayout
      title="How It Works"
      intro="The event process is straightforward for both students and organizers. From discovery to participation, every step is designed to be clear and quick."
      sections={sections}
    />
  );
}
