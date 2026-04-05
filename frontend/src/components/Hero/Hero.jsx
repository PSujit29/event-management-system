import { Button } from "../ui/AppButton";

const Hero = ({
  title = "Plan, Promote, and Host Better Events",
  subtitle = "Everything you need to manage registrations, schedules, and attendee communication in one place.",
  actions = [],
  stats = [],
  images = [],
  className,
}) => {
  return (
    <section className={`hero-shell w-full overflow-hidden bg-background py-12 sm:py-24 ${className || ""}`}>
      <div className="container mx-auto grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-8">
        <div className="hero-copy flex flex-col items-center text-center lg:items-start lg:text-left">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">{title}</h1>
          <p className="mt-6 max-w-md text-lg text-muted-foreground">{subtitle}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
            {actions.map((action, index) => (
              <Button key={index} onClick={action.onClick} variant={action.variant} size="lg" className={action.className}>
                {action.text}
              </Button>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-8 lg:justify-start">
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">{stat.icon}</div>
                <div>
                  <p className="text-xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-visual relative h-100 w-full sm:h-125">
          <div className="hero-orb hero-orb-one absolute -top-4 left-1/4 h-16 w-16 rounded-full bg-blue-200/50 dark:bg-blue-800/30" />
          <div className="hero-orb hero-orb-two absolute bottom-0 right-1/4 h-12 w-12 rounded-lg bg-purple-200/50 dark:bg-purple-800/30" />
          <div className="hero-orb hero-orb-three absolute bottom-1/4 left-4 h-6 w-6 rounded-full bg-green-200/50 dark:bg-green-800/30" />

          <div className="hero-card hero-card-top absolute left-1/2 top-0 h-48 w-48 -translate-x-1/2 rounded-2xl bg-muted p-2 shadow-lg sm:h-64 sm:w-64">
            <img src={images[0]} alt="Student learning" className="h-full w-full rounded-xl object-cover" />
          </div>
          <div className="hero-card hero-card-right absolute right-0 top-1/3 h-40 w-40 rounded-2xl bg-muted p-2 shadow-lg sm:h-56 sm:w-56">
            <img src={images[1]} alt="Tutor assisting" className="h-full w-full rounded-xl object-cover" />
          </div>
          <div className="hero-card hero-card-left absolute bottom-0 left-0 h-32 w-32 rounded-2xl bg-muted p-2 shadow-lg sm:h-48 sm:w-48">
            <img src={images[2]} alt="Collaborative discussion" className="h-full w-full rounded-xl object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
