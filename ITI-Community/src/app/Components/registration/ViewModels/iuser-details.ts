import { IExperience } from '../../profile/profile-body/ViewModels/iexperience';

export interface IUserDetails {
  jobTitle: string;
  about: string;
  experiences: IExperience[];
  friendList: [];
}
