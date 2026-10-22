import React from 'react';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SectionWrapper from "@/components/ui/SectionWrapper";

const faqs = [
    {
        question: "What are your primary areas of study and technical focus?",
        answer: "I am a BCA student at Biyani College, Jaipur, currently in my 3rd semester. My main focus areas are cybersecurity fundamentals, computer networking (IP addressing, DNS, protocols), Linux environments (Kali Linux), and secure web development."
    },
    {
        question: "Are you open to internships and entry-level opportunities?",
        answer: "Yes, absolutely! I am actively seeking cybersecurity internships, SOC analyst trainee opportunities, and junior technical roles where I can contribute enthusiastically and strengthen my practical skills."
    },
    {
        question: "Which tools and operating systems do you practice with?",
        answer: "I regularly practice in Kali Linux and Windows using VirtualBox, working with Linux terminal commands, network tools like Nmap and Wireshark basics, and web tools with Git and GitHub."
    },
    {
        question: "What web utilities are available on this portfolio platform?",
        answer: "This platform includes over 40 client-side utilities across cybersecurity inspection (HTTP headers, hash generator, URL safety, JWT analyzer), zero-upload document and PDF management, and everyday developer tools."
    },
    {
        question: "How can recruiters and collaborators get in touch with you?",
        answer: "You can reach out via email at mrkamalraj556@gmail.com, connect with me on LinkedIn at linkedin.com/in/kamal-prajapat-782770341, or message me via WhatsApp at +91 9256808975."
    }
];

const FAQ = () => {
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    };

    return (
        <SectionWrapper id="faq">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-white/60 text-lg font-light">
                        Quick answers to common questions about my technical expertise and security approach.
                    </p>
                </motion.div>

                <Accordion type="single" collapsible className="w-full space-y-4">
                    {faqs.map((faq, index) => (
                        <AccordionItem 
                            key={index} 
                            value={`item-${index}`}
                            className="border border-white/10 rounded-2xl bg-white/[0.02] px-6 py-2 overflow-hidden"
                        >
                            <AccordionTrigger className="text-left text-white hover:text-blue-400 font-medium text-lg transition-colors py-4">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-white/70 text-base font-light leading-relaxed pb-6">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>

                {/* Structured Data for SEO/AEO */}
                <script type="application/ld+json">
                    {JSON.stringify(faqSchema)}
                </script>
            </div>
        </SectionWrapper>
    );
};

export default FAQ;
