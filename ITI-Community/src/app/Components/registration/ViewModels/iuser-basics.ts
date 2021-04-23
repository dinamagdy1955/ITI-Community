export interface IUserBasics {
  email: string;
  password: string;
  isPeople: boolean;
  isAccepted: boolean;
  isRemoved: boolean;
  isReported: boolean;
  reports: string[];
}
