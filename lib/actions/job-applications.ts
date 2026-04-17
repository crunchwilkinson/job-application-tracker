'use server';

import { getSession } from "../auth/auth";
import connectToDatabase from "../db";
import { Board, Column, JobApplication } from "../models";

interface JobApplicationData {
    company: string;
    position: string;
    location?: string;
    salary?: string;
    jobUrl?: string;
    columnId: string;
    boardId: string;
    tags?: string[];
    description?: string;
    notes?: string;
}

{/* Server actions can be used to perform server-side operations without exposing the implementation details on the client side */}
export async function createJobApplication(data: JobApplicationData) {
    const session = await getSession();

    if (!session?.user) {
        return { error: "Unauthorized" };
    }

    await connectToDatabase();

    // Destructure the data for easier access
    const { company, position, location, salary, jobUrl, columnId, boardId, tags, description, notes } = data;

    if (!company || !position || !columnId || !boardId) {
        return { error: "Missing required fields" };
    }

    // Verify that the board and column belong to the user
    const board = await Board.findOne({ _id: boardId, userId: session.user.id });

    if (!board) {
        return { error: "Board not found" };
    }

    // Verify that the column belongs to the board
    const column = await Column.findOne({ _id: columnId, boardId: board._id });

    if (!column) {
        return { error: "Column not found" };
    }

    // Determine the order for the new job application (place it at the end of the column)
    const maxOrder = await JobApplication.findOne({columnId: column._id}).sort({order: -1}).select("order").lean() as {order: number} | null;

   const jobApplication = await JobApplication.create({
    company,
    position,
    location,
    notes,
    salary,
    jobUrl,
    columnId,
    boardId,
    userId: session.user.id,
    tags: tags || [],
    description,
    status: "applied",
    order: maxOrder ? maxOrder.order + 1 : 0,
  });

  await Column.findByIdAndUpdate(columnId, {
    $push: { jobApplications: jobApplication._id },
  });

  return { data: JSON.parse(JSON.stringify(jobApplication)) };
}

