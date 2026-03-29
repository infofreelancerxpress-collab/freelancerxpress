export interface Testimonial {
  id: string;
  name: string;
  company: string;
  role: string;
  content: string;
  rating: number;
  image?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "testimonial-1",
    name: "Jennifer Adams",
    company: "TechStart Inc.",
    role: "Marketing Director",
    content: "FreelancerXpress transformed our online presence completely. Their web design team created a stunning website that increased our conversions by 150%. Highly recommended!",
    rating: 5,
    image: "/testimonials/placeholder-1.jpg"
  },
  {
    id: "testimonial-2",
    name: "Robert Chen",
    company: "GreenLeaf Organics",
    role: "Founder & CEO",
    content: "The social media marketing campaigns delivered by FreelancerXpress exceeded all our expectations. Our engagement rates tripled within just two months!",
    rating: 5,
    image: "/testimonials/placeholder-2.jpg"
  },
  {
    id: "testimonial-3",
    name: "Maria Garcia",
    company: "Boutique Fashion Co.",
    role: "Owner",
    content: "Working with FreelancerXpress was a game-changer for our brand. Their logo design perfectly captured our vision, and the email marketing campaigns have been incredibly effective.",
    rating: 5,
    image: "/testimonials/placeholder-3.jpg"
  },
  {
    id: "testimonial-4",
    name: "James Wilson",
    company: "FitLife Gym",
    role: "Operations Manager",
    content: "The Facebook advertising campaigns managed by FreelancerXpress brought us 200+ new members in three months. Their targeting strategies are spot-on!",
    rating: 5,
    image: "/testimonials/placeholder-4.jpg"
  }
];
