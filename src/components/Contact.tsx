import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Mail, MapPin, Linkedin, Check, Zap, AlertCircle } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { PROFILE } from "@/config/profile";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    website: "" // Honeypot
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showFallbackMailto, setShowFallbackMailto] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setShowFallbackMailto(false);

    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedMessage = formData.message.trim();

    // 1. Field validation
    if (!trimmedName) {
      setFormError("Please enter your name.");
      return;
    }

    if (!trimmedEmail) {
      setFormError("Please enter your email address.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setFormError("Please enter a valid email address (e.g., name@example.com).");
      return;
    }

    if (!trimmedMessage) {
      setFormError("Please enter your message.");
      return;
    }

    if (trimmedMessage.length < 10) {
      setFormError("Please write at least 10 characters in your message.");
      return;
    }

    // Bot honeypot check
    if (formData.website && formData.website.trim() !== "") {
      setSubmitted(true);
      return;
    }

    setIsSubmitting(true);

    try {
      const rawWeb3Key = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
      const web3FormsKey = typeof rawWeb3Key === "string" ? rawWeb3Key.trim().replace(/^["']|["']$/g, "") : "";
      const hasValidWeb3Forms =
        Boolean(web3FormsKey) &&
        !web3FormsKey.includes("placeholder") &&
        !web3FormsKey.includes("your_access_key") &&
        !web3FormsKey.includes("your_web3forms");

      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      const hasValidSupabase =
        supabaseUrl &&
        supabaseAnonKey &&
        !supabaseUrl.includes("placeholder") &&
        !supabaseAnonKey.includes("placeholder");

      // Method 1: Web3Forms (direct client-side email delivery to owner inbox)
      if (hasValidWeb3Forms) {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            access_key: web3FormsKey,
            name: trimmedName,
            email: trimmedEmail,
            replyto: trimmedEmail,
            message: trimmedMessage,
            from_name: `${trimmedName} (Portfolio Contact)`,
            subject: `New Portfolio Message from ${trimmedName}`,
            botcheck: formData.website || undefined
          })
        });

        let data: any = null;
        try {
          data = await response.json();
        } catch {
          // If response body is non-JSON
        }

        if (!response.ok || !data?.success) {
          throw new Error(data?.message || `Failed to deliver message via Web3Forms (status: ${response.status}).`);
        }
      }
      // Method 2: Supabase (store in contact_messages table + edge function)
      else if (hasValidSupabase) {
        const { error: insertError } = await supabase
          .from("contact_messages")
          .insert([{
            name: trimmedName,
            email: trimmedEmail,
            message: trimmedMessage,
            read: false,
            resolved: false
          }]);

        if (insertError) {
          throw new Error(insertError.message || "Failed to save message to database.");
        }

        try {
          await supabase.functions.invoke("send-contact-mail", {
            body: {
              name: trimmedName,
              email: trimmedEmail,
              message: trimmedMessage
            }
          });
        } catch (edgeErr) {
          console.warn("Email notification function warning:", edgeErr);
        }
      }
      // Method 3: No service configured - honest error handling
      else {
        setShowFallbackMailto(true);
        throw new Error(
          "Email service is not configured yet. Add VITE_WEB3FORMS_ACCESS_KEY or Supabase keys to your .env file, or send your message directly using the mail button below."
        );
      }

      // ONLY display success if the message was genuinely processed
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "", website: "" });
      toast.success("Message sent successfully!");
    } catch (error: any) {
      console.error("Contact form error:", error);
      const errorMessage = error?.message || "Failed to send message. Please try again.";
      setFormError(errorMessage);
      setShowFallbackMailto(true);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const mailtoBody = [
    formData.message.trim(),
    "",
    "---",
    `Sender Name: ${formData.name.trim() || "Visitor"}`,
    formData.email.trim() ? `Sender Email: ${formData.email.trim()}` : ""
  ].filter(Boolean).join("\n");

  const mailtoHref = `mailto:${PROFILE.email}?subject=${encodeURIComponent(
    `Portfolio Inquiry from ${formData.name.trim() || "Visitor"}`
  )}&body=${encodeURIComponent(mailtoBody || formData.message.trim() || "")}`;

  return (
    <SectionWrapper id="contact">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight text-shadow-premium">
            Get in <span className="text-gradient-premium">Touch</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto font-light">
            Have a project in mind, an opportunity to discuss, or just want to connect? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto items-center">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="flex items-center gap-6 group">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-white shrink-0 group-hover:bg-blue-500/10 group-hover:border-blue-500/30 group-hover:scale-110 transition-all duration-300 shadow-premium">
                <Mail className="w-6 h-6 group-hover:text-blue-400 transition-colors" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Email</h3>
                <a href={PROFILE.socialLinks.email} className="text-white/60 hover:text-blue-400 transition-colors font-light">
                  {PROFILE.email}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-6 group">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-white shrink-0 group-hover:bg-purple-500/10 group-hover:border-purple-500/30 group-hover:scale-110 transition-all duration-300 shadow-premium">
                <MapPin className="w-6 h-6 group-hover:text-purple-400 transition-colors" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Location</h3>
                <p className="text-white/60 font-light">{PROFILE.location}</p>
              </div>
            </div>

            <div className="flex items-center gap-6 group">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-white shrink-0 group-hover:bg-blue-400/10 group-hover:border-blue-400/30 group-hover:scale-110 transition-all duration-300 shadow-premium">
                <Linkedin className="w-6 h-6 group-hover:text-blue-400 transition-colors" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">LinkedIn</h3>
                <a href={PROFILE.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-blue-400 transition-colors font-light">
                  Connect on LinkedIn
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl blur-2xl" />
            <div className="relative bg-white/[0.03] border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl overflow-hidden">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center justify-center text-center py-10"
                  >
                    <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
                      <Check className="w-10 h-10 text-green-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                    <p className="text-white/60 mb-8 max-w-xs mx-auto">
                      Thanks for reaching out. I'll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormError("");
                        setShowFallbackMailto(false);
                      }}
                      className="px-8 py-3 bg-white text-black font-bold rounded-lg hover:bg-white/90 transition-all active:scale-[0.98] shadow-premium"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    noValidate
                    className="space-y-6"
                  >
                    <div>
                      <label htmlFor="contact-name" className="text-xs uppercase font-bold text-white/40 mb-2 block tracking-wider">
                        Your Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (formError) setFormError("");
                        }}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/30 focus:bg-black/60 transition-all placeholder:text-white/30"
                        placeholder="Enter your full name"
                        disabled={isSubmitting}
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="text-xs uppercase font-bold text-white/40 mb-2 block tracking-wider">
                        Your Email
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (formError) setFormError("");
                        }}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/30 focus:bg-black/60 transition-all placeholder:text-white/30"
                        placeholder="Enter your email address"
                        disabled={isSubmitting}
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-message" className="text-xs uppercase font-bold text-white/40 mb-2 block tracking-wider">
                        Message
                      </label>
                      <textarea
                        id="contact-message"
                        value={formData.message}
                        onChange={(e) => {
                          setFormData({ ...formData, message: e.target.value });
                          if (formError) setFormError("");
                        }}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/30 focus:bg-black/60 transition-all min-h-[120px] placeholder:text-white/30"
                        placeholder="Enter your message here..."
                        disabled={isSubmitting}
                      />
                    </div>

                    {/* Honeypot field for bot spam protection */}
                    <input
                      type="text"
                      name="website"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      style={{ position: "absolute", left: "-5000px" }}
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                    />

                    {/* Error Box */}
                    {formError && (
                      <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-left">
                        <div className="flex items-start gap-2.5">
                          <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                          <div className="text-sm text-red-300 leading-relaxed">
                            <p>{formError}</p>
                            {showFallbackMailto && (
                              <div className="mt-3 pt-3 border-t border-red-500/20">
                                <a
                                  href={mailtoHref}
                                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 px-3 py-1.5 rounded-md transition-colors"
                                >
                                  <Mail size={14} /> Send Directly via Your Email App
                                </a>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        disabled={isSubmitting}
                        type="submit"
                        className="w-full py-4 bg-white text-black font-bold rounded-lg hover:bg-white/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.99] shadow-[0_0_20px_rgba(255,255,255,0.2)] flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                            Sending Message...
                          </>
                        ) : (
                          <>
                            Send Message <Zap size={18} className="fill-black" />
                          </>
                        )}
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Contact;
