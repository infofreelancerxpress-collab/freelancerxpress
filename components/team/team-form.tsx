'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { teamMemberSchema, TeamMemberFormValues } from "@/lib/validations/team";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ImageUpload } from "./image-upload";
import { useEffect } from "react";
import { TeamMember } from "@/lib/generated/prisma/client";
import { createTeamMember, updateTeamMember } from "@/app/actions/team";
import { toast } from "sonner"; // Assuming sonner is used as per dependencies in package.json

interface TeamFormProps {
    initialData?: TeamMember | null;
    onSuccess: () => void;
}

export function TeamForm({ initialData, onSuccess }: TeamFormProps) {
    const form = useForm<TeamMemberFormValues>({
        resolver: zodResolver(teamMemberSchema),
        defaultValues: {
            name: "",
            role: "",
            bio: "",
            image: "",
            linkedin: "",
            twitter: "",
            email: "",
            isActive: true,
        },
    });

    useEffect(() => {
        if (initialData) {
            form.reset({
                name: initialData.name,
                role: initialData.role,
                bio: initialData.bio,
                image: initialData.image,
                linkedin: initialData.linkedin || "",
                twitter: initialData.twitter || "",
                email: initialData.email || "",
                isActive: initialData.isActive,
            });
        } else {
            form.reset({
                name: "",
                role: "",
                bio: "",
                image: "",
                linkedin: "",
                twitter: "",
                email: "",
                isActive: true,
            });
        }
    }, [initialData, form]);

    const onSubmit = async (values: TeamMemberFormValues) => {
        try {
            let response;
            if (initialData) {
                response = await updateTeamMember(initialData.id, values);
            } else {
                response = await createTeamMember(values);
            }

            if (response.success) {
                toast.success(initialData ? "Team member updated" : "Team member created");
                onSuccess();
            } else {
                toast.error(response.error || "Something went wrong");
            }
        } catch (error) {
            console.error(error);
            toast.error("An unexpected error occurred");
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <ImageUpload
                                    value={field.value}
                                    onChange={field.onChange}
                                    disabled={form.formState.isSubmitting}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="John Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Job Title / Role</FormLabel>
                                <FormControl>
                                    <Input placeholder="Software Engineer" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Bio</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Tell us about the team member..."
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="john@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="linkedin"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>LinkedIn URL</FormLabel>
                                <FormControl>
                                    <Input placeholder="https://linkedin.com/in/..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="twitter"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Twitter URL</FormLabel>
                                <FormControl>
                                    <Input placeholder="https://twitter.com/..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="isActive"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel>
                                    Active Status
                                </FormLabel>
                                <FormDescription>
                                    This member will be visible to the public.
                                </FormDescription>
                            </div>
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                    {initialData ? "Update Member" : "Create Member"}
                </Button>
            </form>
        </Form>
    );
}
