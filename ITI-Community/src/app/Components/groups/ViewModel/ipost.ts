export interface IPost {
    Post: string,
    PostedDate: Date,
    PostImg: string,
    Likes: string[]
}

export interface IUser {
    id: string,
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
    postImgs?: string[],
    Auther?: IUser,
    Likes?: { // subcollection
        UserId: string
    },
    Comments?: { // subcollection
        Body: string,
        commentDate: Date,
        User: IUser
    }
}