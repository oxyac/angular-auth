import { User } from '../users/user.model';

export interface ResponseModel{
  status: boolean;
  data: User[]
}
