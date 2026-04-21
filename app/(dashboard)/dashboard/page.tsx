import KanbanBoard from "@/components/KanbanBoard";
import { getSession } from "@/lib/auth/auth";
import connectToDatabase from "@/lib/db";
import { Board } from "@/lib/models";
import { redirect } from "next/navigation";
import { Suspense } from "react";

async function getBoard(userId: string) {
    'use cache';
     await connectToDatabase();

    const boardDoc = await Board.findOne({
         name: "Job Hunt", 
         userId: userId
        }).populate({
            path: "columns",
            populate: {
                path: "jobApplications",
            }
        });

    if (!boardDoc) {
        return null;
    }

    const board = JSON.parse(JSON.stringify(boardDoc));
    return board;
}

async function DashboardPage() {
    const session = await getSession();
    const board = await getBoard(session?.user.id ?? "");

    if (!session?.user) {
        redirect("/sign-in");
    }

    return (
            <div className="container mx-auto p-6">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-black">
                        {board.name}
                    </h1>
                    <p className="text-gray-600">
                        Track your job applications
                    </p>
                </div>
                <KanbanBoard board={board} userId={session.user.id} />
            </div>
    );
}

function DashboardSkeleton() {
    return (
            <div className="container mx-auto p-6">
                <div className="mb-6 space-y-3">
                    <div className="h-9 w-64 animate-pulse rounded-md bg-gray-200" />
                    <div className="h-5 w-48 animate-pulse rounded-md bg-gray-200" />
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {Array.from({ length: 3 }).map((_, idx) => (
                        <div
                            key={idx}
                            className="rounded-lg border border-gray-200 bg-white p-4"
                        >
                            <div className="mb-4 h-6 w-28 animate-pulse rounded-md bg-gray-200" />
                            <div className="space-y-3">
                                {Array.from({ length: 3 }).map((__, cardIdx) => (
                                    <div
                                        key={cardIdx}
                                        className="rounded-md border border-gray-200 p-4"
                                    >
                                        <div className="mb-2 h-4 w-3/4 animate-pulse rounded bg-gray-200" />
                                        <div className="h-3 w-1/2 animate-pulse rounded bg-gray-200" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
    );
}

{/* We wrap the DashboardPage in a Suspense component to handle loading states with cache*/}
export default async function Dashboard() {
    return (
        <Suspense fallback={<DashboardSkeleton />}>
            <DashboardPage />
        </Suspense>
    )
}