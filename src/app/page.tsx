"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Terminal, Shield, ChevronDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// --- Terminal Typing Effect Hook ---
function useTypingEffect(text: string, speed: number = 80, delay: number = 0) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let charIndex = 0;

    const startTyping = () => {
      timeout = setInterval(() => {
        if (charIndex < text.length) {
          setDisplayedText(text.slice(0, charIndex + 1));
          charIndex++;
        } else {
          clearInterval(timeout);
          setIsComplete(true);
        }
      }, speed);
    };

    const delayTimeout = setTimeout(startTyping, delay);
    return () => {
      clearTimeout(delayTimeout);
      clearInterval(timeout);
    };
  }, [text, speed, delay]);

  return { displayedText, isComplete };
}

// --- Floating Particles Background ---
function ParticlesBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-[2px] h-[2px] rounded-full bg-emerald-500/30"
          initial={{
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
            opacity: 0,
          }}
          animate={{
            y: [
              `${Math.random() * 100}%`,
              `${Math.random() * 100}%`,
              `${Math.random() * 100}%`,
            ],
            x: [
              `${Math.random() * 100}%`,
              `${Math.random() * 100}%`,
              `${Math.random() * 100}%`,
            ],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 10 + Math.random() * 20,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
}

// --- Grid Background Pattern ---
function GridBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(oklch(0.765 0.177 163.223 / 0.3) 1px, transparent 1px),
            linear-gradient(90deg, oklch(0.765 0.177 163.223 / 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
}

// --- Hero Section ---
function HeroSection() {
  const { displayedText: tagline, isComplete: taglineComplete } =
    useTypingEffect("root@rakan:~# whoami", 70, 500);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 2.5 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] as const },
    },
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 md:px-12 overflow-hidden">
      <ParticlesBackground />
      <GridBackground />

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.765_0.177_163.223/0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Terminal Tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span className="font-mono text-sm md:text-base text-emerald-400 glow-emerald">
              {tagline}
              {!taglineComplete && (
                <span className="inline-block w-[2px] h-[1em] bg-emerald-400 ml-[2px] align-middle animate-blink" />
              )}
            </span>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={taglineComplete ? "visible" : "hidden"}
        >
          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
          >
            <span className="text-foreground">Architecting Security.</span>
            <br />
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-300 bg-clip-text text-transparent">
              Building Trust
            </span>
            <br />
            <span className="text-foreground">in a Decentralized World.</span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            variants={itemVariants}
            className="text-base md:text-lg text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Information Security Engineer focused on bridging the gap between
            hardware (IoT/OT) and the blockchain (EVM). Identifying
            vulnerabilities before they are exploited.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              variant="outline"
              size="lg"
              className="group font-mono text-sm border-emerald-500/30 text-emerald-400 hover:border-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-300 transition-all duration-300 cursor-pointer h-11 px-6"
              onClick={() => {
                document
                  .getElementById("about")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <span className="text-zinc-500 group-hover:text-emerald-500/60 transition-colors mr-1">
                $
              </span>
              ./execute_portfolio
              <ChevronDown className="w-4 h-4 ml-1 group-hover:translate-y-0.5 transition-transform" />
            </Button>

            <Button
              variant="ghost"
              size="lg"
              className="font-mono text-sm text-zinc-400 hover:text-emerald-400 hover:bg-zinc-800/50 transition-all duration-300 cursor-pointer h-11 px-6"
            >
              <Sparkles className="w-4 h-4 mr-1" />
              Access AI Assistant
            </Button>
          </motion.div>

          {/* Status badges */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-3 mt-12"
          >
            <Badge
              variant="outline"
              className="border-zinc-800 text-zinc-500 font-mono text-xs bg-transparent"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block mr-1.5 animate-pulse" />
              STATUS: ONLINE
            </Badge>
            <Badge
              variant="outline"
              className="border-zinc-800 text-zinc-500 font-mono text-xs bg-transparent"
            >
              <Shield className="w-3 h-3 mr-1.5" />
              CCEP · CRTOM
            </Badge>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-zinc-600 text-xs font-mono">scroll</span>
          <ChevronDown className="w-4 h-4 text-zinc-600" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// --- About Section ---
function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] as const },
    },
  };

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-24 md:py-32 px-6 md:px-12"
    >
      <GridBackground />

      <div className="relative z-10 max-w-3xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Section Title */}
          <motion.div variants={itemVariants} className="mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
              <span className="text-zinc-500 font-mono text-sm">&gt;</span>
              <span className="font-mono text-sm text-emerald-400 glow-emerald">
                cat about.txt
              </span>
            </div>
          </motion.div>

          {/* About Card */}
          <motion.div variants={itemVariants}>
            <Card className="bg-zinc-950/50 border-zinc-800/50 backdrop-blur-sm ring-0 shadow-none">
              <CardContent className="p-6 md:p-8">
                <div className="space-y-5 text-zinc-400 leading-relaxed text-sm md:text-base">
                  <p>
                    I am an{" "}
                    <span className="text-foreground font-medium">
                      Information Security Engineer
                    </span>{" "}
                    at{" "}
                    <span className="text-emerald-400 font-mono text-sm">
                      PT DCI Indonesia
                    </span>
                    , where my daily operations revolve around protecting
                    critical infrastructure and mitigating vulnerabilities
                    within complex{" "}
                    <span className="text-foreground font-medium">
                      IoT and OT networks
                    </span>
                    . I thrive at the intersection of offensive security and
                    system architecture.
                  </p>

                  <p>
                    Beyond the enterprise perimeter, I am deeply invested in the{" "}
                    <span className="text-foreground font-medium">
                      Web3 space
                    </span>
                    . I actively explore the EVM ecosystem, focusing on{" "}
                    <span className="text-emerald-400 font-mono text-sm">
                      smart contract security
                    </span>{" "}
                    and implementing advanced architectural patterns to ensure
                    decentralized applications remain tamper-proof and
                    upgradable.
                  </p>

                  <p>
                    My foundation in technology is built on a strong academic
                    track record (graduating with a{" "}
                    <span className="text-foreground font-medium">
                      3.54 GPA
                    </span>
                    ) and a passion for mentoring. As a{" "}
                    <span className="text-foreground font-medium">
                      Practicum Assistant
                    </span>
                    , I guided students across{" "}
                    <span className="text-emerald-400 font-mono text-sm">
                      6 distinct technical modules
                    </span>
                    , honing my ability to communicate complex security concepts
                    effectively.
                  </p>

                  <p>
                    Currently holding{" "}
                    <span className="text-foreground font-medium">
                      CCEP and CRTOM
                    </span>{" "}
                    certifications, I am constantly evolving my offensive
                    security capabilities to stay ahead of the threat landscape.
                  </p>
                </div>

                {/* Terminal-style footer */}
                <div className="mt-8 pt-6 border-t border-zinc-800/50">
                  <div className="flex flex-wrap gap-2">
                    {[
                      "IoT/OT",
                      "Smart Contracts",
                      "EVM",
                      "Offensive Security",
                      "System Architecture",
                      "Web3",
                    ].map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="border-zinc-800 text-zinc-500 bg-transparent font-mono text-xs hover:border-emerald-500/30 hover:text-emerald-400 transition-colors cursor-default"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Terminal prompt after card */}
          <motion.div variants={itemVariants} className="mt-6">
            <div className="font-mono text-sm text-zinc-600">
              <span className="text-emerald-500/40">root@rakan:~#</span>{" "}
              <span className="animate-blink inline-block w-[8px] h-[14px] bg-emerald-500/40" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// --- Main Page ---
export default function Home() {
  return (
    <main className="relative bg-zinc-950 min-h-screen scanlines">
      <HeroSection />
      <AboutSection />
    </main>
  );
}
