import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { fetchBuiltInJavaQuiz } from "../services/api.js";
import { useQuiz } from "../context/QuizContext.jsx";

const LandingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { startQuiz, resetQuiz } = useQuiz();
  const [loadingJava, setLoadingJava] = useState(false);
  const hasAutoStarted = useRef(false);

  const handleStartJavaQuiz = async () => {
    try {
      setLoadingJava(true);
      const quiz = await fetchBuiltInJavaQuiz();
      startQuiz({
        quizData: quiz,
        quizSettings: {
          content: "Built-in Java quiz",
          difficulty: quiz.difficulty,
          questionType: quiz.questionType,
          questionCount: quiz.questions.length,
          timeBound: false,
        },
      });
      navigate("/quiz");
    } finally {
      setLoadingJava(false);
    }
  };

  useEffect(() => {
    if (!location.state?.launchJavaQuiz || hasAutoStarted.current) return;
    hasAutoStarted.current = true;
    handleStartJavaQuiz();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state?.launchJavaQuiz]);

  return (
    <section className="relative flex h-[calc(100dvh-6.5rem)] items-center overflow-hidden">
      <div className="relative w-full">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"
          />
        </div>
        <div className="mx-auto max-w-2xl py-10 sm:py-14 lg:py-16">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-400 ring-1 ring-white/10 hover:ring-white/20 sm:text-sm">
              Introducing QuizForge -{" "}
              <span className="text-cyan-300">⚡</span>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">
              Build and take quizzes in a flash
            </h1>
            <p className="mt-6 text-sm font-medium text-pretty text-gray-400 sm:text-xl/6">
              QuizForge is your go-to platform for creating and taking quizzes
              with ease. Whether you're a student looking to test your knowledge
              or a teacher aiming to engage your class, QuizForge has got you
              covered.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
                // repeatDelay: 0, // pause between bounces
              }}
              className="mt-10 flex items-center justify-center gap-x-6"
            >
              <Link
                to="/setup"
                className="rounded-md bg-indigo-500 w-[25%] px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Get started
              </Link>
              {/* <a href="#" className="text-sm/6 font-semibold text-white">
                Learn more <span aria-hidden="true">→</span>
              </a> */}
            </motion.div>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-288.75"
          />
        </div>
      </div>
    </section>
  );
};

export default LandingPage;
