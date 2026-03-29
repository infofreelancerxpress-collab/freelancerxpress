"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Service } from "@/data/services";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import * as Icons from "lucide-react";

interface ServiceCardProps {
  service: Service;
  index: number;
}

export function ServiceCard({ service, index }: ServiceCardProps) {
  const Icon = (Icons as any)[service.icon];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      id={service.id}
    >
      <Card className="h-full group hover:shadow-glow-lg transition-all duration-300">
        <CardHeader>
          <div className="w-16 h-16 rounded-xl gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Icon className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="font-heading text-2xl">{service.title}</CardTitle>
          <CardDescription className="text-base">
            {service.longDescription}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-3">Key Features:</h4>
            <ul className="space-y-2">
              {service.features.map((feature, idx) => (
                <li key={idx} className="flex items-start text-sm">
                  <Check className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

