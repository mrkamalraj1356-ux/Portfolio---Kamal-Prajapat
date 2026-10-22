import { motion, AnimatePresence } from "framer-motion";
import { Award, ExternalLink, Eye, Download, X, CheckCircle2, Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import { api } from "@/services/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SectionWrapper from "@/components/ui/SectionWrapper";
import GlassCard from "@/components/ui/GlassCard";
import { PROFILE } from "@/config/profile";

interface CertificateDisplay {
  id: string;
  title: string;
  issuer: string;
  issue_date?: string;
  status: string;
  credential_link?: string;
  image_url?: string;
  pdf_url?: string;
  category?: string;
}

const Certifications = () => {
  const [certificates, setCertificates] = useState<CertificateDisplay[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [previewCert, setPreviewCert] = useState<CertificateDisplay | null>(null);

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const data = await api.getCertificates();
      if (data && data.length > 0) {
        setCertificates(data as any);
      } else {
        setCertificates(PROFILE.certifications as any);
      }
    } catch (error) {
      console.error("Failed to fetch certificates:", error);
      setCertificates(PROFILE.certifications as any);
    } finally {
      setLoading(false);
    }
  };

  const displayCertificates = certificates.length > 0 ? certificates : (PROFILE.certifications as any);

  const categories = ["All", "Certifications", "Training"];

  const filteredCertificates = displayCertificates.filter((cert) => {
    if (activeCategory === "All") return true;
    if (activeCategory === "Certifications") return cert.category === "Certifications" || !cert.category;
    if (activeCategory === "Training") return cert.category === "Training";
    return true;
  });

  return (
    <SectionWrapper id="certificates">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight text-shadow-premium">
            Certifications & <span className="text-gradient-premium">Training</span>
          </h2>
          <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto font-light">
            Verified academic and professional technical credentials from accredited programs.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap justify-center items-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] scale-105"
                    : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-white/5"
                }`}
              >
                {cat === "All" ? "All Credentials" : cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {filteredCertificates.map((cert: CertificateDisplay, index: number) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <GlassCard className="h-full group p-0 overflow-hidden rounded-3xl border border-white/10 hover:border-blue-500/30 transition-all duration-500 bg-[#080a10]/80 shadow-2xl flex flex-col">
                {/* Certificate Image Banner */}
                <div
                  className="aspect-[16/10] bg-[#050608] border-b border-white/10 flex items-center justify-center relative overflow-hidden p-3 cursor-pointer group/img"
                  onClick={() => setPreviewCert(cert)}
                  title="Click to enlarge certificate"
                >
                  <div className="absolute inset-0 bg-radial-gradient from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {cert.image_url ? (
                    <img
                      src={cert.image_url}
                      alt={`${cert.title} certificate`}
                      className="w-full h-full object-contain rounded-lg transition-transform duration-500 group-hover/img:scale-105 drop-shadow-xl"
                      loading="lazy"
                    />
                  ) : (
                    <div className="bg-white/5 p-6 rounded-full relative z-10">
                      <Award className="w-12 h-12 text-white/40" />
                    </div>
                  )}

                  {/* Hover Overlay with Enlarge Prompt */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 backdrop-blur-[2px]">
                    <span className="px-3 py-1.5 rounded-full bg-blue-600/90 text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg">
                      <Eye size={14} /> Click to Enlarge
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start gap-3 mb-3">
                    <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
                      {cert.title}
                    </h3>
                    <Badge
                      variant="outline"
                      className="shrink-0 bg-blue-500/10 border-blue-500/30 text-blue-400 text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 flex items-center gap-1"
                    >
                      <CheckCircle2 size={12} className="text-blue-400" />
                      {cert.status || "Verified"}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between text-xs text-white/50 mb-6">
                    <span className="font-medium text-white/70">{cert.issuer}</span>
                    {cert.issue_date && (
                      <span className="flex items-center gap-1 text-white/40">
                        <Calendar size={12} /> {cert.issue_date}
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="mt-auto pt-4 border-t border-white/5 flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPreviewCert(cert)}
                      className="flex-1 bg-white/5 border-white/10 text-white/80 hover:text-white hover:bg-white/10 rounded-xl gap-1.5 text-xs font-medium"
                    >
                      <Eye size={14} /> Preview
                    </Button>

                    {cert.credential_link && (
                      <Button
                        variant="default"
                        size="sm"
                        className="flex-1 bg-blue-600 hover:bg-blue-500 text-white rounded-xl gap-1.5 text-xs font-semibold shadow-md"
                        asChild
                      >
                        <a
                          href={cert.credential_link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Verify <ExternalLink size={13} />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Certificate Preview Modal */}
        <AnimatePresence>
          {previewCert && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setPreviewCert(null)}
                className="absolute inset-0 bg-black/90 backdrop-blur-md"
              />

              {/* Modal Content */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="relative bg-[#0b0e17] border border-blue-500/30 rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-hidden flex flex-col shadow-[0_0_80px_rgba(37,99,235,0.25)] z-10"
              >
                {/* Header */}
                <div className="p-4 md:p-6 border-b border-white/10 flex items-center justify-between bg-black/40">
                  <div>
                    <h3 className="text-base md:text-xl font-bold text-white leading-tight">
                      {previewCert.title}
                    </h3>
                    <p className="text-xs md:text-sm text-blue-400 mt-0.5">
                      {previewCert.issuer} {previewCert.issue_date && `• ${previewCert.issue_date}`}
                    </p>
                  </div>
                  <button
                    onClick={() => setPreviewCert(null)}
                    className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                    aria-label="Close certificate preview"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Certificate Display Area */}
                <div className="flex-1 overflow-auto p-4 md:p-8 flex items-center justify-center bg-[#05060a]">
                  {previewCert.image_url ? (
                    <img
                      src={previewCert.image_url}
                      alt={previewCert.title}
                      className="max-h-[65vh] w-auto max-w-full object-contain rounded-lg shadow-2xl border border-white/10"
                    />
                  ) : (
                    <div className="p-12 text-center text-white/40">No preview image available</div>
                  )}
                </div>

                {/* Footer Controls */}
                <div className="p-4 md:p-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 bg-black/40">
                  <Badge variant="outline" className="border-blue-500/30 text-blue-400 bg-blue-500/10">
                    {previewCert.status || "Verified Certificate"}
                  </Badge>

                  <div className="flex items-center gap-3">
                    {previewCert.pdf_url && (
                      <a
                        href={previewCert.pdf_url}
                        download
                        className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs md:text-sm font-semibold flex items-center gap-1.5 transition-colors"
                      >
                        <Download size={14} /> Download PDF
                      </a>
                    )}

                    {previewCert.credential_link && (
                      <a
                        href={previewCert.credential_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs md:text-sm font-semibold flex items-center gap-1.5 shadow-md transition-colors"
                      >
                        Verify Credential <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </SectionWrapper>
  );
};

export default Certifications;
