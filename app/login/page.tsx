import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-zinc-950">
            <div className="w-full max-w-md p-8 bg-white dark:bg-zinc-900 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center mb-6">Admin Login</h1>
                <LoginForm />
            </div>
        </div>
    );
}
