"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const photoboothImages = [
  {
    src: "/photobooth/log.JPG",
    alt: "leading logistics at hack the north",
    caption: "leading logistics @ htn 2025"
  },
  {
    src: "/photobooth/ceremonies.png",
    alt: "me leading hack the north 2024 opening and closing ceremonies",
    caption: "leading ceremonies @ canada's biggest hackathon"
  },
  {
    src: "/photobooth/hackwestern.png",
    alt: "at hack western 2024",
    caption: "winning @ hack western"
  },
  {
    src: "/photobooth/cattleytics.PNG",
    alt: "demoing at cattleytics",
    caption: "demoing to farmers @ cattleytics"
  },
  {
    src: "/photobooth/robotics_project.png",
    alt: "in the robotics lab",
    caption: "building things that move"
  },
  {
    src: "/photobooth/hs.jpg",
    alt: "high school graduation",
    caption: "class of 2023 @ agincourt"
  },
  {
    src: "/photobooth/cc.png",
    alt: "children's council",
    caption: "children's council chair @ sickkids"
  },
  {
    src: "/photobooth/dancing.jpg",
    alt: "dancing with friends",
    caption: "dancing <3"
  },
  {
    src: "/photobooth/travel.JPG",
    alt: "in a cave",
    caption: "travelling <3"
  },
];

const experiences = [
  {
    company: "HubHead",
    role: "Machine Learning Engineer",
    type: "Co-op",
    date: "Sep 2025 - Dec 2025",
    location: "Toronto, Ontario · Remote",
    summary:
        "Scaled machine learning workflows and built cloud-native testing environments to streamline asset analysis.",
    link: "https://www.nrx.com/",
    tech: ["Python", "Typescript", "CSS", "Google Cloud Platform"],
  },
  {
    company: "Hack the North",
    role: "Logistics Lead",
    type: "Volunteer",
    date: "Jan 2025 - Sep 2025",
    location: "Waterloo, Ontario",
    summary:
        "Managed end-to-end event operations and a 9-member team for Canada’s largest hackathon.",
    link: "https://hackthenorth.com/",
    tech: ["Event Ops", "Team Leadership", "Project Management"],
  },
  {
    company: "Hack the North",
    role: "Logistics Organizer",
    type: "Volunteer",
    date: "Mar 2024 - Dec 2024",
    location: "Waterloo, Ontario",
    summary:
        "Orchestrated end-to-end logistics and stage production for Opening and Closing Ceremonies serving 1,000+ attendees.",
    link: "https://hackthenorth.com/",
    tech: ["Stage Production", "Logistics", "Event Planning"],
  },
  {
    company: "RBC",
    role: "Android Developer",
    type: "Co-op",
    date: "Jan 2025 - Apr 2025",
    location: "Toronto, Ontario · Hybrid",
    summary:
        "Developed on-device AI solutions and LLM agents to automate mobile features and developer workflows.",
    link: "https://www.rbc.com/canada.html",
    tech: ["Android", "Kotlin", "Java", "AI/ML"],
  },
  {
    company: "CATTLEytics",
    role: "Software & AI Developer",
    type: "Co-op",
    date: "May 2024 - Aug 2024",
    location: "Hamilton, Ontario · Remote",
    summary:
        "Built a generative AI assistant using RAG to provide actionable data insights for farm management.",
    link: "https://www.cattleytics.com/",
    tech: ["Python", "SQL", "RAG", "AI/ML"],
  },
];

