import { IUser } from "./ipost";

export interface IComment {
    Body?: string,
    CommentDate?: Date,
    User: IUser
}
