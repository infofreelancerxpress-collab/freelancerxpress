"use client";

import { Card, CardContent } from "@/components/ui/card";
import { TeamMember } from "@/data/team";
import { motion } from "framer-motion";
import { Linkedin, Twitter, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface TeamMemberCardProps {
  member: TeamMember;
  index: number;
}

export function TeamMemberCard({ member, index }: TeamMemberCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="h-full group hover:shadow-glow transition-all duration-300 overflow-hidden">
        {/* Image Placeholder */}
        <div className="relative h-64 bg-linear-to-br from-primary/20 to-secondary/20 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-full overflow-hidden bg-gradient-primary flex items-center justify-center">
              {member.image ? (
                <div className="relative w-full h-full">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <span className="text-white text-4xl font-bold">
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              )}
            </div>
          </div>

          {/* Social Links Overlay */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-4">
            {member.linkedin && (
              <Link
                href={member.linkedin}
                className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              >
                <Linkedin className="w-5 h-5 text-white" />
              </Link>
            )}
            {member.twitter && (
              <Link
                href={member.twitter}
                className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              >
                <Twitter className="w-5 h-5 text-white" />
              </Link>
            )}
            {member.email && (
              <Link
                href={`mailto:${member.email}`}
                className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              >
                <Mail className="w-5 h-5 text-white" />
              </Link>
            )}
          </div>
        </div>

        <CardContent className="pt-6 pb-6 space-y-3">
          <div>
            <h3 className="font-heading font-semibold text-xl">
              {member.name}
            </h3>
            <p className="text-primary font-medium">{member.role}</p>
          </div>
          <p className="text-sm text-muted-foreground">{member.bio}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
