"use client";

import { useEffect, useMemo, useRef, useState } from "react";

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

const volunteering = [
  {
    organization: "University of Waterloo",
    role: "Promotions & Liaison Director - Women in Engineering",
    date: "Jan 2024 - Aug 2025 · 1 yr 8 mos",
    location: "",
  },
  {
    organization: "Agincourt Collegiate Institute",
    role: "President - Student Administrative Council",
    date: "Sep 2021 - Jun 2023 · 1 yr 10 mos",
    location: "",
  },
  {
    organization: "The Hospital for Sick Children",
    role: "Children’s Council Member",
    date: "Sep 2015 - Jun 2023 · 7 yrs 10 mos",
    location: "",
  },
  {
    organization: "The Hospital for Sick Children",
    role: "Child Life Volunteer",
    date: "Jun 2022 · 1 mo",
    location: "",
  },
  {
    organization: "Canadian National Exhibition",
    role: "Friends of the CNE Volunteer",
    date: "Aug 2019 · 1 mo",
    location: "",
  },
];

const volunteeringLogos: Record<string, string> = {
  "Agincourt Collegiate Institute": "/logos/agincourt-logo.jpeg",
  "The Hospital for Sick Children": "/logos/sickkids-logo.jpeg",
  "University of Waterloo": "/logos/uwaterloo-logo.jpeg",
  "Canadian National Exhibition": "/logos/cne-logo.jpeg",
};

const experienceLogos: Record<string, string> = {
  HubHead: "/logos/hubhead-logo.jpeg",
  "Hack the North": "/logos/hackthenorth-logo.jpeg",
  RBC: "/logos/rbc-logo.jpeg",
  CATTLEytics: "/logos/cattleytics-logo.jpeg",
};

const education = {
  school: "University of Waterloo",
  degree: "Bachelor of Mechatronics Engineering",
  date: "2023 - 2028",
  activities:
    "Hack the North Logistics, Women in Engineering Liaison/Promotions Director, Events Director",
  distinction: "Dean's Honour List",
};

