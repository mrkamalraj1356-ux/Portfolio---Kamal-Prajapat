import profileImg from '@/assets/profile.jpg';

export interface EducationItem {
  id: string;
  degree: string;
  institute: string;
  startYear: string;
  endYear: string;
  description: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  startYear: string;
  endYear: string;
  isPresent?: boolean;
  description: string;
}

export interface SkillCategory {
  id: string;
  category: string;
  title: string;
  icon: string;
  items: string[];
  order: number;
}

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  tech_stack: string[];
  github_url?: string;
  live_url?: string;
  featured?: boolean;
  visible?: boolean;
  order?: number;
  thumbnail_url?: string;
}

export interface CertificateItem {
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

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  message: string;
  avatar_url?: string;
  is_sample?: boolean;
}

export const PROFILE = {
  name: "Kamal Prajapat",
  firstName: "Kamal",
  lastName: "Prajapat",
  initials: "KP",
  role: "BCA Student | Aspiring Cybersecurity Professional",
  headline: "Building Practical Cybersecurity & Web Development Skills",
  email: "mrkamalraj556@gmail.com",
  phone: "+91 9256808975",
  whatsappUrl: "https://wa.me/919256808975",
  location: "Jaipur, Rajasthan, India",
  college: "Biyani College of Colleges, Jaipur, Rajasthan",
  educationStatus: "Bachelor of Computer Applications (BCA), 3rd Semester",

  careerObjective:
    "Building practical cybersecurity skills, learning to identify and understand security vulnerabilities, and preparing for cybersecurity internships and entry-level opportunities.",

  aboutTitle: "BCA Student & Aspiring Cybersecurity Professional",

  aboutDescription:
    "I am a BCA student at Biyani College, Jaipur, Rajasthan (currently in my 3rd semester), with a strong focus on cybersecurity, ethical hacking fundamentals, and computer networking. I am actively building hands-on capabilities with Linux environments (Kali Linux), network analysis tools, and web application security practices. Passionate about learning defense-in-depth principles and preparing for cybersecurity internships and entry-level security analyst roles.",

  profileImage: profileImg,
  resumePdfUrl: "/resume.pdf",

  socialLinks: {
    github: "https://github.com/mrkamalraj1356-ux",
    linkedin: "https://www.linkedin.com/in/kamal-prajapat-782770341/",
    email: "mailto:mrkamalraj556@gmail.com",
    whatsapp: "https://wa.me/919256808975"
  },

  careerInterests: [
    "Cybersecurity",
    "Ethical Hacking",
    "Vulnerability Assessment",
    "Web Application Security",
    "Linux Systems (Kali Linux)",
    "Computer Networking"
  ],

  stats: {
    experienceYears: "Pursuing",
    projectsCompleted: "3+",
    educationCount: 3,
    experienceCount: 1
  },

  education: [
    {
      id: "edu-1",
      degree: "Bachelor of Computer Applications (BCA)",
      institute: "Biyani College of Colleges, Jaipur, Rajasthan",
      startYear: "2025",
      endYear: "Present",
      description:
        "Currently pursuing in the 3rd semester. Practical academic foundations in C programming, Web Application Development, Database Systems, Computer Fundamentals, and Networking."
    },
    {
      id: "edu-2",
      degree: "Senior Secondary (Class XII – Biology)",
      institute: "Bharti School, Pachar, Jaipur",
      startYear: "2022",
      endYear: "2023",
      description:
        "Completed Class 12 with 71.40% under the Rajasthan State Board (RBSE)."
    },
    {
      id: "edu-3",
      degree: "Secondary School (Class X)",
      institute: "School Education, Rajasthan",
      startYear: "2020",
      endYear: "2021",
      description:
        "Completed Class 10 with 78.00% aggregate."
    }
  ] as EducationItem[],

  experience: [
    {
      id: "exp-1",
      role: "Academic Learning & Hands-On Security Labs",
      company: "Self-Directed Practical Learning",
      startYear: "2024",
      endYear: "Present",
      isPresent: true,
      description:
        "- Practicing foundational networking concepts including IP addressing, DNS resolution, and TCP/IP protocols.\n- Utilizing Kali Linux terminal commands and VirtualBox environments for cybersecurity exploration.\n- Building and refining practical web application projects to understand front-end architecture and web vulnerabilities.\n- Actively preparing for entry-level cybersecurity internships and SOC Analyst trainee roles."
    }
  ] as ExperienceItem[],

  skills: [
    {
      id: "skill-1",
      category: "Cybersecurity",
      title: "Cybersecurity & Defense",
      icon: "Shield",
      order: 1,
      items: [
        "Ethical Hacking Concepts",
        "Vulnerability Assessment",
        "Web Application Security",
        "OWASP Top 10 Basics",
        "Security Fundamentals"
      ]
    },
    {
      id: "skill-2",
      category: "Networking",
      title: "Networking & Protocols",
      icon: "Network",
      order: 2,
      items: [
        "Computer Networking",
        "IP Addressing & DNS",
        "TCP/IP & OSI Model",
        "Port Scanning Basics",
        "Traffic Flow Concepts"
      ]
    },
    {
      id: "skill-3",
      category: "Operating Systems",
      title: "OS & Environments",
      icon: "Terminal",
      order: 3,
      items: [
        "Kali Linux",
        "Linux Terminal Commands",
        "Windows",
        "VirtualBox",
        "Git & GitHub"
      ]
    },
    {
      id: "skill-4",
      category: "Web & Programming",
      title: "Web & Programming",
      icon: "Code",
      order: 4,
      items: [
        "HTML5",
        "CSS3",
        "JavaScript",
        "C Programming",
        "Python (Basics)",
        "Responsive Layouts"
      ]
    }
  ] as SkillCategory[],

  projects: [
    {
      id: "proj-1",
      name: "Horse County — Horse Farm Website",
      description:
        "Developing a website for a horse farm, with pages and structured content supporting horse information, farm overview, and customer enquiry flows.",
      tech_stack: ["Web Development", "HTML5", "CSS3", "JavaScript", "Responsive Design"],
      github_url: "https://github.com/mrkamalraj1356-ux",
      live_url: "",
      featured: true,
      visible: true,
      order: 1
    },
    {
      id: "proj-2",
      name: "Personal Portfolio & Security Web Tools",
      description:
        "A feature-rich personal portfolio and privacy-focused client-side utility suite featuring 40+ security inspection, document manipulation, and developer utilities.",
      tech_stack: ["React", "TypeScript", "Tailwind CSS", "Vite", "Cybersecurity Tools"],
      github_url: "https://github.com/mrkamalraj1356-ux",
      live_url: "",
      featured: true,
      visible: true,
      order: 2
    },
    {
      id: "proj-3",
      name: "AI Wallet Website",
      description:
        "Digital wallet and financial management interface exploring modern web design, responsive cards, and AI tools integration.",
      tech_stack: ["JavaScript", "HTML/CSS", "AI Tools", "UI Design"],
      github_url: "https://github.com/mrkamalraj1356-ux",
      live_url: "",
      featured: true,
      visible: true,
      order: 3
    }
  ] as ProjectItem[],

  certifications: [
    {
      id: "cert-1",
      title: "Getting Started with Artificial Intelligence",
      issuer: "IBM SkillsBuild",
      issue_date: "Oct 06, 2026",
      status: "Verified Credential",
      category: "Certifications",
      credential_link: "https://www.credly.com/badges/25078bed-481c-41e2-93fa-bcc4136febe2",
      image_url: "/ibm-ai-certificate.png",
      pdf_url: "/ibm-ai-certificate.pdf"
    },
    {
      id: "cert-2",
      title: "Lab: Troubleshoot Your Code Using IBM Bob",
      issuer: "IBM SkillsBuild",
      issue_date: "Oct 06, 2026",
      status: "Completed Lab (30 min)",
      category: "Training",
      credential_link: "/ibm-bob-certificate.pdf",
      image_url: "/ibm-bob-certificate.png",
      pdf_url: "/ibm-bob-certificate.pdf"
    }
  ] as CertificateItem[],

  testimonials: [
    {
      id: "test-1",
      name: "Sample Academic Mentor",
      role: "FACULTY ADVISOR",
      message: "Kamal demonstrates consistent curiosity, discipline, and a strong foundational mindset in computer applications and cybersecurity. He approaches every lab problem with enthusiasm and structured thinking.",
      is_sample: true
    },
    {
      id: "test-2",
      name: "Sample Project Collaborator",
      role: "PEER DEVELOPER",
      message: "Collaborating with Kamal on web projects highlights his attention to detail, reliability, and eagerness to learn modern technologies. He consistently delivers clean and structured work.",
      is_sample: true
    }
  ] as TestimonialItem[]
};
