import { SectionHeading } from "@/components/shared/SectionHeading";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { ContactForm } from "@/components/contact/ContactForm";
import { FAQAccordion } from "@/components/contact/FAQAccordion";
import { Card, CardContent } from "@/components/ui/card";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - FreelancerXpress",
  description:
    "Get in touch with FreelancerXpress. We're here to help transform your digital presence.",
};

function ContactHero() {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-16 gradient-primary-radial">
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h1 className="font-heading font-bold text-white">Get In Touch</h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
            Ready to transform your digital presence? We'd love to hear from
            you. Let's start a conversation.
          </p>
        </div>
      </div>
    </section>
  );
}

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    content: "View on Google Maps",
    href: "https://maps.app.goo.gl/ENKaQYfUVPWT1eSY6",
  },
  {
    icon: Phone,
    title: "Call Us",
    content: "+880 1577-164844",
    href: "tel:+8801577164844",
  },
  {
    icon: Mail,
    title: "Email Us",
    content: "Infofreelancerxpress@gmail.com",
    href: "mailto:Infofreelancerxpress@gmail.com",
  },
  {
    icon: Clock,
    title: "Business Hours",
    content: "24/7 Support",
    href: null,
  },
];

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "https://www.facebook.com/freelancerxpress", color: "hover:text-blue-600" },
  // { name: "Twitter", icon: Twitter, href: "#", color: "hover:text-sky-500" },
  // {
  //   name: "Instagram",
  //   icon: Instagram,
  //   href: "#",
  //   color: "hover:text-pink-600",
  // },
  { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/freelancer-xpress-a40a0a393?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", color: "hover:text-blue-700" },
  { name: "Youtube", icon: Youtube, href: "https://www.youtube.com/@freelancerxpress", color: "hover:text-red-600" },
];

export default function ContactPage() {
  return (
    <>
      <ContactHero />

      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <AnimatedSection>
              <ContactForm />
            </AnimatedSection>

            {/* Contact Information */}
            <div className="space-y-8">
              <AnimatedSection delay={0.2}>
                <SectionHeading
                  title="Contact Information"
                  subtitle="Reach out to us through any of these channels"
                  centered={false}
                />

                <div className="space-y-6">
                  {contactInfo.map((info, index) => {
                    const Icon = info.icon;
                    return (
                      <Card
                        key={index}
                        className="hover:shadow-md transition-shadow"
                      >
                        <CardContent className="flex items-start space-x-4 pt-6 pb-6">
                          <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold mb-1">{info.title}</h3>
                            {info.href ? (
                              <a
                                href={info.href}
                                target={
                                  info.title === "Visit Us"
                                    ? "_blank"
                                    : undefined
                                }
                                rel={
                                  info.title === "Visit Us"
                                    ? "noopener noreferrer"
                                    : undefined
                                }
                                className="text-muted-foreground hover:text-primary transition-colors"
                              >
                                {info.content}
                              </a>
                            ) : (
                              <p className="text-muted-foreground">
                                {info.content}
                              </p>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </AnimatedSection>

              {/* Social Media */}
              <AnimatedSection delay={0.4}>
                <Card>
                  <CardContent className="pt-6 pb-6">
                    <h3 className="font-semibold mb-4">Follow Us</h3>
                    <div className="flex space-x-4">
                      {socialLinks.map((social) => {
                        const Icon = social.icon;
                        return (
                          <Link
                            key={social.name}
                            href={social.href}
                            className={`w-12 h-12 rounded-full bg-muted hover:bg-primary hover:text-white flex items-center justify-center transition-all hover:scale-110 ${social.color}`}
                            aria-label={social.name}
                          >
                            <Icon className="w-6 h-6" />
                          </Link>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>

              {/* Google Map */}
              <AnimatedSection delay={0.6}>
                <Card className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="h-64 w-full">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1825.5675943711346!2d89.54070726936604!3d23.778199835550733!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fe670069b30d0d%3A0x31a0fc019ecbfb97!2sFreelancerxpress!5e0!3m2!1sen!2sbd!4v1768572907562!5m2!1sen!2sbd"
                      className="w-full h-full border-0 rounded-xl"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      allowFullScreen
                    />
                  </div>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      <FAQAccordion />
    </>
  );
}
