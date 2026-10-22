import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy, useState, useEffect } from "react";
import { AnimatePresence, MotionConfig } from "framer-motion";
import Index from "./pages/Index";
import { NotFoundPage } from "./pages/NotFoundPage";
import SecurityCheck from "./components/SecurityCheck";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

// Lazy load admin and detail pages
const BlogDetail = lazy(() => import("./pages/BlogDetail"));
const BlogPage = lazy(() => import("./pages/Blog"));
const Login = lazy(() => import("./pages/admin/Login"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const Projects = lazy(() => import("./pages/admin/Projects"));
const Testimonials = lazy(() => import("./pages/admin/Testimonials"));
const Messages = lazy(() => import("./pages/admin/Messages"));
const Certificates = lazy(() => import("./pages/admin/Certificates"));
const Blogs = lazy(() => import("./pages/admin/Blogs"));
const Skills = lazy(() => import("./pages/admin/Skills"));
const EasterEggs = lazy(() => import("./pages/admin/EasterEggs"));
const Logs = lazy(() => import("./pages/admin/Logs"));
const AdminLayout = lazy(() => import("./layouts/AdminLayout"));
const SectionControls = lazy(() => import("./pages/admin/SectionControls"));
const BrandingSettings = lazy(() => import("./pages/admin/BrandingSettings"));
const ResumeSettings = lazy(() => import("./pages/admin/ResumeSettings"));
const AboutSettings = lazy(() => import("./pages/admin/AboutSettings"));
const EasterEggsPublic = lazy(() => import("./pages/EasterEggsPublic"));
const ServicesPage = lazy(() => import("./pages/Services"));
const ServiceAvailabilityAdmin = lazy(() => import("./components/ServiceAvailabilityAdmin"));

// Tools Pages
const ToolsOverview = lazy(() => import("./pages/Tools/ToolsOverview"));
const IPAddress = lazy(() => import("./pages/Tools/Cyber/IPAddress"));
const PasswordStrength = lazy(() => import("./pages/Tools/Cyber/PasswordStrength"));
const HashGenerator = lazy(() => import("./pages/Tools/Cyber/HashGenerator"));
const URLSafety = lazy(() => import("./pages/Tools/Cyber/URLSafety"));
const QRCodeGenerator = lazy(() => import("./pages/Tools/Developer/QRCodeGenerator"));
const AttackSurfaceAnalyzer = lazy(() => import("./pages/Tools/Cyber/AttackSurfaceAnalyzer"));
const ParameterDiscovery = lazy(() => import("./pages/Tools/Cyber/ParameterDiscovery"));
const InputReflectionTester = lazy(() => import("./pages/Tools/Cyber/InputReflectionTester"));
const SecurityHeadersAnalyzer = lazy(() => import("./pages/Tools/Cyber/SecurityHeadersAnalyzer"));
const CookieSecurityAnalyzer = lazy(() => import("./pages/Tools/Cyber/CookieSecurityAnalyzer"));
const CorsMisconfigAnalyzer = lazy(() => import("./pages/Tools/Cyber/CorsMisconfigAnalyzer"));
const JwtAnalyzer = lazy(() => import("./pages/Tools/Cyber/JwtAnalyzer"));
const OwaspMapper = lazy(() => import("./pages/Tools/Cyber/OwaspMapper"));
const CyberTips = lazy(() => import("./pages/Tools/Cyber/CyberTips"));
const MiniTools = lazy(() => import("./pages/Tools/Developer/MiniTools"));
const RegexTester = lazy(() => import("./pages/Tools/Developer/RegexTester"));
const MarkdownConverter = lazy(() => import("./pages/Tools/Developer/MarkdownConverter"));
const ColorTools = lazy(() => import("./pages/Tools/Developer/ColorTools"));
const ImageCompressor = lazy(() => import("./pages/Tools/Developer/ImageCompressor"));
// PDFTools removed
const PDFDashboard = lazy(() => import("./pages/Tools/PDF/PDFDashboard"));
const MergePDF = lazy(() => import("./pages/Tools/PDF/MergePDF"));
const SplitPDF = lazy(() => import("./pages/Tools/PDF/SplitPDF"));
const CompressPDF = lazy(() => import("./pages/Tools/PDF/CompressPDF"));


// const PDFToExcel = lazy(() => import('./pages/Tools/PDF/PDFToExcel'));
// const PDFToPPTX = lazy(() => import('./pages/Tools/PDF/PDFToPPTX'));

const RemovePages = lazy(() => import('./pages/Tools/PDF/RemovePages'));
const ExtractPages = lazy(() => import('./pages/Tools/PDF/ExtractPages'));
const OrganizePDF = lazy(() => import('./pages/Tools/PDF/OrganizePDF'));
const RepairPDF = lazy(() => import('./pages/Tools/PDF/RepairPDF'));
const OCRPDF = lazy(() => import('./pages/Tools/PDF/OCRPDF'));
const EditPDF = lazy(() => import('./pages/Tools/PDF/EditPDF'));
const CropPDF = lazy(() => import('./pages/Tools/PDF/CropPDF'));
const WatermarkPDF = lazy(() => import('./pages/Tools/PDF/WatermarkPDF'));
const PageNumbersPDF = lazy(() => import('./pages/Tools/PDF/PageNumbersPDF'));
const RotatePDF = lazy(() => import('./pages/Tools/PDF/RotatePDF'));
const ProtectPDF = lazy(() => import('./pages/Tools/PDF/ProtectPDF'));
const UnlockPDF = lazy(() => import('./pages/Tools/PDF/UnlockPDF'));
const RedactPDF = lazy(() => import('./pages/Tools/PDF/RedactPDF'));
const SignPDF = lazy(() => import('./pages/Tools/PDF/SignPDF'));
const ComparePDF = lazy(() => import('./pages/Tools/PDF/ComparePDF'));
const MetadataPDF = lazy(() => import('./pages/Tools/PDF/MetadataPDF'));



const ScanPDF = lazy(() => import("./pages/Tools/PDF/ScanPDF"));


// const PDFToPDFA = lazy(() => import("./pages/Tools/PDF/PDFToPDFA"));
// const SummarizePDF = lazy(() => import("./pages/Tools/PDF/SummarizePDF"));
// const ChatPDF = lazy(() => import("./pages/Tools/PDF/ChatPDF"));
const CyberDashboard = lazy(() => import("./pages/Tools/Cyber/CyberDashboard"));
const OtherDashboard = lazy(() => import("./pages/Tools/Developer/OtherDashboard"));
const BusinessDashboard = lazy(() => import("./pages/Tools/Business/BusinessDashboard"));
const InvoiceGenerator = lazy(() => import("./pages/Tools/Business/InvoiceGenerator"));
const GstInvoiceGenerator = lazy(() => import("./pages/Tools/Business/GstInvoiceGenerator"));
const EmiCalculator = lazy(() => import("./pages/Tools/Business/EmiCalculator"));
const GstCalculator = lazy(() => import("./pages/Tools/Business/GstCalculator"));
const FinancialPlanner = lazy(() => import("./pages/Tools/Business/FinancialPlanner"));

const TimeDateTools = lazy(() => import("./pages/Tools/Developer/TimeDateTools"));
const NetworkPing = lazy(() => import("./pages/Tools/Cyber/NetworkPing"));
import { AuthProvider } from "./contexts/AuthContext";
import { SiteControlsProvider } from "@/contexts/SiteControlsContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import ErrorBoundary from "./components/ErrorBoundary";

const queryClient = new QueryClient();

import { EasterEggsProvider } from "./contexts/EasterEggsContext";
import { BrandingProvider } from "./contexts/BrandingContext";
// PDFToolsProvider removed
import GlobalLayout from "./components/GlobalLayout";
import EasterEggEngine from "./components/EasterEggEngine";
import ScrollToHashElement from "./components/ScrollToHashElement";
// CursorTrail and SpotlightEffect removed for better performance

// Supabase function URL
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const VERIFY_TURNSTILE_URL = SUPABASE_URL ? `${SUPABASE_URL.replace('.supabase.co', '')}.functions.supabase.co/verify-turnstile` : '';


const App = () => {
  const [verified, setVerified] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(null);

  // Reset verification on page load to always show SecurityCheck
  useEffect(() => {
    setVerified(false);
  }, []);

  const handleVerified = async (token: string) => {
    console.log("Security check completed, proceeding to site");
    setVerified(true);
  };

  if (!verified) {
    return <SecurityCheck onVerified={handleVerified} externalError={verificationError} />;
  }

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <EasterEggsProvider>
            <SiteControlsProvider>
              <BrandingProvider>
                <TooltipProvider>
                  <MotionConfig reducedMotion="user">
                    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                      {/* CursorTrail and SpotlightEffect removed for performance */}
                      <GlobalLayout>
                        <ScrollToHashElement />
                        <Suspense fallback={<LoadingSpinner />}>
                          <Routes>
                            <Route path="/" element={<Index />} />
                            
                            {/* Removed Sections - Clean Redirects */}
                            <Route path="/blog" element={<Navigate to="/" replace />} />
                            <Route path="/blog/:slug" element={<Navigate to="/" replace />} />
                            <Route path="/easter-eggs" element={<Navigate to="/" replace />} />
                            <Route path="/secret" element={<Navigate to="/" replace />} />
                            <Route path="/tools" element={<Navigate to="/" replace />} />
                            <Route path="/tools/*" element={<Navigate to="/" replace />} />

                            <Route path="/services" element={<ServicesPage />} />
                            <Route path="/hire" element={<ServicesPage />} />

                            {/* Admin Routes */}
                            <Route path="/admin/login" element={<Login />} />
                            <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
                              <Route index element={<Navigate to="/admin/dashboard" replace />} />
                              <Route path="dashboard" element={<Dashboard />} />
                              <Route path="about" element={<AboutSettings />} />
                              <Route path="service-availability" element={<ServiceAvailabilityAdmin />} />
                              <Route path="projects" element={<Projects />} />
                              <Route path="testimonials" element={<Testimonials />} />
                              <Route path="messages" element={<Messages />} />
                              <Route path="certificates" element={<Certificates />} />
                              <Route path="blogs" element={<Blogs />} />
                              <Route path="skills" element={<Skills />} />
                              <Route path="resume" element={<ResumeSettings />} />
                              <Route path="easter-eggs" element={<EasterEggs />} />
                              <Route path="logs" element={<Logs />} />
                              <Route path="section-controls" element={<SectionControls />} />
                              <Route path="branding" element={<BrandingSettings />} />
                            </Route>

                            {/* Catch-all */}
                            <Route path="*" element={<NotFoundPage />} />
                          </Routes>
                        </Suspense>
                      </GlobalLayout>
                    </BrowserRouter>
                  </MotionConfig>
                  <Toaster />
                  <Sonner />
                </TooltipProvider>
              </BrandingProvider>
            </SiteControlsProvider>
          </EasterEggsProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
