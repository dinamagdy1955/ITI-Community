export interface IPost {
    Post: string,
    PostedDate: Date,
    PostImg: string,
    Likes: string[]
}

export interface IUser {
    UserId: string,
    firstName: string,
    lastName: string,
    jobTitle: string,
    avatar: string
}

export interface IPost2 {
    GroupId: string,
    Body: string,
    PostedDate: Date,
    PostImgs?: string[],
    User: IUser,
    Likes?: { // subcollection
        UserId: string
    },
    Comments?: { // subcollection
        Body: string,
        commentDate: Date,
        User: IUser
    }
}