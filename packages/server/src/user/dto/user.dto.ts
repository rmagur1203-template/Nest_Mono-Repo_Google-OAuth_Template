// export class UserDto {
//   id!: string;

import { User } from '../entities/user.entity';

// }
export type UserDto = Pick<User, 'id'>;
