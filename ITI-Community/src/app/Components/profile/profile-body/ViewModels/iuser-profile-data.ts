import { IExperience } from './iexperience';

export interface IUserProfileData {
  isPeople: boolean;
  isAccepted: boolean;
  isRemoved: boolean;
  isReported: boolean;
  reports: string[];
  firstName: string;
  lastName: string;
  jobTitle: string;
  about: string;
  branch: number;
  track: number;
  experiences: IExperience[];
  friendList: [];
  avatar: string;
  avatarCover: string;
}
