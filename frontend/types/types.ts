export interface User {
    "email": string,
    "first_name": string,
    "middle_name": string | null,
    "last_name": string,
    "is_active": boolean,
    "profile_picture"?: string,
    "created_at": string,
    "updated_at": string
}

export interface Member extends User {
    user: User,
    is_owner: boolean,
    is_admin: boolean
}

export type Project = {
    "id": number,
    "url": string,
    "title": string,
    "description": string | null,
    "is_active": boolean,
    "created_at": string,
    "updated_at": string
}

export type TaskStatus = "pending" | "assigned" | "in_progress" | "completed"

export type Task = {
    "id": number,
    "url": string,
    "title": string,
    "description": string| null,
    "project": string,
    "assignee": User | null,
    "assignor": User,
    "status": TaskStatus,
    "start_at": string | null,
    "due_at": string | null,
    "completed_at": string | null,
    "created_at": string,
    "updated_at": string
}

type TaskRequestStatus = "pending" | "accepted" | "rejected"

export type TaskRequest = {
    "id": number,
    "url": string,
    "task": Task,
    "member": User, 
    "status": TaskRequestStatus,
    "created_at": string,
    "updated_at": string
}