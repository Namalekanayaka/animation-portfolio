import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  AnimatePresence,
} from "framer-motion";

const AnimationPortfolio = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cursorSize, setCursorSize] = useState(20);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const projects = [
    {
      id: 1,
      title: "ETHEREAL STUDIOS",
      category: "BRANDING / DESIGN",
      year: "2024",
      color: "#ff6b6b",
      description:
        "Complete brand identity and visual system for a cutting-edge design studio.",
      image: "linear-gradient(135deg, #ff6b6b 0%, #ff8e8e 100%)",
    },
    {
      id: 2,
      title: "NEON DREAMS",
      category: "WEB EXPERIENCE",
      year: "2024",
      color: "#4ecdc4",
      description:
        "Immersive web experience with 3D elements and particle systems.",
      image: "linear-gradient(135deg, #4ecdc4 0%, #44a3aa 100%)",
    },
    {
      id: 3,
      title: "QUANTUM LABS",
      category: "UI/UX / DEV",
      year: "2023",
      color: "#95e1d3",
      description:
        "Revolutionary dashboard interface for quantum computing research.",
      image: "linear-gradient(135deg, #95e1d3 0%, #6dc5b8 100%)",
    },
    {
      id: 4,
      title: "DARK MATTER",
      category: "CREATIVE DEV",
      year: "2023",
      color: "#f38181",
      description:
        "Award-winning interactive installation combining art and technology.",
      image: "linear-gradient(135deg, #f38181 0%, #d66a6a 100%)",
    },
  ];

  const navigate = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <div className="bg-black text-white min-h-screen relative overflow-x-hidden">
      {/* Custom Cursor */}
      <motion.div
        className="fixed pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePos.x - cursorSize / 2,
          y: mousePos.y - cursorSize / 2,
          width: cursorSize,
          height: cursorSize,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      >
        <motion.div
          className="w-full h-full border-2 border-white rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 right-0 z-40 px-8 py-6 flex justify-between items-start bg-black/50 backdrop-blur-sm"
      >
        <motion.button
          onClick={() => navigate("home")}
          className="text-xs tracking-widest"
          whileHover={{ x: 5 }}
        >
          PORTFOLIO / 2024
        </motion.button>
        <div className="flex gap-12 text-xs tracking-widest">
          <motion.button
            onClick={() => navigate("work")}
            whileHover={{ y: -2, fontStyle: "italic" }}
          >
            WORK
          </motion.button>
          <motion.button
            onClick={() => navigate("about")}
            whileHover={{ y: -2, fontStyle: "italic" }}
          >
            ABOUT
          </motion.button>
          <motion.button
            onClick={() => setShowContact(true)}
            whileHover={{ y: -2, fontStyle: "italic" }}
          >
            CONTACT
          </motion.button>
          <motion.button
            onClick={() => setShowMenu(!showMenu)}
            whileHover={{ rotate: 90 }}
            transition={{ duration: 0.3 }}
          >
            ☰
          </motion.button>
        </div>
      </motion.nav>

      {/* Full Screen Menu Popup */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black flex items-center justify-center"
          >
            <motion.button
              onClick={() => setShowMenu(false)}
              className="absolute top-8 right-8 text-6xl"
              whileHover={{ rotate: 90, scale: 1.2 }}
            >
              ✕
            </motion.button>

            <div className="text-center space-y-8">
              {["HOME", "WORK", "ABOUT", "SERVICES", "CONTACT"].map(
                (item, i) => (
                  <motion.button
                    key={item}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    exit={{ opacity: 0, y: -50 }}
                    className="block text-7xl font-black tracking-tighter hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-500"
                    onClick={() => {
                      if (item === "CONTACT") setShowContact(true);
                      else navigate(item.toLowerCase());
                      setShowMenu(false);
                    }}
                    whileHover={{ x: 50, scale: 1.1 }}
                  >
                    {item}
                  </motion.button>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Popup */}
      <AnimatePresence>
        {showContact && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-8"
            onClick={() => setShowContact(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotateX: 90 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotateX: -90 }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-white text-black p-12 max-w-2xl w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                onClick={() => setShowContact(false)}
                className="absolute top-4 right-4 text-4xl"
                whileHover={{ rotate: 90, scale: 1.2 }}
              >
                ✕
              </motion.button>

              <motion.h2
                className="text-6xl font-black mb-8"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                LET'S TALK
              </motion.h2>

              <motion.div
                className="space-y-6"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div>
                  <label className="text-xs uppercase tracking-widest mb-2 block">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full p-4 border-2 border-black focus:outline-none focus:border-pink-500"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-widest mb-2 block">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full p-4 border-2 border-black focus:outline-none focus:border-pink-500"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-widest mb-2 block">
                    Project Brief
                  </label>
                  <textarea
                    className="w-full p-4 border-2 border-black focus:outline-none focus:border-pink-500 h-32"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <motion.button
                  className="w-full bg-black text-white p-4 text-xl font-black"
                  whileHover={{ scale: 1.02, backgroundColor: "#ff6b6b" }}
                  whileTap={{ scale: 0.98 }}
                >
                  SEND MESSAGE
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project Detail Popup */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-8"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0, rotateY: 90 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{ scale: 0.5, opacity: 0, rotateY: -90 }}
              transition={{ type: "spring", damping: 20 }}
              className="max-w-6xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                onClick={() => setSelectedProject(null)}
                className="absolute top-8 right-8 text-6xl text-white z-10 mix-blend-difference"
                whileHover={{ rotate: 90, scale: 1.2 }}
              >
                ✕
              </motion.button>

              <div className="grid md:grid-cols-2 gap-12">
                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="h-96 rounded-lg"
                  style={{ background: selectedProject.image }}
                />

                <motion.div
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-white"
                >
                  <div className="text-xs uppercase tracking-widest mb-4 text-gray-400">
                    {selectedProject.category} • {selectedProject.year}
                  </div>
                  <h2 className="text-6xl font-black mb-6">
                    {selectedProject.title}
                  </h2>
                  <p className="text-xl mb-8 leading-relaxed">
                    {selectedProject.description}
                  </p>

                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between border-b border-white/20 pb-2">
                      <span className="text-gray-400">CLIENT</span>
                      <span>Confidential</span>
                    </div>
                    <div className="flex justify-between border-b border-white/20 pb-2">
                      <span className="text-gray-400">DURATION</span>
                      <span>6 Months</span>
                    </div>
                    <div className="flex justify-between border-b border-white/20 pb-2">
                      <span className="text-gray-400">AWARDS</span>
                      <span>5 International</span>
                    </div>
                  </div>

                  <motion.button
                    className="w-full bg-white text-black p-4 text-xl font-black"
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: selectedProject.color,
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    VIEW FULL CASE STUDY
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Content */}
      <AnimatePresence mode="wait">
        {currentPage === "home" && (
          <HomePage
            projects={projects}
            setSelectedProject={setSelectedProject}
            setCursorSize={setCursorSize}
            navigate={navigate}
            setShowContact={setShowContact}
            smoothProgress={smoothProgress}
          />
        )}
        {currentPage === "work" && (
          <WorkPage
            projects={projects}
            setSelectedProject={setSelectedProject}
            setCursorSize={setCursorSize}
          />
        )}
        {currentPage === "about" && <AboutPage navigate={navigate} />}
        {currentPage === "services" && (
          <ServicesPage setShowContact={setShowContact} />
        )}
      </AnimatePresence>

      {/* Scroll Progress */}
      <motion.div
        className="fixed bottom-8 right-8 z-40 mix-blend-difference"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      >
        <svg className="w-12 h-12 -rotate-90">
          <circle
            cx="24"
            cy="24"
            r="20"
            stroke="white"
            strokeWidth="2"
            fill="none"
            opacity="0.3"
          />
          <motion.circle
            cx="24"
            cy="24"
            r="20"
            stroke="white"
            strokeWidth="2"
            fill="none"
            strokeDasharray="126"
            style={{
              strokeDashoffset: useTransform(smoothProgress, [0, 1], [126, 0]),
            }}
          />
        </svg>
      </motion.div>
    </div>
  );
};

const HomePage = React.memo(({
  projects,
  setSelectedProject,
  setCursorSize,
  navigate,
  setShowContact,
  smoothProgress,
}) => {
  const heroY = useTransform(smoothProgress, [0, 0.3], [0, 200]);
  const sculptureY = useTransform(smoothProgress, [0, 0.3], [0, -100]);
  const opacityHero = useTransform(smoothProgress, [0, 0.3], [1, 0]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero with Parallax */}
      <section className="min-h-screen relative flex items-center justify-between px-8 md:px-16 py-20 overflow-hidden">
        {/* Background with Profile Image */}
        <div className="absolute inset-0">
          {/* Profile Image Background Layer */}
          <motion.div
            className="absolute inset-0"
            style={{ y: useTransform(smoothProgress, [0, 0.3], [0, 50]) }}
          >
            <div className="absolute inset-0 opacity-20">
              <img
                src={require("./profile.jpg")}
                alt="Background"
                className="w-full h-full object-cover blur-sm"
              />
            </div>
            {/* Dark overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/85 to-black/90" />
          </motion.div>

          {/* Starry Night Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-purple-900/20 to-black/50">
            {/* Reduced Stars - Only 20 total for performance */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={`star-${i}`}
                className="absolute rounded-full bg-white"
                style={{
                  width: Math.random() * 2 + 1,
                  height: Math.random() * 2 + 1,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0.2, 0.8, 0.2],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}

            {/* Shooting Stars - Reduced to 2 */}
            {[...Array(2)].map((_, i) => (
              <motion.div
                key={`shooting-${i}`}
                className="absolute h-0.5 bg-gradient-to-r from-transparent via-white to-transparent"
                style={{
                  width: Math.random() * 100 + 80,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  rotate: -45,
                }}
                animate={{
                  x: [-1000, 1000],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 5,
                  repeatDelay: 10,
                }}
              />
            ))}

            {/* Nebula Clouds */}
            <motion.div
              className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                x: [0, 50, 0],
              }}
              transition={{ duration: 20, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"
              animate={{
                scale: [1.2, 1, 1.2],
                y: [0, -50, 0],
              }}
              transition={{ duration: 25, repeat: Infinity }}
            />

            {/* Reduced Floating Particles - Only 8 */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -100, 0],
                  x: [0, Math.random() * 50 - 25, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: Math.random() * 5 + 5,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                }}
              />
            ))}
          </div>
        </div>

        {/* Hero Text Content */}
        <motion.div
          className="w-full md:w-1/2 z-10 relative"
          style={{ y: heroY, opacity: opacityHero }}
        >
          <motion.div
            className="mb-6 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h1 className="text-[12vw] md:text-[7vw] font-black leading-none tracking-tighter">
              {["H", "E", "L", "L", "O"].map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 100, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ delay: i * 0.1, type: "spring", damping: 12 }}
                  whileHover={{ y: -20, color: "#ff6b6b", scale: 1.2 }}
                  className="inline-block"
                >
                  {letter}
                </motion.span>
              ))}
            </h1>
          </motion.div>

          <motion.h1 className="text-[12vw] md:text-[7vw] font-black leading-none tracking-tighter mb-8">
            {["I", " ", "A", "M", " ", "D", "A", "V", "I", "D"].map(
              (letter, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 100, rotateX: 90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{
                    delay: 0.5 + i * 0.08,
                    type: "spring",
                    damping: 12,
                  }}
                  whileHover={{ y: -20, scale: 1.2 }}
                  className="inline-block"
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              )
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="text-base md:text-lg max-w-xl mb-6 text-gray-300 leading-relaxed"
          >
            CREATIVE DEVELOPER & DESIGNER CRAFTING DIGITAL EXPERIENCES THAT PUSH
            BOUNDARIES
          </motion.p>

          <motion.button
            onClick={() => setShowContact(true)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.4, type: "spring" }}
            className="px-10 py-3 bg-white text-black font-black text-lg relative overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative z-10">START A PROJECT</span>
          </motion.button>
        </motion.div>

        {/* Large Profile Image Section - Similar to Reference */}
        <motion.div
          className="relative w-[500px] h-[600px] hidden md:block"
          style={{ y: sculptureY }}
          initial={{ opacity: 0, scale: 0.9, x: 100 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
        >
          <motion.div
            className="relative w-full h-full"
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              repeatType: "reverse"
            }}
          >
            {/* Soft Glow Background */}
            <motion.div
              className="absolute -inset-8 opacity-30 blur-3xl rounded-full"
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.25, 0.4, 0.25],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
              }}
            />

            {/* Main Image Container */}
            <div className="relative w-full h-full overflow-hidden rounded-3xl shadow-2xl">
              {/* High Quality Image */}
              <img
                src={require("./profile.jpg")}
                alt="Your Name"
                className="w-full h-full object-cover object-top"
              />

              {/* Subtle Bottom Gradient Fade */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>

            {/* Elegant Border Glow */}
            <motion.div
              className="absolute -inset-1 rounded-3xl pointer-events-none"
              animate={{
                boxShadow: [
                  "0 0 30px rgba(102, 126, 234, 0.3)",
                  "0 0 50px rgba(118, 75, 162, 0.5)",
                  "0 0 30px rgba(102, 126, 234, 0.3)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{
                background: "linear-gradient(135deg, rgba(102, 126, 234, 0.15), rgba(118, 75, 162, 0.15))",
                zIndex: -1,
              }}
            />

            {/* Floating Light Particles */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(102,126,234,0.5) 100%)",
                  left: `${10 + (i % 4) * 25}%`,
                  top: `${15 + Math.floor(i / 4) * 70}%`,
                  boxShadow: "0 0 15px rgba(255,255,255,0.7)",
                }}
                animate={{
                  y: [0, -50, 0],
                  opacity: [0.2, 1, 0.2],
                  scale: [0.8, 1.4, 0.8],
                }}
                transition={{
                  duration: 3 + i * 0.2,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut",
                }}
              />
            ))}

            {/* Corner Accent Lines - Top Left */}
            <motion.div
              className="absolute top-0 left-0 w-20 h-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-400 to-transparent" />
              <div className="absolute top-0 left-0 w-0.5 h-full bg-gradient-to-b from-purple-400 to-transparent" />
            </motion.div>

            {/* Corner Accent Lines - Bottom Right */}
            <motion.div
              className="absolute bottom-0 right-0 w-20 h-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 1.25 }}
            >
              <div className="absolute bottom-0 right-0 w-full h-0.5 bg-gradient-to-l from-pink-400 to-transparent" />
              <div className="absolute bottom-0 right-0 w-0.5 h-full bg-gradient-to-t from-pink-400 to-transparent" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Quick Projects Preview with Parallax */}
      <section className="py-32 px-8 md:px-16">
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-6xl font-black mb-16"
        >
          FEATURED WORK
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.slice(0, 4).map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              onClick={() => setSelectedProject(project)}
              className="cursor-pointer group relative h-96 overflow-hidden"
              style={{ background: project.image }}
            >
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/20 transition-all duration-500" />
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <motion.h3
                  className="text-4xl font-black mb-2"
                  whileHover={{ x: 10 }}
                >
                  {project.title}
                </motion.h3>
                <p className="text-sm uppercase tracking-widest text-gray-300">
                  {project.category}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.button
          onClick={() => navigate("work")}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          whileHover={{ scale: 1.05, x: 10 }}
          className="mt-16 px-8 py-4 border-2 border-white font-black text-xl"
        >
          VIEW ALL PROJECTS →
        </motion.button>
      </section>
    </motion.div>
  );
});

