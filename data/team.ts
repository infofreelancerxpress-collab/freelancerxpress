export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin?: string | null;
  twitter?: string | null;
  email?: string | null;
}

export const initialTeamMembers: TeamMember[] = [
  {
    id: "sumaiya-akhter-sazia",
    name: "Sumaiya Akhter Sazia",
    role: "Sales Representative",
    bio: "Sumaiya focuses on building strong client relationships and driving business growth through effective communication and sales strategies.",
    image:
      "https://ik.imagekit.io/iuzrfgsmv/WhatsApp%20Image%202026-01-23%20at%2018.31.57.jpeg",
    linkedin: "#",
    twitter: "#",
    email: "sumaiya@freelancerxpress.com",
  },
  {
    id: "raj-ahmead-shakil",
    name: "Raj Ahmead Shakil",
    role: "Senior Digital Marketing Specialist",
    bio: "Raj specializes in performance-driven digital marketing with deep expertise in data analysis using Google Analytics and Google Search Console.",
    linkedin: "#",
    twitter: "#",
    email: "raj@freelancerxpress.com",
    image:
      "https://ik.imagekit.io/iuzrfgsmv/WhatsApp%20Image%202026-01-23%20at%2018.09.07.jpeg",
  },
  {
    id: "mashiat-nawal-ushno",
    name: "Mashiat Nawal Ushno",
    role: "Social Media & Brand Strategy Specialist",
    bio: "Mashiat is a look-alike audience specialist and high-engagement maker, crafting powerful social media plans and authentic brand voices.",
    linkedin: "#",
    twitter: "#",
    email: "mashiat@freelancerxpress.com",
    image:
      "https://ik.imagekit.io/iuzrfgsmv/WhatsApp%20Image%202026-01-23%20at%2018.11.59.jpeg",
  },
  {
    id: "imran-hossain",
    name: "Imran Hossain",
    role: "Senior Graphic Designer",
    bio: "Imran is a multi-tool graphic design expert skilled in Adobe Photoshop, Illustrator, InDesign, CorelDraw, Canva, Pixl Lab, AI graphics tools, and advanced raster-to-vector conversion.",
    linkedin: "#",
    twitter: "#",
    email: "imran@freelancerxpress.com",
    image:
      "https://ik.imagekit.io/iuzrfgsmv/WhatsApp%20Image%202026-01-23%20at%2018.30.51.jpeg",
  },
];
