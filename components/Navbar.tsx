'use client';
import { Briefcase } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { signOut, useSession } from "@/lib/auth/auth-cient";
import { useRouter } from "next/navigation";


export default function Navbar() {
    const { data: session } = useSession();
    const router = useRouter();
    return (
        <nav className="border-b border-border bg-background">
           <div className="container mx-auto flex h-16 items-center px-4 justify-between">
            <Link href="/" className="flex items-center gap-2 text-xl font-semibold text-primary">
                <Briefcase />
                Job Hunter
            </Link>
            <div className="flex items-center gap-4">
                {session?.user ? (
                    <>
                    <Link href="/dashboard">
                        <Button variant="ghost" className="text-gray-700 hover:text-black">
                            Dashboard
                        </Button>
                    </Link>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                <Avatar className="h-8 w-8">
                                    <AvatarFallback className="bg-primary text-white">
                                        {session.user.name[0].toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="end">
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">{session.user.name}</p>
                                    <p className="text-xs leading-none text-muted-foreground">{session.user.email}</p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuItem onClick={async () => {
                                const result = await signOut();
                                if (result.data) {
                                    router.push("/sign-in");
                                } else {
                                    console.error("Failed to sign out:", result.error);
                                }
                                }}>
                                Log Out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    </>
                ) : (<>
                <Link href="/sign-in">
                    <Button variant="ghost" className="text-gray-700 hover:text-black">
                        Log In
                    </Button>
                </Link>
                <Link href="/sign-up">
                    <Button className="bg-primary hover:bg-primary/90">
                        Start for free
                    </Button>
                </Link>
                </>
                )}
            </div>
           </div>
        </nav>
    );
}