const WorkPage = React.memo(({ projects, setSelectedProject, setCursorSize }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="pt-32 px-8 md:px-16 min-h-screen"
    >
      <motion.h1
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="text-[15vw] font-black mb-16"
      >
        ALL WORK
      </motion.h1>

      <div className="space-y-2">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group border-t border-white/10 py-8 cursor-pointer hover:bg-white/5"
            onClick={() => setSelectedProject(project)}
            onMouseEnter={() => setCursorSize(80)}
            onMouseLeave={() => setCursorSize(20)}
            whileHover={{ x: 20 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <motion.div
                  className="text-6xl font-black text-gray-800 group-hover:text-white"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                >
                  {String(index + 1).padStart(2, "0")}
                </motion.div>
                <h3 className="text-4xl md:text-6xl font-black">
                  {project.title}
                </h3>
              </div>
              <div className="text-xs uppercase tracking-widest text-gray-500">
                {project.category}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
});

const AboutPage = React.memo(({ navigate }) => {
  const skills = [
    "React",
    "Three.js",
    "GSAP",
    "Framer Motion",
    "WebGL",
    "Node.js",
    "UI/UX",
    "Branding",
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 px-8 md:px-16 min-h-screen"
    >
      <div className="grid md:grid-cols-2 gap-16 mb-32">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <h1 className="text-[10vw] font-black leading-none mb-8">ABOUT ME</h1>
          <div className="space-y-6 text-lg">
            <p>
              I'm a creative developer and designer with over 8 years of
              experience crafting digital experiences that push the boundaries
              of what's possible on the web.
            </p>
            <p>
              My work combines technical expertise with creative vision to
              deliver projects that are both beautiful and functional.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-12"
        >
          <div>
            <h3 className="text-2xl font-black mb-4">SKILLS</h3>
            <div className="grid grid-cols-2 gap-4">
              {skills.map((skill, i) => (
                <motion.div
                  key={skill}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.05, type: "spring" }}
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "#fff",
                    color: "#000",
                  }}
                  className="border border-white p-4 text-center font-black"
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-black mb-4">ACHIEVEMENTS</h3>
            <div className="space-y-4">
              {["69 Awards Won", "150+ Projects", "50+ Happy Clients"].map(
                (item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-2 h-2 bg-white" />
                    <div className="text-xl">{item}</div>
                  </motion.div>
                )
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
});

const ServicesPage = React.memo(({ setShowContact }) => {
  const services = [
    {
      title: "UX/UI DESIGN",
      desc: "User-centered design that delights",
      icon: "🎨",
    },
    {
      title: "WEB DEVELOPMENT",
      desc: "Modern, performant web applications",
      icon: "💻",
    },
    { title: "BRANDING", desc: "Complete brand identity systems", icon: "✨" },
    { title: "3D & ANIMATION", desc: "Interactive 3D experiences", icon: "🎬" },
    { title: "CONSULTING", desc: "Strategic digital guidance", icon: "💡" },
    { title: "CREATIVE DIRECTION", desc: "Vision and execution", icon: "🎯" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 px-8 md:px-16 min-h-screen"
    >
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-[10vw] font-black mb-16"
      >
        SERVICES
      </motion.h1>

      <div className="grid md:grid-cols-3 gap-8">
        {services.map((service, i) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 50, rotateX: -30 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ delay: i * 0.1, type: "spring" }}
            whileHover={{ y: -20, scale: 1.05 }}
            className="border-2 border-white p-8 cursor-pointer group"
            onClick={() => setShowContact(true)}
          >
            <motion.div
              className="text-6xl mb-4"
              animate={{ rotate: [0, 10, 0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
            >
              {service.icon}
            </motion.div>
            <h3 className="text-2xl font-black mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-purple-500">
              {service.title}
            </h3>
            <p className="text-gray-400">{service.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
});

export default AnimationPortfolio;
