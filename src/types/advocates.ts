export interface IAdvocate {
  id: string;
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: number;
  phoneNumber: number;
  createdAt: Date;
}

export interface GetAdvocatesResponse {
  data: IAdvocate[];
}