const volunteering = [
  {
    organization: "University of Waterloo",
    role: "Promotions & Liaison Director - Women in Engineering",
    date: "Jan 2024 - Aug 2025 · 1 yr 8 mos",
    link: "https://uwaterloo.ca/women-in-engineering/",
  },
  {
    organization: "Agincourt Collegiate Institute",
    role: "President - Student Administrative Council",
    date: "Sep 2021 - Jun 2023 · 1 yr 10 mos",
    link: "https://schoolweb.tdsb.on.ca/agincourtci",
  },
  {
    organization: "The Hospital for Sick Children",
    role: "Children’s Council Member",
    date: "Sep 2015 - Jun 2023 · 7 yrs 10 mos",
    link: "https://www.sickkids.ca/en/patients-visitors/office-of-engagement/patient-advisory-council/",
  },
  {
    organization: "The Hospital for Sick Children",
    role: "Child Life Volunteer",
    date: "Jun 2022 · 1 mo",
    link: "https://www.sickkids.ca/en/care-services/support-services/child-life/",
  },
  {
    organization: "Canadian National Exhibition",
    role: "Friends of the CNE Volunteer",
    date: "Aug 2019 · 1 mo",
    link: "https://www.theex.com/",
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
  link: "https://uwaterloo.ca/future-students/programs/mechatronics-engineering"
};

const personalityPics = [
  { src: "/personality/bunny-coding.jpg", alt: "Me coding with bunnies", caption: "debugging with friends 🐰" },
  { src: "/personality/hackathon.jpg", alt: "At a hackathon", caption: "hackathon mode: on" },
  { src: "/personality/robotics.jpg", alt: "Building robots", caption: "building things that move" },
];

export default function Home() {
  const [introScrollProgress, setIntroScrollProgress] = useState(0);
  const hasEntered = introScrollProgress >= 1;
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
  const bunnyIdRef = useRef(0);
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
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      const viewportHeight = window.innerHeight || 1;
      const progress = Math.min(1, window.scrollY / viewportHeight);
      setIntroScrollProgress(progress);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const now = performance.now();
      bunniesRef.current.forEach((bunny) => {
        const el = bunnyElsRef.current.get(bunny.id);
        if (!el) return;
        const elapsed = (now - bunny.startAt) / 1000;
        if (elapsed < 0) {
          el.style.opacity = "0";
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
    if (hasEntered) {
      raf = requestAnimationFrame(tick);
    }
    return () => cancelAnimationFrame(raf);
  }, [hasEntered]);

  const handleBunnyBurst = () => {
    const now = performance.now();
    const width = typeof window === "undefined" ? 1200 : window.innerWidth;
    const radius = 56;
    const hopWidth = radius * 2;
    const hopCount = Math.max(3, Math.ceil((width + 200) / hopWidth));
    const duration = hopCount * 0.55;
    const burst = Array.from({ length: 1 }).map(() => ({
      id: (bunnyIdRef.current += 1),
      bottom: 0,
      size: Math.random() * 16 + 24,
      duration,
      flip: Math.random() > 0.5,
      radius,
      hopCount,
      startAt: now + Math.random() * 100,
    }));

    updateBunnies((prev) => [...prev, ...burst]);

    burst.forEach((item) => {
      const cleanupDelay = (item.duration + 0.8) * 1000;
      window.setTimeout(() => {
        updateBunnies((prev) => prev.filter((bunny) => bunny.id !== item.id));
        bunnyElsRef.current.delete(item.id);
      }, cleanupDelay);
    });
  };

  return (
      <div className="relative min-h-screen px-6 pb-16 pt-10 sm:px-10 lg:px-16">
        <div
            className="pointer-events-none fixed inset-0 z-0"
            style={{
              background: "#050505",
              opacity: 1 - introScrollProgress,
              transition: "opacity 0.15s ease-out",
            }}
        />

        <div className="fixed inset-0 z-0 pointer-events-none opacity-5">
          <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,#ff69b4_2px,#ff69b4_4px)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#ff69b4_1px,transparent_1px)] bg-[length:40px_40px]" />
        </div>

        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-40 left-20 w-64 h-64 bg-[#ff9ecd] rounded-full mix-blend-overlay filter blur-[128px] opacity-15 animate-float" />
          <div className="absolute bottom-40 right-20 w-80 h-80 bg-[#ffb3d9] rounded-full mix-blend-overlay filter blur-[128px] opacity-15 animate-float-slow" />
        </div>

        {hasEntered && (
            <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
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
        )}

        <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col gap-12">
          <header
              className="flex flex-col gap-6 pb-4 min-h-[calc(100vh-4rem)] justify-center items-center text-center"
              style={{
                opacity: 1 - introScrollProgress,
                transform: `translateY(${introScrollProgress * -40}px)`
              }}
          >
            <div className="flex flex-col gap-3">
              <button
                  type="button"
                  onClick={() => {
                    if (typeof window === "undefined") return;
                    window.scrollTo({
                      top: window.innerHeight,
                      behavior: "smooth",
                    });
                  }}
                  className={`font-display text-4xl font-semibold leading-tight sm:text-5xl focus:outline-none ${
                      hasEntered
                          ? "text-[color:var(--foreground)]"
                          : "text-white/90 hover:text-white hero-name-pulse"
                  }`}
              >
                Charlene Shao
              </button>

              <p
                  className={`text-sm uppercase tracking-[0.35em] ${
                      hasEntered
                          ? "text-[color:var(--muted)]"
                          : "text-white/70"
                  }`}
              >
                Mechatronics Engineering Student @ UWaterloo
              </p>

              {/* Social icons - centered row below */}
              <div className="flex justify-center items-center gap-4 mt-2">
                <a
                    href="https://www.linkedin.com/in/charlene-shao/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-opacity opacity-90 hover:opacity-100"
                >
                  <img
                      src="/linkedin.png"
                      alt="LinkedIn"
                      className="h-7 w-auto sm:h-8 image-rendering-pixelated"
                      style={{
                        imageRendering: "pixelated",
                        filter: hasEntered ? undefined : "brightness(0) invert(1)",
                      }}
                  />
                </a>

                <a
                    href="mailto:c6shao@uwaterloo.ca"
                    className="transition-opacity opacity-90 hover:opacity-100"
                >
                  <img
                      src="/email.png"
                      alt="Email"
                      className="h-7 w-auto sm:h-8 image-rendering-pixelated"
                      style={{
                        imageRendering: "pixelated",
                        filter: hasEntered
                            ? undefined
                            : "grayscale(1) invert(1) brightness(1.05)",
                      }}
                  />
                </a>

                <a
                    href="https://github.com/little-charchar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-opacity opacity-90 hover:opacity-100"
                >
                  <img
                      src="/github.png"
                      alt="GitHub"
                      className="h-7 w-auto sm:h-8 image-rendering-pixelated"
                      style={{
                        imageRendering: "pixelated",
                        filter: hasEntered ? undefined : "brightness(0) invert(1)",
                      }}
                  />
                </a>
              </div>
            </div>
          </header>

          <div
              className="space-y-16 transition-all duration-300"
              style={{
                transform: `translateY(${(1 - introScrollProgress) * 40}px)`
              }}
          >
            <div className="flex flex-col lg:flex-row lg:gap-8">
              <div className="flex-1 min-w-0">
                {/* Experience */}
                <section id="experience" className="space-y-6">
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold uppercase tracking-[0.35em] text-[color:var(--foreground)]">
                      EXPERIENCE
                    </h2>
                  </div>

                  <div className="space-y-4">
                    {experiences.map((role, index) => (
                        <a
                            key={`${role.company}-${role.role}`}
                            href={role.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block p-5 rounded-2xl transition-all duration-200 hover:translate-x-1 bg-white/40 backdrop-blur-sm border border-[#ff69b4]/10 hover:border-[#ff69b4]/30 shadow-sm"
                        >
                          <div className="flex flex-wrap items-start justify-between gap-3">
                            <div className="flex items-start gap-3">
                              <div
                                  className="h-12 w-12 rounded-xl overflow-hidden border border-[#ff69b4]/20 group-hover:border-[#ff69b4]/40 transition-colors shrink-0">
                                <img
                                    alt={`${role.company} logo`}
                                    className="h-full w-full object-cover"
                                    src={experienceLogos[role.company]}
                                />
                              </div>

                              <div>
                                <p className="text-base font-bold text-[color:var(--foreground)]">
                                  {role.company}
                                </p>
                                <p className="text-sm text-[#4a2a36]">
                                  {role.role}
                                </p>
                              </div>
                            </div>

                            <p className="text-xs font-mono text-[#4a2a36] bg-[#ff69b4]/5 px-3 py-1 rounded-full">
                              {role.date}
                            </p>
                          </div>

                          <p className="text-sm leading-relaxed text-[#3a2530] mt-4">
                            {role.summary}
                          </p>

                          {role.tech && (
                              <div className="flex flex-wrap gap-2 mt-4">
                                {role.tech.map((tech) => (
                                    <span
                                        key={tech}
                                        className="px-3 py-1 text-xs rounded-full bg-[#ff69b4]/10 text-[#d44c7a]"
                                    >
                    {tech}
                  </span>
                                ))}
                              </div>
                          )}
                        </a>
                    ))}
                  </div>
                </section>

                {/* Volunteering */}
                <section id="volunteering" className="space-y-6 mb-16 pt-12">
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold uppercase tracking-[0.35em] text-[color:var(--foreground)]">
                      VOLUNTEERING
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {volunteering.map((item) => (
                        <a
                            key={`${item.organization}-${item.role}`}
                            href={item.link}
                            className="group p-5 rounded-2xl transition-all duration-200 hover:translate-x-1 bg-white/40 backdrop-blur-sm border border-[#ff69b4]/10 hover:border-[#ff69b4]/30 shadow-sm"
                        >
                          <div className="flex items-start gap-3">
                            <div
                                className="h-12 w-12 rounded-xl overflow-hidden border border-[#ff69b4]/20 group-hover:border-[#ff69b4]/40 transition-colors shrink-0">
                              <img
                                  alt={`${item.organization} logo`}
                                  className="h-full w-full object-cover"
                                  src={volunteeringLogos[item.organization]}
                              />
                            </div>
                            <div className="flex-1">
                              <p className="text-base font-bold text-[color:var(--foreground)]">
                                {item.role}
                              </p>
                              <p className="text-sm text-[#4a2a36] mt-0.5">
                                {item.organization}
                              </p>
                              <p className="text-xs font-mono text-[#d44c7a] mt-2 bg-[#ff69b4]/5 px-3 py-1 rounded-full inline-block">
                                {item.date.split("·")[0].trim()}
                              </p>
                            </div>
                          </div>
                        </a>
                    ))}
                  </div>
                </section>

                {/* Education */}
                <section id="education" className="space-y-6">
                  <div className="flex items-center gap-2 px-4">
                    <h2 className="text-lg font-bold uppercase tracking-[0.35em] text-[color:var(--foreground)]">
                      EDUCATION
                    </h2>
                  </div>

                  <a href={education.link}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="block p-6 rounded-2xl transition-all duration-200 bg-white/40 backdrop-blur-sm border border-[#ff69b4]/10 hover:border-[#ff69b4]/30 shadow-sm hover:translate-x-1 cursor-pointer"
                  >
                    <p className="text-lg font-bold text-[color:var(--foreground)]">
                      {education.school}
                    </p>
                    <p className="text-base text-[#4a2a36] mt-1">
                      {education.degree}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-4">
                      <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#ff69b4]/10 text-[#d44c7a]">
                        {education.date}
                      </span>
                      <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#ff69b4]/10 text-[#d44c7a]">
                        {education.distinction}
                      </span>
                    </div>

                    <p className="text-sm text-[#3a2530] leading-relaxed mt-4 pt-4 border-t border-[#ff69b4]/10">
                      {education.activities}
                    </p>
                  </a>
                </section>
              </div>

              {/* Photostrip */}
              <div
                  className="lg:w-64 lg:shrink-0 mt-8 lg:mt-0"
                  style={{
                    transform: `translateY(${(1 - introScrollProgress) * 40}px)` // Just the slide
                  }}
              >
                <div className="relative">
                  <div className="absolute -inset-3 bg-[#ff69b4]/20 blur-xl rounded-3xl"/>
                  <div
                      className="relative bg-white/80 backdrop-blur-md p-3 rounded-2xl border-2 border-[#ff69b4]/30 shadow-xl">

                    <div className="absolute top-2 left-1/2 -translate-x-1/2 flex gap-6 z-10">
                      <div className="w-3 h-3 rounded-full bg-[#ff69b4]/40"/>
                      <div className="w-3 h-3 rounded-full bg-[#ff69b4]/40"/>
                    </div>

                    <div className="mt-8 mb-8 space-y-4">
                      {photoboothImages.map((image, index) => (
                          <div key={index} className="relative">
                            <div className="h-48 w-full rounded-lg overflow-hidden border-2 border-[#ff69b4]/20">
                              <img
                                  src={image.src}
                                  alt={image.alt}
                                  className="w-full h-full object-cover"
                                  style={{
                                    objectPosition: image.src.includes("hs") ? "center 70%" : "center"
                                  }}
                              />
                            </div>
                            <div
                                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white text-xs p-2 text-center">
                              {image.caption}
                            </div>
                          </div>
                      ))}
                    </div>

                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-6 z-10">
                      <div className="w-3 h-3 rounded-full bg-[#ff69b4]/40"/>
                      <div className="w-3 h-3 rounded-full bg-[#ff69b4]/40"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <footer className="relative pt-8 pb-4">
              <div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-[#ff69b4]/20 to-transparent h-px top-0"/>
              <div className="flex flex-col items-center gap-2">
                <button
                    type="button"
                    onClick={handleBunnyBurst}
                    className="group inline-flex items-center gap-2 px-4 py-2 rounded-full hover:bg-[#ff69b4]/5 transition-all duration-200"
                >
                  <span
                      className="text-xs uppercase tracking-[0.2em] text-[color:var(--muted)] group-hover:text-[#ff69b4]">
                    Made with
                  </span>
                  <img
                      alt="Pixel heart"
                      src="/pixel-heart.png"
                      className="h-4 w-auto group-hover:scale-110 transition-transform"
                      style={{imageRendering: "pixelated"}}
                  />
                  <span
                      className="text-xs uppercase tracking-[0.2em] text-[color:var(--muted)] group-hover:text-[#ff69b4]">
                    in Waterloo
                  </span>
                </button>
                <div className="flex gap-1 text-xs text-[color:var(--muted)]">
                </div>
              </div>
            </footer>
          </div>
        </div>

        <style jsx>{`
          @keyframes float {
            0%, 100% {
              transform: translateY(0px) scale(1);
            }
            50% {
              transform: translateY(-20px) scale(1.05);
            }
          }

          @keyframes float-slow {
            0%, 100% {
              transform: translateY(0px) scale(1);
            }
            50% {
              transform: translateY(20px) scale(0.95);
            }
          }

          .animate-float {
            animation: float 8s ease-in-out infinite;
          }

          .animate-float-slow {
            animation: float-slow 12s ease-in-out infinite;
          }
        `}</style>
      </div>
  );
}