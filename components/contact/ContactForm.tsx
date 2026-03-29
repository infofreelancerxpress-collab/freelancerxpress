"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Send } from "lucide-react";
import { toast } from "sonner";

const serviceOptions = [
  "Web Design",
  "Graphics & Logo Design",
  "Email Marketing",
  "Facebook Page Boosting",
  "Social Media Marketing",
  "Banner Design",
  "Other",
];

export function ContactForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          const errorMessages = Object.values(data.errors).flat().join(", ");
          throw new Error(errorMessages || "Something went wrong");
        }
        throw new Error(data.message || "Failed to send message");
      }

      toast.success("Message sent successfully!", {
        description: "We'll get back to you within 24 hours.",
      });
      
      setFormData({ fullName: "", email: "", phone: "", service: "", message: "" });
    } catch (error) {
      toast.error("Error sending message", {
        description: error instanceof Error ? error.message : "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-heading text-2xl">Send Us a Message</CardTitle>
        <CardDescription>
          Fill out the form below and we'll get back to you within 24 hours.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="fullName" className="text-sm font-medium">
                Full Name *
              </label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email Address *
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium">
                Phone Number
              </label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 (555) 123-4567"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="service" className="text-sm font-medium">
                Service Interested In *
              </label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
                disabled={isLoading}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm transition-all"
              >
                <option value="">Select a service</option>
                {serviceOptions.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">
              Message *
            </label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your project..."
              rows={6}
              required
              disabled={isLoading}
            />
          </div>

          <Button type="submit" size="lg" variant="gradient" className="w-full group" disabled={isLoading}>
            {isLoading ? "Sending..." : "Send Message"}
            {!isLoading && <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
