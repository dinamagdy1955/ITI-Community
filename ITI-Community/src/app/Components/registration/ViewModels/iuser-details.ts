import { IExperience } from '../../profile/profile-body/ViewModels/iexperience';

export interface IUserDetails {
  firstName: string;
  lastName: string;
  nationalID: string;
  branch: number;
  track: number;
  scholarshipDuration: number;
  jobTitle: string;
  about: string;
  experiences: IExperience[];
  friendList?: [];
  friendRequests?: [];
  avatar: string;
  avatarCover: string;
  groups: [];
}