export default function Home() {
  const [bunnies, setBunnies] = useState<
    Array<{
      id: number;
      bottom: number;
      size: number;
      duration: number;
      flip: boolean;
      radius: number;
      hopCount: number;
      startAt: number;
    }>
  >([]);
  const bunniesRef = useRef<typeof bunnies>([]);
  const bunnyElsRef = useRef(new Map<number, HTMLImageElement>());
  const bunnySources = useMemo(() => ["/bunny-idle-32.png", "/bunny-click-32.png"], []);

  const updateBunnies = (
    updater: (prev: typeof bunnies) => typeof bunnies,
  ) => {
    setBunnies((prev) => {
      const next = updater(prev);
      bunniesRef.current = next;
      return next;
    });
  };

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const now = performance.now();
      bunniesRef.current.forEach((bunny) => {
        const el = bunnyElsRef.current.get(bunny.id);
        if (!el) return;
        const elapsed = (now - bunny.startAt) / 1000;
        if (elapsed < 0) {
          el.style.transform = `translate(0px, 0px) scaleX(${bunny.flip ? -1 : 1})`;
          return;
        }
        const progress = elapsed / bunny.duration;
        if (progress >= 1) {
          el.style.opacity = "0";
          return;
        }
        const totalWidth = bunny.hopCount * 2 * bunny.radius;
        const x = progress * totalWidth;
      const hopWidth = 2 * bunny.radius;
      const hopIndex = Math.floor(x / hopWidth);
      const localX = x - hopIndex * hopWidth;
      const offset = localX - bunny.radius;
      const y = -Math.sqrt(Math.max(0, bunny.radius * bunny.radius - offset * offset));
      const hopFlip = hopIndex % 2 === 0 ? 1 : -1;
      el.style.opacity = "1";
      const baseFlip = bunny.flip ? -1 : 1;
      el.style.transform = `translate(${x}px, ${y}px) scaleX(${baseFlip * hopFlip})`;
    });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const handleBunnyBurst = () => {
    const now = performance.now();
    const hopCount = 6;
    const radius = (window.innerWidth + 160) / (hopCount * 2);
    const burst = Array.from({ length: 1 }).map((_, index) => ({
      id: Math.floor(now) + index,
      bottom: 0,
      size: Math.random() * 16 + 24,
      duration: Math.random() * 1.4 + 3.2,
      flip: Math.random() > 0.5,
      radius,
      hopCount,
      startAt: now + (Math.random() * 0.25 + 0.05) * 1000,
    }));

    updateBunnies((prev) => [...prev, ...burst]);

    const maxDuration = Math.max(...burst.map((item) => item.duration));
    window.setTimeout(() => {
      updateBunnies((prev) => prev.filter((item) => item.id < Math.floor(now)));
    }, (maxDuration + 0.5) * 1000);
  };

  return (
    <div className="min-h-screen px-6 pb-16 pt-10 sm:px-10 lg:px-16">
      <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
        {bunnies.map((bunny, index) => (
          <img
            key={bunny.id}
            alt=""
            className="bunny-burst"
            src={bunnySources[index % bunnySources.length]}
            ref={(el) => {
              if (!el) {
                bunnyElsRef.current.delete(bunny.id);
                return;
              }
              bunnyElsRef.current.set(bunny.id, el);
            }}
            style={{
              bottom: `${bunny.bottom}vh`,
              width: `${bunny.size}px`,
              height: `${bunny.size}px`,
            }}
          />
        ))}
      </div>
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-12">
        <header className="flex flex-col gap-6 pb-4">
          <div className="space-y-4">
            <h1 className="font-display text-4xl font-semibold leading-tight text-[color:var(--foreground)] sm:text-5xl">
              Charlene Shao
            </h1>
            <p className="text-sm uppercase tracking-[0.35em] text-[color:var(--muted)]">
              Mechatronics Engineering Student @ UWaterloo
            </p>
          </div>
        </header>

        <section id="experience" className="space-y-6">
          <h2 className="text-lg font-bold uppercase tracking-[0.35em] text-[color:var(--foreground)]">Experience</h2>
          <div className="space-y-6">
            {experiences.map((role) => (
              <div key={`${role.company}-${role.role}`} className="space-y-2">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="flex items-start gap-3">
                    <div className="h-13 w-13 overflow-hidden rounded-lg border border-[color:var(--surface-2)] bg-[color:var(--surface)]">
                      <img
                        alt={`${role.company} logo`}
                        className="h-full w-full object-cover"
                        src={experienceLogos[role.company]}
                      />
                    </div>
                    <div className="space-y-1">
                      <p className="text-lg font-semibold text-[color:var(--foreground)]">{role.company}</p>
                    <p className="text-sm text-[color:var(--muted)]">{role.role}</p>
                    </div>
                  </div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--muted)]">
                    {role.date}
                  </p>
                </div>
                <p className="text-sm leading-6 text-[color:var(--muted)]">{role.summary}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="volunteering" className="space-y-6">
          <h2 className="text-lg font-bold uppercase tracking-[0.35em] text-[color:var(--foreground)]">
            Volunteering
          </h2>
          <div className="space-y-6">
            {volunteering.map((item) => (
              <div key={`${item.organization}-${item.role}`} className="space-y-2">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="flex items-start gap-3">
                    <div className="h-13 w-13 overflow-hidden rounded-lg border border-[color:var(--surface-2)] bg-[color:var(--surface)]">
                      <img
                        alt={`${item.organization} logo`}
                        className="h-full w-full object-cover"
                        src={volunteeringLogos[item.organization]}
                      />
                    </div>
                    <div className="space-y-1">
                      <p className="text-lg font-semibold text-[color:var(--foreground)]">
                        {item.role}
                      </p>
                      <p className="text-sm text-[color:var(--muted)]">{item.organization}</p>
                    </div>
                  </div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--muted)]">
                    {item.date.split("·")[0].trim()}
                  </p>
                </div>
                {item.location ? (
                  <div className="text-xs uppercase tracking-[0.2em] text-[color:var(--muted)]">
                    {item.location}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </section>

        <section id="education" className="space-y-4">
          <h2 className="text-lg font-bold uppercase tracking-[0.35em] text-[color:var(--foreground)]">Education</h2>
          <div className="space-y-2">
            <p className="text-lg font-semibold text-[color:var(--foreground)]">{education.school}</p>
            <p className="text-sm text-[color:var(--muted)]">{education.degree}</p>
            <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--muted)]">
              {education.date} · {education.distinction}
            </p>
            <p className="text-sm text-[color:var(--muted)]">{education.activities}</p>
          </div>
        </section>

        <footer className="flex flex-wrap items-center justify-center gap-4 pt-4 text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
          <button
            type="button"
            onClick={handleBunnyBurst}
            className="inline-flex items-center gap-1 transition-transform hover:scale-105"
          >
            Made with{" "}
            <img
              alt="Pixel heart"
              src="/pixel-heart.png"
              className="h-5 w-auto"
              style={{ imageRendering: "pixelated" }}
            />
            <span className="sr-only">Trigger bunny burst</span> in Waterloo, Ontario
          </button>
        </footer>
      </div>
    </div>
  );
}
