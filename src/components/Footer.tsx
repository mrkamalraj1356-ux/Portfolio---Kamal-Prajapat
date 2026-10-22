import { Github, Linkedin, Mail, Instagram, MessageCircle, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { PROFILE } from "@/config/profile";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Navigation", links: [
        { name: "About", href: "/#about" },
        { name: "Services", href: "/services" },
        { name: "Work", href: "/#projects" },
        { name: "Testimonials", href: "/#testimonials" },
        { name: "Certificates", href: "/#certificates" },
      ]
    },
    {
      title: "Quick Links", links: [
        { name: "Resume", href: "/#resume" },
        { name: "Contact", href: "/#contact" },
      ]
    }
  ];

  return (
    <footer className="bg-[#050505] border-t border-white/5 pt-20 pb-10 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-blue-900/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="block">
              <span className="text-2xl font-bold tracking-tighter text-white mix-blend-difference">
                KP<span className="text-blue-500">.</span>
              </span>
            </Link>
            <p className="text-white/60 leading-relaxed max-w-xs">
              {PROFILE.role}. Passionate about network security, ethical hacking, and web tools.
            </p>
            <div className="flex items-center gap-4">
              <SocialLink href={PROFILE.socialLinks.github} icon={Github} label="GitHub" />
              <SocialLink href={PROFILE.socialLinks.linkedin} icon={Linkedin} label="LinkedIn" />
              <SocialLink href={PROFILE.socialLinks.email} icon={Mail} label="Email" />
            </div>
          </div>

          {/* specific link columns */}
          {footerLinks.map((column, idx) => (
            <div key={idx}>
              <h3 className="text-white font-semibold mb-6">{column.title}</h3>
              <ul className="space-y-4">
                {column.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link
                      to={link.href}
                      className="text-white/50 hover:text-white transition-colors text-sm hover:translate-x-1 inline-block duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Column */}
          <div>
            <h3 className="text-white font-semibold mb-6">Contact</h3>
            <ul className="space-y-4">
              <li>
                <a href={PROFILE.socialLinks.email} className="flex items-center gap-3 text-white/50 hover:text-white transition-colors group">
                  <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="text-sm">{PROFILE.email}</span>
                </a>
              </li>
              <li>
                <a href={PROFILE.whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/50 hover:text-green-400 transition-colors group">
                  <div className="p-2 rounded-full bg-white/5 group-hover:bg-green-500/10 transition-colors">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <span className="text-sm">{PROFILE.phone}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/40">
          <p>&copy; {currentYear} {PROFILE.name}. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span>Built with</span>
            <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
            <span>by {PROFILE.name}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialLink = ({ href, icon: Icon, label }: { href: string; icon: any; label: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-white/60 hover:text-white hover:bg-white/10 hover:scale-110 transition-all duration-300"
    aria-label={label}
  >
    <Icon className="w-5 h-5" />
  </a>
);

export default Footer;
