'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { signUp } from "@/lib/auth/auth-cient";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isPreviewLoading, setIsPreviewLoading] = useState(true);

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            const result = await signUp.email({
                name,
                email,
                password,
            });

            if (result.error) {
                setError(result.error.message ?? "Failed to create account. Please try again.");
            } else {
                router.push("/sign-in");
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
                <CardHeader className="space-y-1 md: mb-2">
                    <CardTitle className="text-2xl font-bold text-black">
                        Sign Up
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                        Create an account to get started.
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
                            <Label htmlFor="name" className="text-gray-700">
                                Name
                            </Label>
                            <Input id="name" 
                            type="text" 
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)} 
                            required 
                            className="border-gray-300 focus:border-primary focus:ring-primary" 
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-gray-700">
                                Email
                            </Label>
                            <Input id="email" 
                            type="email" 
                            placeholder="johndoe@example.com" 
                            value={email}
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                            minLength={8}
                            className="border-gray-300 focus:border-primary focus:ring-primary" 
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                        <Button 
                        type="submit" 
                        className="w-full bg-primary hover:bg-primary/90"
                        disabled={loading}>
                            {loading ? "Creating Account..." : "Sign Up"}
                        </Button>
                        <p className="text-center text-sm text-gray-600">
                            Already have an account?{" "}
                            <Link
                                href="/sign-in"
                                className="font-medium text-primary hover:underline"
                            >
                                Sign in
                            </Link>
                        </p>
                    </CardFooter>
                </form>
            </Card>
            {/* Right Side: Dashboard Preview */}
            <div className="relative hidden md:block overflow-hidden rounded-lg border border-gray-200 shadow-xl">
                {isPreviewLoading && (
                    <div className="absolute inset-0 z-10 animate-pulse bg-slate-100">
                        <div className="h-full w-full bg-linear-to-br from-slate-100 via-slate-200 to-slate-100" />
                    </div>
                )}
                <Image
                    src="/hero-images/hero2.png"
                    alt="Dashboard Preview"
                    height={600}
                    width={800}
                    onLoad={() => setIsPreviewLoading(false)}
                    className={`transition-opacity duration-300 ${isPreviewLoading ? "opacity-0" : "opacity-100"}`}
                />
            </div>
        </div>
    );
}