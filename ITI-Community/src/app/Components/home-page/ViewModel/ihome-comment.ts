import { IUser } from './ihome-post'
export interface IHomeComment {
    Body?: string,
    CommentDate?: Date,
    User: IUser
}

