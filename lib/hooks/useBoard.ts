'use client';
import { useEffect, useState } from "react";
import { Board } from "../models/models.types";

export function useBoard(initialBoard?: Board | null) {
    const [board, setBoard] = useState<Board | null>(initialBoard || null);
    const [columns, setColumns] = useState(initialBoard?.columns || []);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (initialBoard) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setBoard(initialBoard);
            setColumns(initialBoard.columns || []);
        }
    },[initialBoard]);

    async function moveJob(jobApplicationId: string, newColumnId: string, newOrder: number) {

    }

    return {board, columns, error, moveJob};
}