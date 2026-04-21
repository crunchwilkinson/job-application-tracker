'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "@/lib/auth/auth-cient";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            const result = await signIn.email({
                email,
                password,
            });

            if (result.error) {
                setError(result.error.message ?? "Failed to sign in. Please try again.");
            } else {
                router.push("/dashboard");
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "An unexpected error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="flex gap-2 min-h-[calc(100vh-4rem)] items-center justify-center bg-white p-4">
            <Card className="w-full max-w-md border-gray-200 shadow-lg">
                <CardHeader className="space-y-1 md:mb-5">
                    <CardTitle className="text-2xl font-bold text-black">
                        Sign In
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                        Sign in to your account to get started.
                    </CardDescription>
                </CardHeader>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        {error && (
                            <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                                {error}
                            </div>
                        )}
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-gray-700">
                                Email
                            </Label>
                            <Input id="email" 
                            type="email" 
                            placeholder="johndoe@example.com" 
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                            className="border-gray-300 focus:border-primary focus:ring-primary" 
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-gray-700">
                                Password
                            </Label>
                            <Input 
                            id="password" 
                            type="password" 
                            placeholder="••••••••" 
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                            className="border-gray-300 focus:border-primary focus:ring-primary" 
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                        <Button 
                        type="submit" 
                        className="w-full bg-primary hover:bg-primary/90"
                        disabled={loading}>
                            {loading ? "Signing In..." : "Sign In"}
                        </Button>
                        <p className="text-center text-sm text-gray-600">
                            Don&apos;t have an account? {" "}
                            <Link
                                href="/sign-up"
                                className="font-medium text-primary hover:underline"
                            >
                                Sign up
                            </Link>
                        </p>
                    </CardFooter>
                </form>
            </Card>
            {/* Right Side: Dashboard Preview */}
            <div className="relative hidden md:block w-full max-w-md flex-1 overflow-hidden rounded-xl border border-gray-200 shadow-lg min-h-88">
                <Image
                    src="/hero-images/hero2.png"
                    alt="Dashboard Preview"
                    fill
                    className="object-contain object-center"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                />
            </div>
        </div>
    );
}
                          
                          