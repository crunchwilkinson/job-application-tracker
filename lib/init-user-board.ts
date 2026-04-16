import connectToDatabase from "./db";
import { Board, Column } from "./models";

const DEFAULT_COLUMNS = [
    { name: "Wish List", order: 0 },
    { name: "Applied", order: 1 },
    { name: "Interviewing", order: 2 },
    { name: "Offer", order: 3 },
    { name: "Rejected", order: 4 },
];

export async function initializeUserBoard(userId: string) {
    try {
        await connectToDatabase();

        // If the board already exists for the user, return it
        const existingBoard = await Board.findOne({ userId, name: "Job Hunt" });

        if (existingBoard) {
            return existingBoard;
        }

        // Create the board
        const board = await Board.create({
            name: "Job Hunt",
            userId,
            columns: [],
        });

        // Create the default columns and associate them with the board
        const columns = await Promise.all(
            DEFAULT_COLUMNS.map((col) => 
                Column.create({
                    name: col.name,
                    order: col.order,
                    boardId: board._id,
                    jobApplications: [],
                })
            )
        );

        // Update the board with the created columns
        board.columns = columns.map((col) => col._id);
        await board.save();

        return board;

    } catch (err) {
        throw err;
    }
}