import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Setup", to: "/setup" },
];

const linkBaseClass =
  "relative rounded-xl px-3 py-2 text-sm font-medium text-slate-200/90 transition duration-300 hover:text-cyan-200 after:absolute after:bottom-1 after:left-3 after:h-[2px] after:w-0 after:rounded-full after:bg-gradient-to-r after:from-indigo-400 after:via-violet-400 after:to-cyan-300 after:transition-all after:duration-300 hover:after:w-[calc(100%-1.5rem)]";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      setIsScrolled(current > 8);
      setIsVisible(current < lastScrollY.current || current < 80);
      lastScrollY.current = current;
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  return (
    <motion.header
      className="sticky top-3 z-50"
      animate={{ y: isVisible ? 0 : "-120%" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <nav
        className={`glass mx-auto flex w-full max-w-6xl items-center justify-between rounded-2xl px-4 py-3 transition-all duration-300 sm:px-6 ${
          isScrolled ? "shadow-neon" : ""
        }`}
      >
        <Link
          to="/"
          className="bg-gradient-to-r from-indigo-200 via-violet-300 to-cyan-500 bg-clip-text text-3xl font-mono tracking-tight text-transparent"
        >
          QuizForge
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `${linkBaseClass} ${isActive ? "text-cyan-200 after:w-[calc(100%-1.5rem)]" : ""}`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <button
            type="button"
            onClick={() =>
              navigate("/", {
                state: { launchJavaQuiz: true, ts: Date.now() },
              })
            }
            className={linkBaseClass}
          >
            Built-in Java Quiz
          </button>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-indigo-300/30 bg-slate-900/60 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <motion.span
            animate={isOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: -4 }}
            className="absolute h-[2px] w-5 rounded bg-cyan-200"
          />
          <motion.span
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            className="absolute h-[2px] w-5 rounded bg-cyan-200"
          />
          <motion.span
            animate={isOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 4 }}
            className="absolute h-[2px] w-5 rounded bg-cyan-200"
          />
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[90] md:hidden"
          >
            <button
              type="button"
              aria-label="Close menu overlay"
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="absolute right-2 top-2 bottom-[70%] w-[80%] max-w-xs flex flex-col border border-indigo-300/20 rounded-2xl bg-slate-950/98 p-5 shadow-[0_0_45px_rgba(61,216,255,0.15)]"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-300 bg-clip-text text-lg font-bold text-transparent">
                  Menu
                </span>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg border border-indigo-300/30 px-3 py-1 text-sm text-slate-200"
                >
                  Close
                </button>
              </div>
              <div className="h-px bg-indigo-300/10 mb-2" />

              <div className="space-y-2">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `block rounded-xl px-3 py-3 text-sm font-medium transition ${
                        isActive
                          ? "bg-white/10 text-cyan-200"
                          : "text-slate-200 hover:bg-white/5 hover:text-cyan-200"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    navigate("/", {
                      state: { launchJavaQuiz: true, ts: Date.now() },
                    });
                  }}
                  className="block w-full rounded-xl px-3 py-3 text-left text-sm font-medium text-slate-200 transition hover:bg-white/5 hover:text-cyan-200"
                >
                  Built-in Java Quiz
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
