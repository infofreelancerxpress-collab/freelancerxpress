import { LucideIcon } from "lucide-react";

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  longDescription: string;
}

export const services: Service[] = [
  {
    id: "web-design",
    title: "Web Design",
    description: "Create stunning, responsive websites that captivate your audience and drive conversions.",
    icon: "Globe",
    features: [
      "Responsive & Mobile-First Design",
      "Modern UI/UX Principles",
      "Fast Loading Performance",
      "SEO-Optimized Structure",
      "Cross-Browser Compatible"
    ],
    longDescription: "Transform your online presence with our cutting-edge web design services. We craft beautiful, functional websites that not only look amazing but also deliver exceptional user experiences and drive real business results."
  },
  {
    id: "graphics-logo-design",
    title: "Graphics & Logo Design",
    description: "Build a memorable brand identity with professional logo and graphic design services.",
    icon: "Palette",
    features: [
      "Custom Logo Creation",
      "Brand Identity Development",
      "Print & Digital Graphics",
      "Unlimited Revisions",
      "Vector File Delivery"
    ],
    longDescription: "Your brand deserves to stand out. Our creative team designs unique logos and graphics that capture your brand's essence and leave a lasting impression on your audience."
  },
  {
    id: "email-marketing",
    title: "Email Marketing",
    description: "Engage your audience with targeted email campaigns that convert subscribers into customers.",
    icon: "Mail",
    features: [
      "Campaign Strategy & Planning",
      "Custom Email Templates",
      "A/B Testing & Optimization",
      "Automated Drip Campaigns",
      "Performance Analytics"
    ],
    longDescription: "Reach your customers directly with personalized email marketing campaigns. We help you build relationships, nurture leads, and drive sales through strategic email communication."
  },
  {
    id: "facebook-boosting",
    title: "Facebook Page Boosting",
    description: "Amplify your reach and engagement with strategic Facebook advertising campaigns.",
    icon: "Facebook",
    features: [
      "Targeted Ad Campaigns",
      "Audience Research & Segmentation",
      "Ad Creative Development",
      "Budget Optimization",
      "ROI Tracking & Reporting"
    ],
    longDescription: "Maximize your Facebook presence with data-driven advertising strategies. We create and manage campaigns that reach the right audience and deliver measurable results."
  },
  {
    id: "social-media-marketing",
    title: "Social Media Marketing",
    description: "Build your brand and connect with customers across all major social platforms.",
    icon: "Share2",
    features: [
      "Multi-Platform Management",
      "Content Creation & Scheduling",
      "Community Engagement",
      "Influencer Partnerships",
      "Analytics & Insights"
    ],
    longDescription: "Dominate social media with our comprehensive marketing services. We manage your presence across platforms, create engaging content, and build a loyal community around your brand."
  },
  {
    id: "banner-design",
    title: "Banner Design",
    description: "Eye-catching banner designs for web, social media, and advertising campaigns.",
    icon: "Image",
    features: [
      "Web & Social Media Banners",
      "Animated Banner Ads",
      "Display Ad Campaigns",
      "Multiple Size Formats",
      "Brand-Consistent Designs"
    ],
    longDescription: "Make a bold statement with professionally designed banners. From web headers to social media covers and display ads, we create visuals that grab attention and drive action."
  },
  {
  id: "seo-services",
  title: "SEO",
  description: "Improve your search engine rankings and drive organic traffic with proven SEO strategies.",
  icon: "Search",
  features: [
    "On-Page SEO Optimization",
    "Keyword Research & Analysis",
    "Technical SEO Fixes",
    "Content Optimization",
    "Google Search Console Setup"
  ],
  longDescription:
    "Boost your visibility on Google with our result-driven SEO services. We optimize your website structure, content, and performance to help you rank higher, attract quality traffic, and grow sustainably."
},
{
  id: "server-side-tracking",
  title: "Server-Side Tracking",
  description: "Accurate, privacy-friendly tracking using server-side analytics and event measurement.",
  icon: "Server",
  features: [
    "Server-Side Google Analytics (GA4)",
    "Facebook & Meta Conversion API",
    "Improved Data Accuracy",
    "Ad Blocker Resistance",
    "Privacy & GDPR-Friendly Setup"
  ],
  longDescription:
    "Take full control of your data with server-side tracking solutions. We implement reliable analytics and conversion tracking that improves performance, ensures data accuracy, and respects user privacy."
},
{
  id: "video-editing",
  title: "Video Editing",
  description: "Professional video editing services to create engaging and tailored content for your audience.",
  icon: "Film",
  features: [
    "Short-form Video Content (Reels, TikTok)",
    "YouTube Video Editing",
    "Color Grading & Correction",
    "Motion Graphics & Effects",
    "Audio Mixing & Sound Design"
  ],
  longDescription: "Transform your raw footage into captivating visual stories. Our professional video editing services help you create high-quality content that drives engagement and communicates your message effectively across all platforms."
}
];

export const getServiceById = (id: string): Service | undefined => {
  return services.find(service => service.id === id);
};

