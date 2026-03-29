export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const faqItems: FAQItem[] = [
  {
    id: "faq-1",
    question: "What services does FreelancerXpress offer?",
    answer: "We offer a comprehensive range of digital marketing services including web design, graphics & logo design, email marketing, Facebook page boosting, social media marketing, and banner design. Our team of experts can handle all aspects of your digital presence."
  },
  {
    id: "faq-2",
    question: "How long does a typical project take?",
    answer: "Project timelines vary depending on scope and complexity. A simple logo design might take 1-2 weeks, while a full website design and development project typically takes 4-8 weeks. We'll provide a detailed timeline during our initial consultation."
  },
  {
    id: "faq-3",
    question: "What is your pricing structure?",
    answer: "We offer flexible pricing options tailored to your specific needs and budget. Each project is unique, so we provide custom quotes after understanding your requirements. Contact us for a free consultation and personalized quote."
  },
  {
    id: "faq-4",
    question: "Do you offer ongoing support and maintenance?",
    answer: "Yes! We provide ongoing support and maintenance packages for all our services. Whether it's website updates, social media management, or campaign optimization, we're here to ensure your continued success."
  },
  {
    id: "faq-5",
    question: "Can you work with businesses in any industry?",
    answer: "Absolutely! We've worked with clients across various industries including technology, retail, healthcare, hospitality, and more. Our diverse team has the expertise to understand and meet the unique needs of any business sector."
  }
];
