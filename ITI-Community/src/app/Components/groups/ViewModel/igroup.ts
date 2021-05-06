import { IUser } from "./ipost";

export interface IGroup {
    Name?: string,
    About?: string,
    imgURL?: string,
    createdDate?: Date,
    admin?: string[],
    members?: string[],
    subscriber?: string[]
}



export interface IGroup2 {
    Name?: string,
    Img?: string,
    Description?: string,
    CreatedDate?: string,
    Specialty?: string,
    Users?: { //subcollection
        admins?: IUser[],
        members?: IUser[],
        subscribers?: IUser[]
    }
}