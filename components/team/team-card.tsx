'use client';

import { TeamMember } from "@/lib/generated/prisma/client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Linkedin, Twitter, Mail } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

interface TeamMemberCardProps {
    member: TeamMember;
    onEdit: (member: TeamMember) => void;
    onDelete: (id: string) => void;
}

export function TeamMemberCard({ member, onEdit, onDelete }: TeamMemberCardProps) {
    return (
        <Card className="hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
            <div className="relative h-24 bg-gradient-to-r from-blue-500 to-purple-500">
                <div className="absolute -bottom-10 left-6">
                    <Avatar className="h-20 w-20 border-4 border-white dark:border-zinc-900 shadow-md">
                        <AvatarImage src={member.image} alt={member.name} className="object-cover" />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                </div>
                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="icon" variant="secondary" onClick={() => onEdit(member)}>
                        <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="destructive" onClick={() => onDelete(member.id)}>
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </div>
            <CardHeader className="mt-10 pb-2">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-bold text-lg">{member.name}</h3>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                    </div>
                    <Badge variant={member.isActive ? "default" : "secondary"}>
                        {member.isActive ? "Active" : "Inactive"}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">
                    {member.bio}
                </p>
                <div className="flex gap-3 text-muted-foreground mt-auto">
                    {member.linkedin && (
                        <Link href={member.linkedin} target="_blank" className="hover:text-blue-600 transition-colors">
                            <Linkedin className="h-5 w-5" />
                        </Link>
                    )}
                    {member.twitter && (
                        <Link href={member.twitter} target="_blank" className="hover:text-blue-400 transition-colors">
                            <Twitter className="h-5 w-5" />
                        </Link>
                    )}
                    {member.email && (
                        <Link href={`mailto:${member.email}`} className="hover:text-red-500 transition-colors">
                            <Mail className="h-5 w-5" />
                        </Link>
                    )}
                </div>
                <div className="text-xs text-muted-foreground mt-4 pt-4 border-t w-full">
                    Joined {format(new Date(member.createdAt), "MMM d, yyyy")}
                </div>
            </CardContent>
        </Card>
    );
}
