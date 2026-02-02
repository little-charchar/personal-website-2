import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const experiences = [
  {
    company: "HubHead",
    role: "Machine Learning Engineer",
    type: "Co-op",
    date: "Sep 2025 - Dec 2025",
    location: "Remote",
    summary:
      "Scaled machine learning workflows and built cloud-native testing environments to streamline asset analysis.",
  },
  {
    company: "Hack the North",
    role: "Logistics Lead",
    type: "Volunteer",
    date: "Jan 2025 - Sep 2025",
    location: "Waterloo, Ontario",
    summary:
      "Managed end-to-end event operations and a 9-member team for Canada's largest hackathon.",
  },
  {
    company: "Hack the North",
    role: "Logistics Organizer",
    type: "Volunteer",
    date: "Mar 2024 - Dec 2024",
    location: "Waterloo, Ontario",
    summary:
      "Coordinated venue logistics and ceremonies for 1,000+ attendees, including opening and closing ceremonies.",
  },
  {
    company: "RBC",
    role: "Android Developer",
    type: "Co-op",
    date: "Jan 2025 - Apr 2025",
    location: "Toronto, Ontario",
    summary:
      "Developed on-device AI solutions and LLM agents to automate mobile features and developer workflows.",
  },
  {
    company: "CATTLEytics",
    role: "Software & AI Developer",
    type: "Co-op",
    date: "May 2024 - Aug 2024",
    location: "Hamilton, Ontario · Remote",
    summary:
      "Built a generative AI assistant using RAG to deliver actionable farm-management insights.",
  },
];

const education = {
  school: "University of Waterloo",
  degree: "BASc, Mechatronics, Robotics, and Automation Engineering",
  date: "2023 - 2028",
  activities:
    "Hack the North Logistics, Women in Engineering Liaison/Promotions Director, Events Director",
  distinction: "Dean's Honour List",
};

const highlights = [
  {
    label: "Focus",
    value: "ML infrastructure + logistics systems",
  },
  {
    label: "Strength",
    value: "End-to-end execution + team leadership",
  },
  {
    label: "Toolkit",
    value: "Cloud-native ML, RAG, Android, event ops",
  },
];

const logoInitials: Record<string, string> = {
  HubHead: "HH",
  "Hack the North": "HTN",
  RBC: "RBC",
  CATTLEytics: "CAT",
  "University of Waterloo": "UW",
};

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden px-6 pb-20 pt-12 sm:px-10 lg:px-16">
      <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,#ffd9c7_0%,rgba(255,217,199,0.3)_45%,rgba(255,217,199,0)_70%)] blur-2xl" />
      <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-[radial-gradient(circle_at_center,#ffeecf_0%,rgba(255,238,207,0.35)_45%,rgba(255,238,207,0)_70%)] blur-3xl" />
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12">
        <header className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="flex flex-col gap-6">
            <Badge className="w-fit bg-white/80 text-zinc-700 shadow-sm">Machine Learning Engineer</Badge>
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">
                Charlene · Machine Learning Engineer
              </p>
              <h1 className="font-display text-4xl font-semibold leading-tight text-zinc-900 sm:text-5xl">
                Building ML systems that feel effortless, dependable, and human.
              </h1>
              <p className="max-w-xl text-base leading-7 text-zinc-600">
                I design scalable machine learning workflows and orchestrate complex operations
                with the same care. From cloud-native testing environments to major hackathon
                logistics, I bring calm to high-stakes systems.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <a href="#experience">View Experience</a>
              </Button>
              <Button variant="outline" asChild>
                <a href="#education">Education & Activities</a>
              </Button>
            </div>
            <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.2em] text-zinc-500">
              <span>Cloud-native ML</span>
              <span>RAG systems</span>
              <span>Android automation</span>
              <span>Logistics leadership</span>
            </div>
          </div>
          <Card className="relative overflow-hidden">
            <CardHeader>
              <Badge variant="outline" className="w-fit">
                Snapshot
              </Badge>
              <CardTitle className="font-display text-2xl">
                Systems thinker with operator energy.
              </CardTitle>
              <CardDescription>
                Blending engineering depth with real-world operations to keep teams moving.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl bg-zinc-50 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Roles</p>
                  <p className="font-display text-2xl text-zinc-900">5</p>
                </div>
                <div className="rounded-2xl bg-zinc-50 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Hackathons</p>
                  <p className="font-display text-2xl text-zinc-900">1,000+</p>
                </div>
                <div className="rounded-2xl bg-zinc-50 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Teams Led</p>
                  <p className="font-display text-2xl text-zinc-900">9</p>
                </div>
              </div>
              <Separator />
              <div className="space-y-3">
                {highlights.map((item) => (
                  <div key={item.label} className="flex items-center justify-between gap-4">
                    <span className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                      {item.label}
                    </span>
                    <span className="text-sm font-semibold text-zinc-800">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </header>

        <section id="experience" className="space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">Experience</p>
              <h2 className="font-display text-3xl text-zinc-900">Selected roles</h2>
            </div>
            <Badge variant="soft">Machine Learning · Logistics · Mobile</Badge>
          </div>
          <div className="grid gap-6">
            {experiences.map((role) => (
              <Card key={`${role.company}-${role.role}`} className="transition-all hover:-translate-y-1 hover:shadow-lg">
                <CardContent className="grid gap-6 p-6 md:grid-cols-[1fr_2fr]">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-900 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                      {logoInitials[role.company]}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-zinc-900">{role.company}</p>
                      <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                        {role.type}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-display text-2xl text-zinc-900">{role.role}</h3>
                      <Badge variant="outline">{role.date}</Badge>
                    </div>
                    <p className="text-sm text-zinc-500">{role.location}</p>
                    <p className="text-base leading-7 text-zinc-600">{role.summary}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="education" className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Card>
            <CardHeader>
              <Badge variant="outline" className="w-fit">
                Education
              </Badge>
              <CardTitle className="font-display text-2xl">{education.school}</CardTitle>
              <CardDescription>{education.degree}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge>{education.date}</Badge>
                <Badge variant="soft">{education.distinction}</Badge>
              </div>
              <p className="text-sm leading-6 text-zinc-600">{education.activities}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Badge variant="outline" className="w-fit">
                Focus Now
              </Badge>
              <CardTitle className="font-display text-2xl">What I'm building</CardTitle>
              <CardDescription>
                Projects that bring clarity to messy data and large-scale operations.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-zinc-600">
              <p>
                Designing cloud-native testing harnesses for ML models, blending data
                reliability with fast iteration cycles.
              </p>
              <p>
                Building intelligent assistants that make high-stakes operational decisions feel
                effortless for teams.
              </p>
              <Button variant="ghost" asChild>
                <a href="#experience">Back to experience</a>
              </Button>
            </CardContent>
          </Card>
        </section>

        <footer className="flex flex-col items-center gap-3 py-6 text-xs uppercase tracking-[0.35em] text-zinc-400">
          <span>Charlene · ML Engineer</span>
          <span>Based in Waterloo, Ontario</span>
        </footer>
      </div>
    </div>
  );
}
