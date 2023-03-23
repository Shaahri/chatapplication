export type DatabaseModel<T> = T & {
    id: string;
}

export interface MessageType {
    userId: string;
    message: string;
    userName: string;
    threadId: string;
    createdAt: Date;
}

export interface ThreadType {
    name: string;
    createdAt: Date;
    userIds: string[];
}

export interface UserType {
    name?: string;
    email?: string;
    createdAt: Date;
}