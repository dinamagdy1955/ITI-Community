export interface IUser {
    id: string,
    UserId: string,
    firstName: string,
    lastName: string,
    jobTitle: string,
    avatar: string
}
export interface IHomePost {
    //GroupId: string,
    postID:string,
    Body: string,
    savedState:boolean,
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

