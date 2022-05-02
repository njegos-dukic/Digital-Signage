import { User } from "./user";

export interface FeedbackDto {
    id: number;
    content: string;
    user: User;
}