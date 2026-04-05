import StaticPageLayout from "./StaticPageLayout";

const sections = [
  {
    heading: "General support",
    body: "Need help getting started or using key features? Reach out and the team will guide you through the right steps.",
  },
  {
    heading: "Organizer assistance",
    body: "If you are planning a large event, contact support for setup advice, workflow recommendations, and best practices.",
  },
  {
    heading: "Report an issue",
    body: "Found a bug or data mismatch? Share the details with screenshots and we will investigate as quickly as possible.",
  },
  {
    heading: "Partnership requests",
    body: "For collaboration opportunities, sponsorship ideas, or departmental partnerships, get in touch with the coordination team.",
  },
];

export default function ContactPage() {
  return (
    <StaticPageLayout
      title="Contact"
      intro="We are here to help with platform usage, event planning support, and technical issues. Let us know what you need and we will respond promptly."
      sections={sections}
    />
  );
}
