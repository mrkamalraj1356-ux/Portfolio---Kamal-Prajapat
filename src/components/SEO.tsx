import { Helmet } from 'react-helmet-async';
import { PROFILE } from '@/config/profile';

interface SEOProps {
    title?: string;
    description: string;
    keywords?: string;
    ogImage?: string;
    type?: 'website' | 'article';
    pathname?: string;
    schema?: object | object[];
}

export const SEO = ({
    title,
    description,
    keywords,
    ogImage = '/kamal.jpg',
    type = 'website',
    pathname = '',
    schema
}: SEOProps) => {
    const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://kamalprajapat.me';
    const fullUrl = `${siteUrl}${pathname}`;

    const pageTitle = title
        ? (title.includes(PROFILE.name) ? title : `${title} | ${PROFILE.name}`)
        : `${PROFILE.name} | ${PROFILE.role}`;

    const defaultKeywords = `${PROFILE.name}, Kamalraj Prajapat, BCA Student, Aspiring Cybersecurity Professional, Ethical Hacking, Network Security, Linux, Vulnerability Assessment, Biyani College Jaipur, Student Portfolio`;

    const personSchema = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": PROFILE.name,
        "url": siteUrl,
        "jobTitle": PROFILE.role,
        "sameAs": [
            PROFILE.socialLinks.github,
            PROFILE.socialLinks.linkedin
        ],
        "description": description
    };

    const finalSchema = schema 
        ? (Array.isArray(schema) ? [personSchema, ...schema] : [personSchema, schema])
        : personSchema;

    return (
        <Helmet>
            {/* Primary Meta Tags */}
            <title>{pageTitle}</title>
            <meta name="title" content={pageTitle} />
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords || defaultKeywords} />
            <link rel="canonical" href={fullUrl} />

            {/* Favicon & Circular Profile Icons */}
            <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png?v=3" />
            <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png?v=3" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=3" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=3" />
            <link rel="shortcut icon" href="/favicon.ico?v=3" />
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=3" />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:title" content={pageTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={`${siteUrl}${ogImage}`} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={fullUrl} />
            <meta property="twitter:title" content={pageTitle} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={`${siteUrl}${ogImage}`} />

            {/* Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify(finalSchema)}
            </script>
        </Helmet>
    );
};
