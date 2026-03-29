"use client";

import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Youtube,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "About Us", href: "/about" },
  { name: "Our Team", href: "/team" },
  { name: "Contact", href: "/contact" },
  { name: "Payment Method", href: "/payment-method" },
  { name: "Support Policy", href: "/support-policy" },
];

const services = [
  { name: "Web Design", href: "/services#web-design" },
  { name: "Logo Design", href: "/services#graphics-logo-design" },
  { name: "Email Marketing", href: "/services#email-marketing" },
  { name: "Social Media", href: "/services#social-media-marketing" },
];

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "https://www.facebook.com/freelancerxpress" },
  // { name: "Twitter", icon: Twitter, href: "#" },
  // { name: "Instagram", icon: Instagram, href: "#" },
  { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/freelancer-xpress-a40a0a393?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" },
  { name: "Youtube", icon: Youtube, href: "https://www.youtube.com/@freelancerxpress" },
];

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-heading font-bold gradient-text">
              FreelancerXpress
            </h3>
            <p className="text-sm text-muted-foreground">
              Transform your digital presence with expert marketing solutions
              that drive real results.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all hover:scale-110"
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">
              Our Services
            </h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-lg">Get In Touch</h4>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start space-x-2 cursor-pointer hover:text-primary transition">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <a className="cursor-pointer hover:text-primary transition" href="https://maps.app.goo.gl/gWH7uUWJsDWeuE3JA">
                  Khanganj
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <a
                  href="tel:+8809649264385"
                  target="_blank"
                  className="flex items-center gap-2 text-sm font-medium hover:text-primary transition cursor-pointer"
                >
                  <Phone className="h-4 w-4" />
                  09649-264385
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <a
                  href="mailto:Infofreelancerxpress@gmail.com"
                  className="flex items-center gap-2 text-sm font-medium hover:text-primary transition"
                >
                  <Mail className="h-4 w-4" />
                  Infofreelancerxpress@gmail.com
                </a>
              </div>
            </div>

            {/* Newsletter */}
            <div className="pt-2">
              <h5 className="font-medium text-sm mb-2">Newsletter</h5>
              <div className="flex space-x-2">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="h-9 text-sm"
                />
                <Button size="sm" variant="gradient">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © {new Date().getFullYear()} FreelancerXpress. All rights
              reserved.
            </p>
            <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <Link
                href="/privacy-policy"
                className="hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="hover:text-primary transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/refund-policy"
                className="hover:text-primary transition-colors"
              >
                Refund Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
