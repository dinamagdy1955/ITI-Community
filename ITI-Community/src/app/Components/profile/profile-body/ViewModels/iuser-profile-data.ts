import { IExperience } from './iexperience';

export interface IUserProfileData {
  firstName: string;
  lastName: string;
  jobTitle: string;
  about: string;
  branch: number;
  track: number;
  experiences: IExperience[];
  friendList: [];
}
