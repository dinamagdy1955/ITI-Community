export interface Job {
  id: string;
  data: {
    closingDate?: Date;
    companyLogoAvatar: string;
    company: {
      ar: string;
      en: string;
    };
    description: {
      ar: string;
      en: string;
    };
    employmentType: {
      ar: string;
      en: string;
    };
    location: {
      ar: string;
      en: string;
    };
    position: {
      ar: string;
      en: string;
    };
    postedDate: Date;
    seniorityLevel: {
      ar: string;
      en: string;
    };
    worksFrom: {
      ar: string;
      en: string;
    };
  };
}
