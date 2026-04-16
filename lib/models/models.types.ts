export interface JobApplication {
    __id: string;
    company: string;
    position: string;
    location?: string;
    status: string;
    columnId: string;
    order: number;
    notes?: string;
    salary?: string;
    jobUrl?: string;
    tags?: string[];
    description?: string;
}

export interface Column {
    __id: string;
    name: string;
    boardId: string;
    order: number;
    jobApplications: JobApplication[];
}

export interface Board {
    __id: string;
    name: string;
    columns: Column[];
}