import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, User } from "lucide-react";
import { api } from "@/services/api";
import { PROFILE } from "@/config/profile";

interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  message: string;
  avatar_url?: string;
  is_sample?: boolean;
}

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const data = await api.getPublicTestimonials();
      if (data && data.length > 0) {
        setTestimonials(data as any);
      } else {
        setTestimonials((PROFILE as any).testimonials || []);
      }
    } catch (error) {
      console.error("Failed to fetch testimonials:", error);
      setTestimonials((PROFILE as any).testimonials || []);
    } finally {
      setLoading(false);
    }
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  if (loading && testimonials.length === 0) {
    return (
      <section id="testimonials" className="py-24 relative overflow-hidden bg-[#030508]">
        <div className="text-center py-12">
          <div className="w-10 h-10 border-2 border-white/20 border-t-blue-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/40 text-sm">Loading testimonials...</p>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return null;
  }

  const current = testimonials[currentIndex];

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 80 : -80,
      opacity: 0,
      scale: 0.98,
    }),
  };

  return (
    <section id="testimonials" className="py-24 md:py-32 relative overflow-hidden bg-[#030508] select-none">
      {/* Soft background blue aura glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-blue-600/[0.04] blur-[140px] pointer-events-none rounded-full" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Client <span className="text-gradient-premium">Testimonials</span>
          </h2>
          <p className="text-white/50 text-sm md:text-base max-w-xl mx-auto font-light">
            Feedback, mentor recommendations, and collaborative project experiences.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-4xl mx-auto flex items-center justify-center">
          {/* Previous Arrow Button (Desktop Left) */}
          {testimonials.length > 1 && (
            <button
              onClick={handlePrev}
              aria-label="Previous Testimonial"
              className="hidden md:flex absolute -left-16 z-20 w-12 h-12 rounded-full border border-white/10 bg-black/40 hover:bg-white/10 backdrop-blur-md items-center justify-center text-white/60 hover:text-white hover:border-white/30 transition-all duration-300 active:scale-95 shadow-lg group"
            >
              <ChevronLeft size={22} className="group-hover:-translate-x-0.5 transition-transform" />
            </button>
          )}

          {/* Testimonial Card */}
          <div className="w-full relative min-h-[380px] md:min-h-[400px] flex items-center justify-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="w-full relative"
              >
                <div className="relative bg-[#07090f]/90 backdrop-blur-2xl border border-blue-500/20 rounded-[28px] p-8 md:p-14 shadow-[0_0_50px_-15px_rgba(37,99,235,0.12)] overflow-hidden">
                  {/* Decorative Large Quotation Mark in Upper Right */}
                  <div
                    className="absolute top-6 right-8 text-[#1a2948] select-none pointer-events-none font-serif text-7xl md:text-8xl leading-none font-black opacity-80"
                    aria-hidden="true"
                  >
                    ”
                  </div>

                  {/* Sample Content Disclosure Notice if placeholder */}
                  {current.is_sample && (
                    <div className="absolute top-4 left-6 text-[10px] tracking-wider text-blue-400/50 uppercase font-mono">
                      Sample Recommendation • Editable in profile.ts
                    </div>
                  )}

                  <div className="flex flex-col items-center text-center relative z-10 pt-4">
                    {/* Centered Circular Avatar Icon */}
                    <div className="w-20 h-20 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center mb-8 shadow-inner relative group">
                      <div className="absolute inset-0 rounded-full bg-blue-500/10 blur-md pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
                      {current.avatar_url ? (
                        <img
                          src={current.avatar_url}
                          alt={current.name}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <User className="w-8 h-8 text-white/50" strokeWidth={1.5} />
                      )}
                    </div>

                    {/* Centered Large Italic Testimonial Quote */}
                    <p className="text-lg md:text-2xl text-gray-300 italic font-light leading-relaxed max-w-2xl mx-auto mb-8 px-2 md:px-6">
                      "{current.message}"
                    </p>

                    {/* Reviewer Name */}
                    <h4 className="text-lg md:text-xl font-bold text-white tracking-wide">
                      {current.name}
                    </h4>

                    {/* Reviewer Designation in Blue */}
                    <p className="text-xs md:text-sm font-semibold tracking-wider text-blue-400 uppercase mt-1">
                      {current.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Next Arrow Button (Desktop Right) */}
          {testimonials.length > 1 && (
            <button
              onClick={handleNext}
              aria-label="Next Testimonial"
              className="hidden md:flex absolute -right-16 z-20 w-12 h-12 rounded-full border border-white/10 bg-black/40 hover:bg-white/10 backdrop-blur-md items-center justify-center text-white/60 hover:text-white hover:border-white/30 transition-all duration-300 active:scale-95 shadow-lg group"
            >
              <ChevronRight size={22} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          )}
        </div>

        {/* Mobile Navigation Controls (Arrows for touch/small screens) */}
        {testimonials.length > 1 && (
          <div className="flex md:hidden justify-center items-center gap-6 mt-6">
            <button
              onClick={handlePrev}
              aria-label="Previous Testimonial"
              className="w-10 h-10 rounded-full border border-white/10 bg-black/40 flex items-center justify-center text-white/70 active:scale-95"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next Testimonial"
              className="w-10 h-10 rounded-full border border-white/10 bg-black/40 flex items-center justify-center text-white/70 active:scale-95"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}

        {/* Pagination Dots (Elongated active blue pill + circular inactive dots) */}
        {testimonials.length > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? "w-8 h-1.5 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)]"
                    : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
