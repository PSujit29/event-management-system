import Hero from "@/components/Hero/Hero";
import { HiBriefcase, HiLink, HiUsers } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import eventSample1 from "@/assets/images/event-sample-1.avif";
import eventSample2 from "@/assets/images/event-sample-2.avif";
import eventSample3 from "@/assets/images/event-sample-3.avif";

export const HeroSection = () => {
  const navigate = useNavigate();

  const heroData = {
    title: (<>Plan, Promote <br /> & Host Better Events</>),
    subtitle: "Everything you need to manage registrations, schedules, and attendee communication in one place.",
    actions: [
      { text: "Book your event now", onClick: () => navigate("/register"), variant: "default" },
      { text: "Learn more", onClick: () => navigate("/how-it-works"), variant: "outline" },
    ],
    stats: [
      { value: "150 +", label: "Successful Events", icon: <HiUsers className="h-5 w-5 text-muted-foreground" /> },
      { value: "25 +", label: "Organizers", icon: <HiBriefcase className="h-5 w-5 text-muted-foreground" /> },
      { value: "Resources", label: "", icon: <HiLink className="h-5 w-5 text-muted-foreground" /> },
    ],
    images: [eventSample3, eventSample1, eventSample2],
  };

  return (
    <div className="w-full bg-background">
      <Hero
        title={heroData.title}
        subtitle={heroData.subtitle}
        actions={heroData.actions}
        stats={heroData.stats}
        images={heroData.images}
        className="p-10"
      />
    </div>
  );
};
