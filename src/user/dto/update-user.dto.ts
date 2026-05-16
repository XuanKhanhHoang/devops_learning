import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

// If @nestjs/mapped-types is not installed, we can fall back to standard Partial
// export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
