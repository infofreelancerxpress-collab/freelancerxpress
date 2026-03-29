'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { authenticate } from "@/app/actions/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

type LoginValues = z.infer<typeof loginSchema>;

export function LoginForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const form = useForm<LoginValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (values: LoginValues) => {
        setLoading(true);
        try {
            const result = await authenticate(values);
            if (result?.error) {
                toast.error(result.error);
            } else {
                toast.success("Logged in successfully");
                router.push("/dashboard");
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem id="login-email">
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="admin@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem id="login-password">
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="******" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </Button>
            </form>
        </Form>
    );
}
