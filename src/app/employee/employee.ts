import {JobPosition} from "../job-position/jobPosition";

export class Employee {
  id!: number;
  name!: string;
  lastName!: string;
  dateOfBirth!: string;
  street!: string;
  zipCode!: string;
  city!: string;
  country!: string;
  phoneNumber!: string;
  contractBeginning!: string;
  contractExpiration!: string;
  jobPosition!: JobPosition;
}
