"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { 
  Terminal, Shield, ChevronDown, Sparkles, Github, Linkedin, Mail, 
  Briefcase, GraduationCap, Award, Server, Activity, Bug, Code2, 
  Cpu, Lock, Database, Network, ExternalLink, Download, FileText, Wrench
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ChatTerminal from "@/components/ChatTerminal";

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
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number; duration: number }>>([]);

  useEffect(() => {
    setMounted(true);
    setParticles(
      Array.from({ length: 30 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 10 + Math.random() * 20,
      }))
    );
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute w-[2px] h-[2px] rounded-full bg-emerald-500/30"
          initial={{
            x: `${p.x}%`,
            y: `${p.y}%`,
            opacity: 0,
          }}
          animate={{
            y: [`${p.y}%`, `${Math.random() * 100}%`, `${Math.random() * 100}%`, `${p.y}%`],
            x: [`${p.x}%`, `${Math.random() * 100}%`, `${Math.random() * 100}%`, `${p.x}%`],
            opacity: [0, 0.6, 0.6, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear",
            delay: p.delay,
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

// --- Tech Stack Marquee ---
function TechStackMarquee() {
  const stack = [
    "Solidity", "Foundry", "SentinelOne", "Wazuh", "Linux Server Admin", 
    "Burp Suite", "Python", "C", "ESP32", "Next.js", "TailwindCSS"
  ];
  
  // Duplicate for seamless loop
  const displayStack = [...stack, ...stack, ...stack];

  return (
    <div className="w-full overflow-hidden border-y border-zinc-900 bg-zinc-950/50 backdrop-blur-md py-4 mt-16 lg:mt-24 relative z-10 flex">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-zinc-950 to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-zinc-950 to-transparent z-10" />
      
      <motion.div
        className="flex whitespace-nowrap min-w-max gap-8 items-center"
        animate={{ x: ["0%", "-33.33%"] }}
        transition={{ ease: "linear", duration: 25, repeat: Infinity }}
      >
        {displayStack.map((tech, i) => (
          <div key={i} className="flex items-center gap-2 group">
            <span className="text-zinc-600 font-mono text-sm leading-none">•</span>
            <span className="text-zinc-500 font-mono text-sm leading-none tracking-wide hover:text-emerald-400 hover:glow-emerald transition-colors cursor-default">
              {tech}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// --- Hero Section ---
function HeroSection({ onOpenChat }: { onOpenChat: () => void }) {
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
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] as const } },
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-24 pb-0">
      <ParticlesBackground />
      <GridBackground />

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.765_0.177_163.223/0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Column */}
          <div className="text-center lg:text-left flex flex-col items-center lg:items-start">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm shadow-[0_0_10px_rgba(16,185,129,0.05)]">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span className="font-mono text-sm md:text-base text-emerald-400 glow-emerald">
                  {tagline}
                  {!taglineComplete && (
                    <span className="inline-block w-[2px] h-[1em] bg-emerald-400 ml-[2px] align-middle animate-blink" />
                  )}
                </span>
              </div>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={taglineComplete ? "visible" : "hidden"}
              className="flex flex-col items-center lg:items-start w-full"
            >
              <motion.h1
                variants={itemVariants}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
              >
                <span className="text-foreground">Architecting Security.</span>
                <br />
                <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-300 bg-clip-text text-transparent drop-shadow-sm">
                  Building Trust
                </span>
                <br />
                <span className="text-foreground">in a Decentralized World.</span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-base md:text-lg text-zinc-400 max-w-2xl mb-10 leading-relaxed text-center lg:text-left"
              >
                Information Security Engineer focused on bridging the gap between
                hardware (IoT/OT) and the blockchain (EVM). Identifying
                vulnerabilities before they are exploited.
              </motion.p>

              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4">
                <Button
                  variant="outline"
                  size="lg"
                  className="group font-mono text-sm border-emerald-500/30 text-emerald-400 hover:border-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-300 transition-all duration-300 hover:shadow-[0_0_15px_rgba(16,185,129,0.2)] cursor-pointer h-11 px-6"
                  onClick={() => {
                    document.getElementById("experience-bento")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <span className="text-zinc-500 group-hover:text-emerald-500/60 transition-colors mr-1">$</span>
                  ./execute_portfolio
                  <ChevronDown className="w-4 h-4 ml-1 group-hover:translate-y-0.5 transition-transform" />
                </Button>

                <Button
                  variant="ghost"
                  size="lg"
                  className="font-mono text-sm text-zinc-400 hover:text-emerald-400 hover:bg-zinc-800/50 transition-all duration-300 cursor-pointer h-11 px-6"
                  onClick={onOpenChat}
                >
                  <Sparkles className="w-4 h-4 mr-1 text-emerald-500/50" />
                  Access AI Assistant
                </Button>
              </motion.div>

              <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mt-12">
                <Badge variant="outline" className="border-emerald-900/50 text-emerald-400 font-mono text-xs bg-emerald-500/5 shadow-[0_0_10px_rgba(16,185,129,0.1)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block mr-1.5 animate-pulse glow-emerald" />
                  STATUS: ONLINE
                </Badge>
                <Badge variant="outline" className="border-zinc-800 text-zinc-500 font-mono text-xs bg-zinc-900/30">
                  <Shield className="w-3 h-3 mr-1.5" />
                  CCEP · CRTOM
                </Badge>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column: Digital Identity Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={taglineComplete ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
            className="flex justify-center lg:justify-end w-full perspective-1000"
          >
            <Card className="w-full max-w-sm bg-zinc-950/80 border-emerald-900/50 shadow-[0_0_20px_rgba(16,185,129,0.1)] backdrop-blur-md relative overflow-hidden group hover:border-emerald-500/50 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-600 via-emerald-400 to-emerald-600 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
              <CardContent className="p-8 pt-10 flex flex-col items-center text-center relative z-10">
                <div className="w-24 h-24 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6 shadow-inner relative group-hover:border-emerald-500/50 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all duration-500 overflow-hidden z-10">
                  <div className="absolute inset-0 bg-emerald-500/10 rounded-full blur-xl group-hover:bg-emerald-500/30 transition-colors z-0" />
                  <Image 
                    src="/profile.png" 
                    width={120} 
                    height={120} 
                    alt="Rakan Aji Pratama"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 z-10"
                  />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2 tracking-tight group-hover:text-emerald-50 transition-colors">Rakan Aji Pratama</h3>
                <p className="text-sm text-zinc-400 font-mono mb-6 leading-relaxed">
                  Information Security ||<br />IoT & OT Security Engineer
                </p>
                <div className="flex items-center gap-3">
                  <Button variant="outline" size="icon" className="border-zinc-800 hover:border-emerald-500/50 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all duration-300 rounded-full bg-zinc-900/50 hover:shadow-[0_0_10px_rgba(16,185,129,0.15)] hover:scale-110" asChild>
                    <a href="https://github.com/RakanAji" target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4" />
                      <span className="sr-only">GitHub</span>
                    </a>
                  </Button>
                  <Button variant="outline" size="icon" className="border-zinc-800 hover:border-emerald-500/50 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all duration-300 rounded-full bg-zinc-900/50 hover:shadow-[0_0_10px_rgba(16,185,129,0.15)] hover:scale-110" asChild>
                    <a href="https://linkedin.com/in/rakanaji" target="_blank" rel="noopener noreferrer">
                      <Linkedin className="w-4 h-4" />
                      <span className="sr-only">LinkedIn</span>
                    </a>
                  </Button>
                  <Button variant="outline" size="icon" className="border-zinc-800 hover:border-emerald-500/50 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all duration-300 rounded-full bg-zinc-900/50 hover:shadow-[0_0_10px_rgba(16,185,129,0.15)] hover:scale-110" asChild>
                    <a href="mailto:pratamarakanaji@gmail.com" target="_blank" rel="noopener noreferrer">
                      <Mail className="w-4 h-4" />
                      <span className="sr-only">Email</span>
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      <TechStackMarquee />
    </section>
  );
}

// --- Telemetry / System Metrics ---
function TelemetryMetrics() {
  const metrics = [
    { label: "Servers Hardened", value: "300+", suffix: "" },
    { label: "Cumulative GPA", value: "3.54", suffix: "" },
    { label: "Modules Mentored", value: "6", suffix: "" },
    { label: "Funding Awarded", value: "PKM KC", suffix: "" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
  };

  return (
    <section className="relative px-6 md:px-12 lg:px-24 mb-12 py-8 relative z-20">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          variants={containerVariants} 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {metrics.map((metric, i) => (
            <motion.div key={i} variants={itemVariants}>
              <Card className="bg-zinc-950/80 border-zinc-800/80 hover:border-emerald-500/40 backdrop-blur-md transition-all duration-300 hover:shadow-[0_8px_20px_rgba(16,185,129,0.08)] group overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <CardContent className="p-4 md:p-6 flex flex-col items-center justify-center text-center relative z-10 h-full">
                  <div className="text-3xl lg:text-4xl font-mono font-bold text-emerald-400 glow-emerald mb-2">
                    {metric.value}
                    <span className="text-xl lg:text-2xl">{metric.suffix}</span>
                  </div>
                  <div className="text-xs lg:text-sm text-zinc-500 font-mono tracking-tight uppercase group-hover:text-zinc-400 transition-colors">
                    {metric.label}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// --- Experience & Education Bento Grid ---
function ExperienceEducationBento() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
  };

  return (
    <section id="experience-bento" ref={ref} className="relative py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          
          <motion.div variants={itemVariants} className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
              <Terminal className="w-4 h-4 text-emerald-500/60" />
              <span className="font-mono text-sm text-emerald-400 glow-emerald">
                cat /var/log/career_path.log
              </span>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Span 2: PT DCI */}
            <motion.div variants={itemVariants} className="md:col-span-2">
              <Card className="h-full bg-zinc-950/40 border-zinc-800/50 hover:border-emerald-500/50 backdrop-blur-sm transition-all duration-300 hover:scale-[1.01] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(16,185,129,0.12)] group">
                <CardHeader className="pb-4 border-b border-zinc-800/30">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 group-hover:border-emerald-500/30 transition-colors shadow-inner">
                        <Server className="w-6 h-6 text-emerald-400" />
                      </div>
                      <div>
                        <CardTitle className="text-xl font-bold text-foreground group-hover:text-emerald-400 transition-colors tracking-tight">
                          Information Security Engineer
                        </CardTitle>
                        <CardDescription className="text-zinc-400 font-mono text-sm mt-1">
                          @ PT DCI Indonesia Tbk
                        </CardDescription>
                      </div>
                    </div>
                    <Badge variant="outline" className="border-zinc-800 text-zinc-400 font-mono text-xs whitespace-nowrap bg-zinc-900/50 transition-colors group-hover:border-emerald-900/50 group-hover:text-emerald-400 group-hover:bg-emerald-500/10">
                      Jul 2025 - Present
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-zinc-300 leading-relaxed mb-6 font-medium">
                    Spearheaded the security hardening of over <span className="text-emerald-400 font-bold">300+ Windows and Linux servers</span>. 
                    Monitored SIEM logs (Layer 3) to detect suspicious activities and execute rapid incident response. 
                    Conducted exhaustive Vulnerability Assessments and implemented SentinelOne (EDR) & Wazuh.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["SIEM Monitoring", "Server Hardening", "SentinelOne", "Wazuh", "Incident Response"].map(t => (
                      <Badge key={t} variant="secondary" className="bg-zinc-900/80 border border-zinc-800 text-zinc-400 font-mono text-xs flex items-center gap-1 group-hover:border-emerald-500/20">
                        <Activity className="w-3 h-3 text-emerald-500/50" /> {t}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Span 1: Practicum Assistant */}
            <motion.div variants={itemVariants} className="md:col-span-1">
              <Card className="h-full bg-zinc-950/40 border-zinc-800/50 hover:border-emerald-500/40 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(16,185,129,0.08)] group">
                <CardHeader className="pb-4">
                  <div className="p-2.5 bg-zinc-900 rounded-lg border border-zinc-800 w-fit mb-3 group-hover:border-emerald-500/30 transition-colors">
                    <Code2 className="w-5 h-5 text-emerald-500/70" />
                  </div>
                  <CardTitle className="text-lg font-bold text-foreground tracking-tight group-hover:text-emerald-100 transition-colors">
                    Practicum Assistant
                  </CardTitle>
                  <CardDescription className="text-zinc-500 font-mono text-xs">
                    @ Telkom University
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                    Guided students across <span className="text-emerald-400/90 font-medium">6 distinct technical modules</span>, demonstrating strong communication and leadership in explaining complex security and engineering concepts.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="border-zinc-800 text-zinc-500 text-[10px] font-mono"><Users className="w-3 h-3 mr-1" />Mentorship</Badge>
                    <Badge variant="outline" className="border-zinc-800 text-zinc-500 text-[10px] font-mono"><BookOpen className="w-3 h-3 mr-1" />Modules</Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Span 1: Dossier Download (Moved under Practicum Assistant) */}
            <motion.div variants={itemVariants} className="md:col-span-1">
              <Card className="h-full bg-zinc-950/40 border-zinc-800/50 hover:border-emerald-500/40 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(16,185,129,0.15)] group relative overflow-hidden flex flex-col justify-center items-center text-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardContent className="p-8 relative z-10 w-full flex flex-col items-center justify-center">
                  <div className="inline-flex items-center justify-center p-3 sm:p-4 bg-emerald-500/10 rounded-full mb-6 border border-emerald-500/20 group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all duration-500 shadow-inner">
                    <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-400 glow-emerald" />
                  </div>
                  <h3 className="font-mono text-sm text-emerald-400 mb-6 glow-emerald group-hover:tracking-wide transition-all">
                    &gt; ./download_dossier.sh
                  </h3>
                  <Button variant="outline" className="w-full max-w-[200px] border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-300 font-mono text-xs h-10 shadow-[0_0_15px_rgba(16,185,129,0.1)] transition-all">
                    <Download className="w-4 h-4 mr-2" />
                    [ Extract Resume ]
                  </Button>
                  <p className="text-[10px] text-zinc-500 mt-4 font-mono leading-relaxed max-w-[180px]">
                    Classified technical record.<br/> Authorized personnel only.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Span 1: Education */}
            <motion.div variants={itemVariants} className="md:col-span-1">
              <Card className="h-full bg-zinc-950/40 border-zinc-800/50 hover:border-emerald-500/40 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(16,185,129,0.08)] group relative overflow-hidden">
                <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <GraduationCap className="w-32 h-32" />
                </div>
                <CardHeader className="pb-4 relative z-10">
                  <div className="flex items-center gap-2 mb-2 text-emerald-500/70 group-hover:text-emerald-400 transition-colors border border-emerald-500/20 bg-emerald-500/5 w-fit px-2 py-1 rounded text-xs font-mono">
                    <GraduationCap className="w-3 h-3" /> EDU_RECORD
                  </div>
                  <CardTitle className="text-lg font-bold text-foreground leading-tight">Telkom University</CardTitle>
                  <CardDescription className="text-zinc-400 text-sm mt-1">
                    B.Eng Telecommunications
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div>
                        <p className="text-xs text-zinc-500 font-mono mb-1">GPA</p>
                        <p className="text-xl font-bold text-emerald-400 glow-emerald">3.54</p>
                      </div>
                      <div>
                        <p className="text-xs text-zinc-500 font-mono mb-1">Period</p>
                        <p className="text-sm text-zinc-300 font-medium mt-1">2021 &mdash; 2025</p>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-zinc-800/50">
                      <p className="text-xs text-zinc-500 font-mono mb-2">CAPSTONE_PROJECT</p>
                      <p className="text-zinc-400 text-sm leading-relaxed">
                        Automatic Speed Warning and Accident Detection.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Span 2: PT Angkasa Pura II */}
            <motion.div variants={itemVariants} className="md:col-span-2 relative">
              <Card className="h-full bg-zinc-950/40 border-zinc-800/50 hover:border-emerald-500/40 backdrop-blur-sm transition-all duration-300 hover:scale-[1.01] hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(16,185,129,0.08)] group">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 group-hover:border-emerald-500/30 transition-colors shadow-inner flex-shrink-0">
                        <Wrench className="w-6 h-6 text-emerald-500/70" />
                      </div>
                      <div>
                        <CardTitle className="text-xl font-bold text-foreground group-hover:text-emerald-100 transition-colors tracking-tight">
                          Intern / Electronic Technician
                        </CardTitle>
                        <CardDescription className="text-zinc-400 font-mono text-sm mt-1">
                          @ PT Angkasa Pura II
                        </CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-2">
                  <p className="text-zinc-300 leading-relaxed mb-6 font-medium">
                    Conducted preventive maintenance on airport electronic equipment. Repaired and troubleshot over <span className="text-emerald-400 font-bold">15 CCTV cameras</span> and <span className="text-emerald-400 font-bold">10 smoke detectors</span>. Calibrated electronic systems to reduce downtime.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="bg-zinc-900/80 border border-zinc-800 text-zinc-400 font-mono text-xs flex items-center gap-1 group-hover:border-emerald-500/20"><Wrench className="w-3 h-3 text-emerald-500/50" /> Preventive Maintenance</Badge>
                    <Badge variant="secondary" className="bg-zinc-900/80 border border-zinc-800 text-zinc-400 font-mono text-xs flex items-center gap-1 group-hover:border-emerald-500/20"><Activity className="w-3 h-3 text-emerald-500/50" /> Troubleshooting</Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Span 3: Certifications Vault */}
            <motion.div variants={itemVariants} className="md:col-span-3">
              <Card className="h-full bg-[radial-gradient(ellipse_at_top_right,rgba(16,185,129,0.05),transparent_50%)] bg-zinc-950/60 border-zinc-800/50 hover:border-emerald-500/50 backdrop-blur-sm transition-all duration-300 hover:scale-[1.01] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(16,185,129,0.12)] group overflow-hidden relative">
                 <div className="absolute right-0 bottom-0 opacity-[0.02] pointer-events-none transition-opacity group-hover:opacity-[0.05]">
                  <Shield className="w-64 h-64 -mb-12 -mr-12" />
                </div>
                <CardHeader className="pb-4 relative z-10 border-b border-zinc-800/30">
                   <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-emerald-500/10 rounded-xl border border-emerald-500/20 shadow-inner group-hover:border-emerald-500/50 group-hover:bg-emerald-500/20 transition-all">
                      <Award className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold text-foreground group-hover:text-emerald-50 transition-colors tracking-tight">
                        Credentials Vault
                      </CardTitle>
                      <CardDescription className="text-zinc-400 font-mono text-xs">
                        Verified Certifications & Licenses
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { 
                        name: "CRTOM", 
                        full: "Certified Red Team Operations Management", 
                        year: "2025", 
                        icon: <Bug className="w-5 h-5 text-rose-400" />,
                        link: "https://drive.google.com/file/d/1Mo04sac47Ce99C-Ti4QXeChPDkB9Uy-i/view?usp=sharing"
                      },
                      { 
                        name: "CCEP", 
                        full: "Certified Cybersecurity Educator Professional", 
                        year: "2025", 
                        icon: <Shield className="w-5 h-5 text-emerald-400" />,
                        link: "https://drive.google.com/file/d/1u6KjaqlC4c7oNOY0MdFvyR-MekrUfd6/view?usp=sharing"
                      },
                      { 
                        name: "AWS", 
                        full: "AWS Cloud Engineer Academy", 
                        year: "2024", 
                        icon: <Cloud className="w-5 h-5 text-blue-400" />,
                        link: null
                      },
                    ].map((cert, i) => (
                      <div key={i} className={`flex gap-4 p-5 rounded-xl bg-zinc-900/40 border border-zinc-800/50 hover:bg-zinc-900/80 hover:border-zinc-700 transition-all duration-300 relative ${cert.link ? 'cursor-pointer hover:-translate-y-1 hover:shadow-lg' : ''}`}>
                         {cert.link && (
                          <a href={cert.link} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-10 rounded-xl" aria-label={`View ${cert.name} certificate`} />
                         )}
                        <div className="shrink-0 p-3 bg-zinc-950 rounded-lg border border-zinc-800 self-start relative z-20 pointer-events-none">
                          {cert.icon}
                        </div>
                        <div className="flex-1 relative z-20 pointer-events-none">
                          <p className="text-zinc-200 font-bold tracking-tight text-sm flex items-center justify-between gap-2">
                            <span className="flex items-center gap-2">
                              {cert.name}
                              <Badge variant="outline" className="border-zinc-800 text-[9px] px-1.5 py-0 h-4 font-mono text-zinc-500">{cert.year}</Badge>
                            </span>
                            {cert.link && <ExternalLink className="w-3.5 h-3.5 text-zinc-500 transition-colors" />}
                          </p>
                          <p className="text-zinc-400 text-xs mt-1.5 leading-relaxed pr-2">{cert.full}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Additional icons needed for components
import { Cloud, BookOpen, Users } from "lucide-react";

// --- Projects Bento Grid ---
function ProjectsBento() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
  };

  return (
    <section id="projects-bento" ref={ref} className="relative py-16 px-6 md:px-12 lg:px-24 mb-24">
      <div className="max-w-6xl mx-auto">
        <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          
          <motion.div variants={itemVariants} className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
              <Terminal className="w-4 h-4 text-emerald-500/60" />
              <span className="font-mono text-sm text-emerald-400 glow-emerald">
                ls -la ~/projects
              </span>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Project 1: FractionalTokenManager */}
            <motion.div variants={itemVariants}>
              <Card className="h-full bg-zinc-950/60 border-zinc-800/50 hover:border-emerald-500/50 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(16,185,129,0.15)] group relative overflow-hidden flex flex-col">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay group-hover:opacity-10 transition-opacity" />
                <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-emerald-500/20 via-emerald-400 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <CardContent className="p-6 md:p-8 flex flex-col flex-1 relative z-10">
                  <div className="flex justify-between items-start mb-6 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-md">
                        <Database className="w-5 h-5 text-emerald-400" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground group-hover:text-emerald-400 transition-colors leading-tight">
                        Fractional<br className="hidden sm:block lg:hidden"/>TokenManager
                      </h3>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-emerald-500/10 hover:text-emerald-400 rounded-full shrink-0 text-zinc-500 bg-zinc-900/50" asChild>
                      <a href="https://github.com/RakanAji/FractionalTokenManager" target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-8 flex-1">
                    Solidity-based protocol to fractionalize <span className="text-emerald-400/80 font-mono text-xs">ERC721</span> NFTs into fungible <span className="text-emerald-400/80 font-mono text-xs">ERC20</span> tokens for shared ownership. Developed using Foundry with comprehensive unit/fuzzing tests and gas optimization deployment scripts.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {["Web3", "Solidity", "Foundry", "ERC721/ERC20"].map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-zinc-900/50 border border-emerald-900/30 text-emerald-400 font-mono text-xs hover:bg-emerald-900/20">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Project 2: Gyrocrash */}
            <motion.div variants={itemVariants}>
              <Card className="h-full bg-zinc-950/40 border-zinc-800/50 hover:border-cyan-500/50 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(34,211,238,0.1)] group relative overflow-hidden flex flex-col">
                <div className="absolute -right-12 -top-12 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl group-hover:bg-cyan-500/10 transition-colors" />
                
                <CardContent className="p-6 md:p-8 flex flex-col flex-1 relative z-10">
                  <div className="flex justify-between items-start mb-6 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-cyan-500/10 border border-cyan-500/20 rounded-md">
                        <Cpu className="w-5 h-5 text-cyan-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground group-hover:text-cyan-400 transition-colors leading-tight">
                          Gyrocrash
                        </h3>
                        <p className="text-xs text-zinc-500 font-mono mt-1">Motorcrash Alert & Autoengine Shutdown</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6 flex-1">
                    An innovative accident detection device using MPU 6050 sensor and NEO-6M GPS, integrated with a Telegram application for real-time alerts. 
                    <span className="block mt-2 text-cyan-400/80 text-xs font-semibold uppercase tracking-wider flex items-center gap-1">
                      <Award className="w-3 h-3" /> Secured PKM KC funding award (2024)
                    </span>
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {["IoT", "Hardware", "C/Python", "Telemetry"].map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-zinc-900 border border-zinc-800 text-zinc-400 font-mono text-xs group-hover:border-cyan-500/20 group-hover:text-cyan-400">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Project 3: Axiom Protocol */}
            <motion.div variants={itemVariants}>
              <Card className="h-full bg-zinc-950/40 border-zinc-800/50 hover:border-purple-500/50 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(168,85,247,0.1)] group relative overflow-hidden flex flex-col">
                <CardContent className="p-6 md:p-8 flex flex-col flex-1 relative z-10">
                  <div className="flex justify-between items-start mb-6 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-500/10 border border-purple-500/20 rounded-md">
                        <Network className="w-5 h-5 text-purple-400" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground group-hover:text-purple-400 transition-colors leading-tight">
                        Axiom Protocol
                      </h3>
                    </div>
                     <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-purple-500/10 hover:text-purple-400 rounded-full shrink-0 text-zinc-500 bg-zinc-900/50" asChild>
                      <a href="https://github.com/RakanAji/AxiomProtocol" target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-8 flex-1">
                    EVM Smart Contract implementation utilizing the EIP-2535 Diamond Pattern for highly secure and upgradable decentralized applications.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {["Web3", "Solidity", "EVM", "Security"].map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-zinc-900 border border-zinc-800 text-zinc-400 font-mono text-xs group-hover:border-purple-500/20 group-hover:text-purple-400">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Project 4: Accify */}
            <motion.div variants={itemVariants}>
              <Card className="h-full bg-zinc-950/40 border-zinc-800/50 hover:border-amber-500/50 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(245,158,11,0.1)] group relative overflow-hidden flex flex-col">
                <CardContent className="p-6 md:p-8 flex flex-col flex-1 relative z-10">
                  <div className="flex justify-between items-start mb-6 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-amber-500/10 border border-amber-500/20 rounded-md">
                        <Activity className="w-5 h-5 text-amber-400" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground group-hover:text-amber-400 transition-colors leading-tight">
                        Accify
                      </h3>
                    </div>
                     <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-amber-500/10 hover:text-amber-400 rounded-full shrink-0 text-zinc-500 bg-zinc-900/50" asChild>
                      <a href="https://github.com/RakanAji/accify-backend-django-mysql-mongodb" target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-8 flex-1">
                    Automatic motorcycle accident detection system utilizing IoT (ESP32) and real-time telemetry to trigger emergency alerts.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {["IoT", "ESP32", "Hardware", "Telemetry"].map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-zinc-900 border border-zinc-800 text-zinc-400 font-mono text-xs group-hover:border-amber-500/20 group-hover:text-amber-400">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}

// --- Main Page ---
export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <main className="relative bg-zinc-950 min-h-screen scanlines selection:bg-emerald-500/30">
      <HeroSection onOpenChat={() => setIsChatOpen(true)} />
      
      <TelemetryMetrics />
      {/* Reduced padding between sections for cohesive bento feel */}
      <div className="flex flex-col gap-4">
        <ExperienceEducationBento />
        <ProjectsBento />
      </div>
      
      <ChatTerminal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </main>
  );
}
