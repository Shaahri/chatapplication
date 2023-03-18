export interface MessageType {
    id: string;
    userId: string;
    message: string;
    userName: string;
    threadId: string;
    createdAt: Date;
}

export interface ThreadType {
    id: string;
    name: string;
    createdAt: Date;
    userIds: string[];
}

export interface UserType {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
}